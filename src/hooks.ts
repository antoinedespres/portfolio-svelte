import type { Reroute } from '@sveltejs/kit/hooks';
import { deLocalizeUrl } from '#lib/paraglide/runtime.js';

// Strips the locale prefix so /fr/map resolves to the existing /map route.
export const reroute: Reroute = (request) => deLocalizeUrl(request.url).pathname;
