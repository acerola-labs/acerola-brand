import type { CompilerOptions } from '@inlang/paraglide-js';

/**
 * i18n of every Acerola site (acerola-project skill, section 2):
 *
 * - both locales live under a prefix (/pt-br/…, /en/…): the URL decides what renders;
 * - custom-acerola is the acerola-locale cookie shared by every site on acerola.app
 *   (src/hooks.client.ts); setLocale() writes it;
 * - a path with no prefix goes to the cookie's locale (app.html, before the first paint).
 *
 * Used by scripts/i18n.mjs (npm run i18n).
 */
export const paraglide = {
	project: './project.inlang',
	outdir: './src/lib/paraglide',
	strategy: ['url', 'custom-acerola', 'baseLocale'],
	urlPatterns: [
		{
			pattern: '/:path(.*)?',
			localized: [
				['pt-br', '/pt-br/:path(.*)?'],
				['en', '/en/:path(.*)?']
			]
		}
	]
} satisfies CompilerOptions;
