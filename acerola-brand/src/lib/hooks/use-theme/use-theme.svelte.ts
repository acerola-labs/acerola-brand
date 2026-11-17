import { onMount } from 'svelte';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'acerola-theme';

/** A single theme for the whole page: the top bar switches it, the color swatches read it. */
let theme = $state<Theme>('dark');

/**
 * Page theme (dark is the brand default). app.html already applies the stored theme before the
 * first paint; this only reads and switches it, saving the choice when storage allows.
 */
export function useTheme() {
	onMount(() => {
		theme = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
	});

	function set(next: Theme) {
		theme = next;
		document.documentElement.dataset.theme = next;
		try {
			localStorage.setItem(STORAGE_KEY, next);
		} catch {
			// no storage: the switch lasts for this visit only
		}
	}

	return {
		get current() {
			return theme;
		},
		toggle: () => set(theme === 'dark' ? 'light' : 'dark')
	};
}
