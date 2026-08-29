import { env } from '$env/dynamic/private';

const RESEND_URL = 'https://api.resend.com/emails';

export type ContactMessage = {
	name: string;
	email: string;
	subject: string;
	message: string;
};

/** Escapes the few characters that could break out of the HTML body. */
function escapeHtml(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;');
}

/**
 * Sends one contact-form submission. Returns true on success.
 *
 * The sender's address goes in reply_to rather than from, so replying works
 * without letting anyone send mail as a verified domain.
 */
export async function sendContactEmail(msg: ContactMessage): Promise<boolean> {
	const apiKey = env.RESEND_API_KEY;
	const to = env.CONTACT_TO_EMAIL;
	const from = env.CONTACT_FROM_EMAIL;

	if (!apiKey || !to || !from) {
		console.error('[mail] RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL is not set');
		return false;
	}

	const text = `From: ${msg.name} <${msg.email}>\n\n${msg.message}`;
	const html = `<p><strong>From:</strong> ${escapeHtml(msg.name)} &lt;${escapeHtml(msg.email)}&gt;</p><pre style="white-space:pre-wrap;font-family:inherit">${escapeHtml(msg.message)}</pre>`;

	try {
		const res = await fetch(RESEND_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				from,
				to: [to],
				reply_to: msg.email,
				subject: `[portfolio] ${msg.subject}`,
				text,
				html
			})
		});

		if (!res.ok) {
			console.error(`[mail] Resend returned ${res.status}: ${await res.text()}`);
			return false;
		}

		return true;
	} catch (err) {
		console.error('[mail] send failed', err);
		return false;
	}
}
