/**
 * Per-IP submission limit, held in memory.
 *
 * adapter-node runs a single process, so a module-level Map is enough here and
 * costs nothing. Behind more than one instance this would need shared storage.
 */
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;

const hits = new Map<string, number[]>();

export function rateLimit(key: string, now = Date.now()): boolean {
	const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

	if (recent.length >= MAX_PER_WINDOW) {
		hits.set(key, recent);
		return false;
	}

	recent.push(now);
	hits.set(key, recent);

	// Opportunistic cleanup so the map cannot grow without bound.
	if (hits.size > 10_000) {
		for (const [k, times] of hits) {
			if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
		}
	}

	return true;
}
