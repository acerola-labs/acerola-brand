import { onMount } from 'svelte';
import { THEME_COOKIE, writeCookie } from '#lib/utils/preference.util.ts';

export type Theme = 'dark' | 'light';

/** A single theme for the whole page: the top bar switches it, the color swatches read it. */
let theme = $state<Theme>('dark');

/**
 * Page theme (dark is the brand default). app.html already applies the shared cookie before the
 * first paint; this only reads and switches it, saving the choice for every Acerola site.
 */
export function useTheme() {
	onMount(() => {
		theme = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
	});

	function set(next: Theme) {
		theme = next;
		document.documentElement.dataset.theme = next;
		writeCookie(THEME_COOKIE, next);
	}

	return {
		get current() {
			return theme;
		},
		toggle: () => set(theme === 'dark' ? 'light' : 'dark')
	};
}
