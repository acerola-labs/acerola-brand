import { PAGES } from '#lib/data/pages.ts';
import { m } from '#lib/paraglide/messages.js';
import {
	baseLocale,
	extractLocaleFromUrl,
	localizeHref,
	locales,
	type Locale
} from '#lib/paraglide/runtime.js';
import type { RequestHandler } from './$types';

export const prerender = true;
export const trailingSlash = 'never';

const text = (body: string) =>
	new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });

const LOCALE_NAMES: Record<Locale, string> = { 'pt-br': 'Português', en: 'English' };

/**
 * /llms.txt is the index of the per-locale files (/pt-br/llms.txt, /en/llms.txt); each one
 * describes the site and its pages in its locale (llmstxt.org).
 */
export const GET: RequestHandler = ({ url }) => {
	const locale = extractLocaleFromUrl(url);
	const shown = locale ?? baseLocale;
	const head = `# ${m['site.title']({}, { locale: shown })}\n\n> ${m['site.description']({}, { locale: shown })}\n`;

	if (!locale) {
		const files = locales
			.map(
				(l) =>
					`- [${LOCALE_NAMES[l]}](${__SITE_URL__}${localizeHref('/llms.txt', { locale: l })})`
			)
			.join('\n');
		return text(`${head}\n## ${m['llms.locales']({}, { locale: shown })}\n\n${files}\n`);
	}

	const pages = PAGES.map(
		(page) =>
			`- [${page.title({}, { locale })}](${__SITE_URL__}${localizeHref(page.path, { locale })}): ${page.text({}, { locale })}`
	).join('\n');
	return text(`${head}\n## ${m['llms.pages']({}, { locale })}\n\n${pages}\n`);
};
