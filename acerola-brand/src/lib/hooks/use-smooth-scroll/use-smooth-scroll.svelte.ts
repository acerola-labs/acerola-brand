import { onMount } from 'svelte';
import gsap from 'gsap';
import Lenis from 'lenis';

/**
 * Smooth scrolling (Lenis) on the GSAP clock, so animation and scrolling move together. Anchor
 * links (#brand) scroll smoothly too. With prefers-reduced-motion nothing changes: scrolling stays
 * the browser's.
 */
export function useSmoothScroll() {
	onMount(() => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const lenis = new Lenis({ anchors: { offset: -72 }, lerp: 0.1 });
		const tick = (time: number) => lenis.raf(time * 1000);
		gsap.ticker.add(tick);
		gsap.ticker.lagSmoothing(0);

		return () => {
			gsap.ticker.remove(tick);
			lenis.destroy();
		};
	});
}
