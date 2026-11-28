import { m } from '#lib/paraglide/messages.js';

/** The site's pages for llms.txt: each one's name and what it holds, from the messages. */
export const PAGES = [
	{ path: '/', title: m['nav.brand'], text: m['hero.lead'] },
	{ path: '/examples/', title: m['examples.title'], text: m['examples.lead'] },
	{ path: '/examples/app/', title: m['screens.title'], text: m['screens.lead'] },
	{ path: '/examples/site/', title: m['nav.site'], text: m['landing.tag'] },
	{ path: '/standard/', title: m['nav.standard'], text: m['standard.lead'] }
];
