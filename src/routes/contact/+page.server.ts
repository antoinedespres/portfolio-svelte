import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { CAPTCHA_FIELD, verifyCaptcha } from '$lib/server/captcha';
import { sendContactEmail } from '$lib/server/mail';
import { rateLimit } from '$lib/server/rate-limit';

const LIMITS = { name: 100, email: 254, subject: 200, message: 5000 };

/** Deliberately loose: the address only has to be plausible and replyable. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(data: FormData, key: string): string {
	const value = data.get(key);
	return typeof value === 'string' ? value.trim() : '';
}

export const actions = {
	default: async ({ request, getClientAddress }) => {
		const data = await request.formData();

		// Honeypot: a real person never sees this field, so a filled one is a bot.
		// Answer as if it succeeded, rather than telling them why they failed.
		if (field(data, 'website').length > 0) {
			return { success: true };
		}

		const name = field(data, 'name');
		const email = field(data, 'email');
		const subject = field(data, 'subject');
		const message = field(data, 'message');
		const values = { name, email, subject, message };

		const errors: Record<string, string> = {};
		if (!name) errors.name = 'contact_error_name_required';
		else if (name.length > LIMITS.name) errors.name = 'contact_error_name_too_long';

		if (!email) errors.email = 'contact_error_email_required';
		else if (email.length > LIMITS.email || !EMAIL_RE.test(email))
			errors.email = 'contact_error_email_invalid';

		if (!subject) errors.subject = 'contact_error_subject_required';
		else if (subject.length > LIMITS.subject) errors.subject = 'contact_error_subject_too_long';

		if (!message) errors.message = 'contact_error_message_required';
		else if (message.length > LIMITS.message) errors.message = 'contact_error_message_too_long';

		if (Object.keys(errors).length > 0) {
			return fail(400, { errors, values });
		}

		if (!rateLimit(getClientAddress())) {
			return fail(429, { errors: { form: 'contact_error_rate_limited' }, values });
		}

		if (!(await verifyCaptcha(data.get(CAPTCHA_FIELD)))) {
			return fail(400, { errors: { form: 'contact_error_captcha' }, values });
		}

		if (!(await sendContactEmail({ name, email, subject, message }))) {
			return fail(500, { errors: { form: 'contact_error_send_failed' }, values });
		}

		return { success: true };
	}
} satisfies Actions;
