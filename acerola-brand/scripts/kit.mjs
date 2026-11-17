/**
 * Builds the brand book downloads before `vite build` / `vite dev`:
 *
 * - static/brand/tokens.json           tokens.css as JSON (dark, light and shared)
 * - static/downloads/*.zip             brand, skills, project template, logos, icons, fonts and css
 * - src/lib/generated/downloads.json   size and file count of each zip, for the page
 *
 * Everything here is generated (git-ignored). Sources: static/brand, .claude/skills and the
 * standard files at the repository root, with template/ on top.
 */
import { existsSync } from 'node:fs';
import { mkdir, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { zipSync } from 'fflate';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const repo = join(root, '..');
const brand = join(root, 'static', 'brand');
const skills = join(repo, '.claude', 'skills');
const downloads = join(root, 'static', 'downloads');
const generated = join(root, 'src', 'lib', 'generated');

/** Fixed date in the zips: the same content always builds the same file. */
const MTIME = new Date('2026-01-01T00:00:00Z');

/**
 * The new-project kit: these root files (the standard in use here) and, on top, everything in
 * template/ (CLAUDE.md, acerola.config.json, README, CODEOWNERS… as templates).
 */
const STANDARD_FILES = [
	'.claude/settings.json',
	'.claude/skills',
	'scripts/git',
	'scripts/design',
	'scripts/i18n',
	'.github/ISSUE_TEMPLATE',
	'.github/PULL_REQUEST_TEMPLATE.md',
	'lefthook.yml',
	'.gitmessage',
	'.gitattributes',
	'.editorconfig',
	'LICENSE'
];

const posix = (path) => path.split(sep).join('/');

/** Every file under a path (recursive folder or a single file). */
async function walk(path) {
	if (!(await stat(path)).isDirectory()) return [path];
	const out = [];
	for (const entry of await readdir(path, { withFileTypes: true })) {
		out.push(...(await walk(join(path, entry.name))));
	}
	return out;
}

/**
 * Gathers paths into zip entries: each entry is [source, target inside the zip]. A folder's
 * content goes inside the target; a file's target is its own name in the zip. Later entries win.
 */
async function collect(entries) {
	const files = {};
	for (const [source, target] of entries) {
		if (!existsSync(source)) continue;
		const isDir = (await stat(source)).isDirectory();
		for (const file of await walk(source)) {
			const key = isDir ? join(target, relative(source, file)) : target;
			files[posix(key)] = [await readFile(file), { mtime: MTIME }];
		}
	}
	return files;
}

/** tokens.css → { dark, light, shared }, in source order. */
function parseTokens(css) {
	const blocks = { dark: {}, light: {}, shared: {} };
	const rule = /([^{}]+)\{([^{}]*)\}/g;
	for (const [, selector, body] of css.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(rule)) {
		const key = selector.includes("'light'")
			? 'light'
			: selector.includes("'dark'")
				? 'dark'
				: 'shared';
		for (const [, name, value] of body.matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)) {
			blocks[key][name] = value.trim().replace(/\s+/g, ' ');
		}
	}
	return blocks;
}

const tokensCss = await readFile(join(brand, 'css', 'tokens.css'), 'utf8');
await writeFile(
	join(brand, 'tokens.json'),
	JSON.stringify(parseTokens(tokensCss), null, '\t') + '\n'
);

/** The design skill ships with the tokens, so the agent reads the values without the site. */
const tokensInSkill = (prefix) => ({
	[posix(join(prefix, 'acerola-design', 'tokens.css'))]: [
		new TextEncoder().encode(tokensCss),
		{ mtime: MTIME }
	]
});

const template = async (prefix) => ({
	...(await collect(STANDARD_FILES.map((path) => [join(repo, path), join(prefix, path)]))),
	...(await collect([[join(repo, 'template'), prefix]])),
	...tokensInSkill(`${prefix}/.claude/skills`)
});

const ZIPS = {
	'acerola-brand.zip': async () => ({
		...(await collect([
			[brand, 'acerola-brand'],
			[skills, 'acerola-brand/skills']
		])),
		...tokensInSkill('acerola-brand/skills')
	}),
	'acerola-template.zip': () => template('acerola-template'),
	'acerola-skills.zip': async () => ({
		...(await collect([[skills, '']])),
		...tokensInSkill('')
	}),
	'acerola-logos.zip': () =>
		collect([
			[join(brand, 'logo'), 'acerola-logos/logo'],
			[join(brand, 'mascot'), 'acerola-logos/mascot']
		]),
	'acerola-icons.zip': () => collect([[join(brand, 'icons'), 'acerola-icons']]),
	'acerola-fonts.zip': () => collect([[join(brand, 'fonts'), 'acerola-fonts']]),
	'acerola-css.zip': () =>
		collect([
			[join(brand, 'css'), 'acerola/css'],
			[join(brand, 'fonts'), 'acerola/fonts']
		])
};

await rm(downloads, { recursive: true, force: true });
await mkdir(downloads, { recursive: true });
await mkdir(generated, { recursive: true });

const manifest = {};
for (const [file, build] of Object.entries(ZIPS)) {
	const files = await build();
	const bytes = zipSync(files, { level: 9 });
	await writeFile(join(downloads, file), bytes);
	manifest[file] = { bytes: bytes.length, files: Object.keys(files).length };
	console.log(
		`kit: ${file} (${manifest[file].files} files, ${(bytes.length / 1024).toFixed(0)} KB)`
	);
}
await writeFile(join(generated, 'downloads.json'), JSON.stringify(manifest, null, '\t') + '\n');
