import type { Reroute } from '@sveltejs/kit/hooks';
import { deLocalizeUrl } from '#lib/paraglide/runtime.js';

// /pt-br/examples and /en/examples render the same route (src/routes/examples).
export const reroute: Reroute = ({ url }) => deLocalizeUrl(url).pathname;
