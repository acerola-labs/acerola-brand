import { onMount } from 'svelte';
import {
	baseLocale,
	isLocale,
	overwriteGetLocale,
	overwriteSetLocale,
	type Locale
} from '#lib/paraglide/runtime.js';

const STORAGE_KEY = 'acerola-locale';

/**
 * The current locale as Svelte state. Paraglide messages call getLocale() on every render, so
 * pointing it at this state makes every m['…']() in a template reactive: switching the language
 * re-renders the text without a reload.
 *
 * The page is prerendered in the base locale; the stored/browser locale is applied only after
 * mount, so hydration always matches the static HTML.
 */
let current = $state<Locale>(baseLocale);

overwriteGetLocale(() => current);
overwriteSetLocale((next) => {
	current = next;
	document.documentElement.lang = next;
	try {
		localStorage.setItem(STORAGE_KEY, next);
	} catch {
		// no storage (private window, preview): the choice lasts for this visit only
	}
});

function preferred(): Locale {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored && isLocale(stored)) return stored;
	} catch {
		// no storage: fall through to the browser language
	}
	return navigator.language.toLowerCase().startsWith('pt') ? baseLocale : 'en';
}

export function useLocale() {
	onMount(() => {
		const locale = preferred();
		if (locale !== current) {
			current = locale;
			document.documentElement.lang = locale;
		}
	});

	return {
		get current() {
			return current;
		},
		toggle: () => {
			const next: Locale = current === 'en' ? 'pt-br' : 'en';
			current = next;
			document.documentElement.lang = next;
			try {
				localStorage.setItem(STORAGE_KEY, next);
			} catch {
				// no storage: the choice lasts for this visit only
			}
		}
	};
}
