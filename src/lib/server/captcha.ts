import { FRIENDLYCAPTCHA_API_KEY, FRIENDLYCAPTCHA_ENDPOINT } from '$app/env/private';
import { PUBLIC_FRIENDLYCAPTCHA_SITEKEY } from '$app/env/public';

/**
 * Friendly Captcha's EU endpoint, for data residency. Override with
 * FRIENDLYCAPTCHA_ENDPOINT to use the global endpoint
 * (https://global.frcapi.com/api/v2/captcha/siteverify) or a self-hosted one.
 */
const DEFAULT_SITEVERIFY_URL = 'https://eu.frcapi.com/api/v2/captcha/siteverify';

/** The field name the v2 widget injects into the surrounding form. */
export const CAPTCHA_FIELD = 'frc-captcha-response';

/**
 * Verifies a captcha solution server-side.
 *
 * Swapping providers (Turnstile, hCaptcha) means changing this function and the
 * widget markup in ContactSlide.svelte, and nothing else.
 */
export async function verifyCaptcha(token: FormDataEntryValue | null): Promise<boolean> {
	if (typeof token !== 'string' || token.length === 0) return false;

	const apiKey = FRIENDLYCAPTCHA_API_KEY;
	if (!apiKey) {
		console.error('[captcha] FRIENDLYCAPTCHA_API_KEY is not set; rejecting submission');
		return false;
	}

	try {
		const res = await fetch(FRIENDLYCAPTCHA_ENDPOINT || DEFAULT_SITEVERIFY_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'X-API-Key': apiKey },
			body: JSON.stringify({ response: token, sitekey: PUBLIC_FRIENDLYCAPTCHA_SITEKEY })
		});

		if (!res.ok) {
			console.error(`[captcha] siteverify returned ${res.status}`);
			return false;
		}

		const body: { success?: boolean } = await res.json();
		return body.success === true;
	} catch (err) {
		console.error('[captcha] siteverify request failed', err);
		return false;
	}
}
