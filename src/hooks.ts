import type { Reroute } from '@sveltejs/kit';
import { deLocalizeUrl } from '$lib/paraglide/runtime';

// Strips the locale prefix so /fr/map resolves to the existing /map route.
export const reroute: Reroute = (request) => deLocalizeUrl(request.url).pathname;
