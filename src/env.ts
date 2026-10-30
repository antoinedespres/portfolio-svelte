import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	PUBLIC_UMAMI_WEBSITE_ID: { public: true, schema: (input) => input ?? '' },
	FRIENDLYCAPTCHA_API_KEY: { schema: (input) => input ?? '' },
	FRIENDLYCAPTCHA_ENDPOINT: { schema: (input) => input ?? '' },
	PUBLIC_FRIENDLYCAPTCHA_SITEKEY: { public: true, schema: (input) => input ?? '' },
	RESEND_API_KEY: { schema: (input) => input ?? '' },
	CONTACT_TO_EMAIL: { schema: (input) => input ?? '' },
	CONTACT_FROM_EMAIL: { schema: (input) => input ?? '' }
});
