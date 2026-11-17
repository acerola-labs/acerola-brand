/**
 * Content of the Standard page: a summary of the acerola-project and acerola-git skills. The
 * skills in .claude/skills/ are the source of truth; this file only holds what the page shows.
 * Text lives in Paraglide messages; code samples (tree, commands, keys) are code and stay as is.
 */
import { m } from '#lib/paraglide/messages.js';

type Message = () => string;

export const SKILLS: { name: string; title: Message; text: Message }[] = [
	{
		name: 'acerola-design',
		title: m['standard.skills.design.title'],
		text: m['standard.skills.design.text']
	},
	{
		name: 'acerola-project',
		title: m['standard.skills.project.title'],
		text: m['standard.skills.project.text']
	},
	{
		name: 'acerola-git',
		title: m['standard.skills.git.title'],
		text: m['standard.skills.git.text']
	}
];

export const TREE = `<repo>/
├── <app>/                 one folder per app (name = commit scope)
│   └── messages/          pt-br.json · en.json (i18n)
├── lib/<name>/            library shared between apps
├── docs/                  ARQUITETURA.md, guides and README images
├── scripts/
│   ├── git/               branch-guard.sh · commit-msg.mjs · setup-git.mjs
│   ├── design/            check-design.mjs
│   └── i18n/              check-i18n.mjs
├── .claude/               settings.json (hooks) · skills/
├── .github/               workflows · ISSUE_TEMPLATE · PR template · CODEOWNERS · dependabot
├── acerola.config.json    name, commit scopes, design and i18n folders
├── CLAUDE.md              project rules and deviations from the standard
├── README.md · CONTRIBUTING.md · RELEASE.md · LICENSE (MPL-2.0)
└── .gitmessage · .gitattributes · .editorconfig · lefthook.yml`;

/** Same thing, written both ways: the left side is code (English), the right side is the screen. */
export const ENGLISH = `// code: English
const watchedEpisodes = await mediaRepository.findProgress(userId);
//    table media_progress (user_id, media_id, episode, updated_at)
//    route /library/anime · file library-screen.svelte

// screen: i18n
m['library.progress.episode']({ current, total }) // → "Ep 5 de 12"`;

export const I18N_GOOD = `{
  "library": {
    "search": {
      "placeholder": "Buscar título",
      "empty": "Nada encontrado"
    }
  }
}`;

export const I18N_BAD = `{
  "library_search_placeholder": "Buscar título",
  "library": { "search_empty": "Nada encontrado" },
  "biblioteca": { "busca": "…" }
}`;

export const LAYERS: { name: Message; pattern: Message }[] = [
	{ name: m['standard.layers.ui.name'], pattern: m['standard.layers.ui.pattern'] },
	{ name: m['standard.layers.state.name'], pattern: m['standard.layers.state.pattern'] },
	{ name: m['standard.layers.domain.name'], pattern: m['standard.layers.domain.pattern'] },
	{ name: m['standard.layers.data.name'], pattern: m['standard.layers.data.pattern'] },
	{ name: m['standard.layers.platform.name'], pattern: m['standard.layers.platform.pattern'] },
	{ name: m['standard.layers.errors.name'], pattern: m['standard.layers.errors.pattern'] }
];

export const TYPES = [
	'feat',
	'fix',
	'refactor',
	'test',
	'docs',
	'style',
	'perf',
	'build',
	'ci',
	'chore',
	'merge'
];

export const COMMITS = `[feat](site): Hero em pôster com Titan One
[fix](kit): Hook de design ignora arquivo gerado
[chore](deps): Sobe o SvelteKit para a 3.1
[merge](site): Página do padrão de projeto`;

export const BRANCHES: { name: string; rule: Message }[] = [
	{ name: 'main', rule: m['standard.branches.main'] },
	{ name: 'develop', rule: m['standard.branches.develop'] },
	{ name: 'feature/<name>', rule: m['standard.branches.feature'] },
	{ name: 'bugfix/<name>', rule: m['standard.branches.bugfix'] },
	{ name: 'release/<version>', rule: m['standard.branches.release'] },
	{ name: 'hotfix/<version>', rule: m['standard.branches.hotfix'] }
];

export const HOOKS: { hook: string; run: string; does: Message }[] = [
	{ hook: 'commit-msg', run: 'commit-msg.mjs', does: m['standard.hooks.message'] },
	{
		hook: 'pre-commit',
		run: 'branch-guard + check-design + check-i18n',
		does: m['standard.hooks.commit']
	},
	{ hook: 'pre-merge-commit', run: 'branch-guard', does: m['standard.hooks.merge'] },
	{ hook: 'pre-push', run: 'branch-guard', does: m['standard.hooks.push'] },
	{
		hook: 'Claude · SessionStart',
		run: 'check-design --summary',
		does: m['standard.hooks.session']
	},
	{
		hook: 'Claude · PostToolUse',
		run: 'check-design + check-i18n --hook',
		does: m['standard.hooks.edit']
	}
];

export const ACTIONS: Message[] = [
	m['standard.github.rules.files'],
	m['standard.github.rules.names'],
	m['standard.github.rules.triggers'],
	m['standard.github.rules.steps'],
	m['standard.github.rules.secrets'],
	m['standard.github.rules.deps']
];

export const STEPS: { title: Message; text: Message }[] = [
	{ title: m['standard.start.download.title'], text: m['standard.start.download.text'] },
	{ title: m['standard.start.configure.title'], text: m['standard.start.configure.text'] },
	{ title: m['standard.start.rules.title'], text: m['standard.start.rules.text'] },
	{ title: m['standard.start.git.title'], text: m['standard.start.git.text'] },
	{ title: m['standard.start.brand.title'], text: m['standard.start.brand.text'] }
];
