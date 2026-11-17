import { asset } from '$app/paths';

/** Paths `asset()` accepts: the files in static/ (including the ones the kit generates). */
type StaticPath = Parameters<typeof asset>[0];

/**
 * Address of a brand file (`/brand/...` or `/downloads/...`).
 *
 * With ASSETS_URL at build time (R2 bucket) it points there; without it, to the copy shipped with
 * the site, using a relative path that works on any URL the build is published to.
 */
export function fileUrl(path: `/${string}`): string {
	// Paths come from data/ and the examples; the /brand folder itself is accepted as a base too.
	return __ASSETS_URL__ ? `${__ASSETS_URL__}${path}` : asset(path as StaticPath);
}

/** The same address, absolute: for snippets to show and copy. Browser only. */
export function absoluteFileUrl(path: `/${string}`): string {
	return new URL(fileUrl(path), document.baseURI).href;
}

export function formatBytes(bytes: number): string {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
	return `${(bytes / 1024 / 1024).toFixed(1).replace('.', ',')} MB`;
}
