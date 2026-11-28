import { getLocale, setLocale, type Locale } from '#lib/paraglide/runtime.js';

/**
 * The page's locale comes from its URL (/pt-br/…, /en/…). Switching it saves the choice in the
 * cookie every Acerola site shares (hooks.client.ts) and opens the same page in the other locale.
 */
export function useLocale() {
	return {
		get current(): Locale {
			return getLocale();
		},
		toggle: () => setLocale(getLocale() === 'en' ? 'pt-br' : 'en')
	};
}
