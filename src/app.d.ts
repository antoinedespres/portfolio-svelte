declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	interface FriendlyCaptchaWidget {
		destroy: () => void;
		getElement: () => HTMLElement;
	}

	interface Window {
		/**
		 * Exposed by the Friendly Captcha SDK loaded from app.html. Absent until
		 * that script has run, which is why ContactSlide waits for it.
		 */
		frcaptcha?: {
			attach: () => void;
			getAllWidgets: () => FriendlyCaptchaWidget[];
		};
	}
}

export {};
