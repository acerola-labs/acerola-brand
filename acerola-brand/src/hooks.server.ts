import type { Handle } from '@sveltejs/kit/hooks';
import { paraglideMiddleware } from '#lib/paraglide/server.js';

// Prerender renders each page in the locale of its URL (/pt-br/…, /en/…); a path with no prefix
// renders in the base locale and app.html sends the visitor to the cookie's locale.
export const handle: Handle = ({ event, resolve }) =>
	// The route comes from reroute (hooks.ts); the middleware only sets the locale for rendering.
	paraglideMiddleware(event.request, ({ locale }) =>
		resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
		})
	);
