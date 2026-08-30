<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import Slide from '$components/molecules/Slide.svelte';
	import SlideHeader from '$components/molecules/SlideHeader.svelte';
	import Separator from '$components/atoms/Separator.svelte';
	import Input from '$components/atoms/Input.svelte';
	import Textarea from '$components/atoms/Textarea.svelte';
	import Button from '$components/atoms/Button.svelte';
	import Box from '$components/atoms/Box.svelte';
	import { m } from '$lib/paraglide/messages';
	import { getLocale } from '$lib/paraglide/runtime';
	import { env } from '$env/dynamic/public';

	let { gotoSlide }: { gotoSlide: (slide: string) => void } = $props();

	let submitting = $state(false);

	const form = $derived(page.form);
	const errors = $derived((form?.errors ?? {}) as Record<string, string>);
	const values = $derived((form?.values ?? {}) as Record<string, string>);
	const succeeded = $derived(form?.success === true);

	// The action returns message keys, so the text renders in the active locale.
	const messages = m as unknown as Record<string, () => string>;
	const t = (key: string | undefined) => (key ? (messages[key]?.() ?? key) : '');

	/*
		The SDK scans the document for .frc-captcha exactly once, when its script
		finishes loading. Slide only renders its children on mount, so that scan
		always runs before this widget exists and never picks it up: the element
		stays empty, no frc-captcha-response field is created, and verifyCaptcha
		rejects every submission. Attaching by hand is what actually mounts it.

		This hangs off the element rather than the component on purpose. On success
		the form is swapped for the banner while the component stays alive, and a
		widget outliving its own iframe throws on the next message it posts.
	*/
	const SDK_POLL_MS = 50;
	const SDK_TIMEOUT_MS = 10_000;

	function friendlyCaptcha(node: HTMLElement) {
		let stopped = false;
		let widget: { destroy: () => void } | undefined;
		const startedAt = Date.now();

		// The SDK script is async, so the global may not exist yet.
		const attach = () => {
			if (stopped) return;

			const sdk = window.frcaptcha;
			if (sdk) {
				sdk.attach();
				widget = sdk.getAllWidgets().find((w) => w.getElement() === node);
				return;
			}

			if (Date.now() - startedAt >= SDK_TIMEOUT_MS) {
				console.error('[captcha] the Friendly Captcha SDK never loaded; the form cannot be sent');
				return;
			}

			setTimeout(attach, SDK_POLL_MS);
		};

		attach();

		return {
			destroy() {
				stopped = true;
				widget?.destroy();
			}
		};
	}
</script>

<Slide {gotoSlide}>
	<SlideHeader onBackClicked={() => gotoSlide('main')} title={m.slide_contact()} />

	<div class="col contact">
		{#if succeeded}
			<div class="banner success">
				<p>{m.contact_success()}</p>
			</div>
		{:else}
			<p>{m.contact_intro()}</p>
			<Separator size="md" />

			{#if errors.form}
				<div class="banner error">
					<p>{t(errors.form)}</p>
				</div>
				<Separator size="md" />
			{/if}

			<form
				method="POST"
				use:enhance={() => {
					submitting = true;
					return async ({ update }) => {
						await update({ reset: false });
						submitting = false;
					};
				}}
			>
				<!-- Honeypot. Hidden from people, tempting to bots. -->
				<div class="honeypot" aria-hidden="true">
					<label for="website">Leave this empty</label>
					<input id="website" name="website" type="text" tabindex="-1" autocomplete="off" />
				</div>

				<Input
					name="name"
					label={m.contact_name()}
					value={values.name ?? ''}
					required
					maxlength={100}
					autocomplete="name"
				/>
				{#if errors.name}<p class="field-error">{t(errors.name)}</p>{/if}
				<Separator size="md" />

				<Input
					name="email"
					type="email"
					label={m.contact_email()}
					value={values.email ?? ''}
					required
					maxlength={254}
					autocomplete="email"
				/>
				{#if errors.email}<p class="field-error">{t(errors.email)}</p>{/if}
				<Separator size="md" />

				<Input
					name="subject"
					label={m.contact_subject()}
					value={values.subject ?? ''}
					required
					maxlength={200}
				/>
				{#if errors.subject}<p class="field-error">{t(errors.subject)}</p>{/if}
				<Separator size="md" />

				<Textarea
					name="message"
					label={m.contact_message()}
					value={values.message ?? ''}
					required
					maxlength={5000}
				/>
				{#if errors.message}<p class="field-error">{t(errors.message)}</p>{/if}
				<Separator size="md" />

				<div
					class="frc-captcha"
					use:friendlyCaptcha
					data-sitekey={env.PUBLIC_FRIENDLYCAPTCHA_SITEKEY}
					data-lang={getLocale()}
				></div>
				<Separator size="md" />

				<Box size="sm">
					<Button
						size="md"
						label={submitting ? m.contact_sending() : m.contact_send()}
						rightEmoji="📮"
						accent
						round
					/>
				</Box>
			</form>
		{/if}
	</div>
	<Separator size="xl" />
</Slide>

<style>
	.contact {
		width: 100%;
		max-width: 50ch;
	}

	.contact form {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.honeypot {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}

	.banner {
		padding: var(--mi) var(--sm);
		border: solid var(--bord) var(--ccontrast);
		border-radius: var(--brad);
	}

	.banner.success {
		background-color: var(--caccent-faint);
		border-color: var(--caccent);
	}

	.banner.success p {
		color: var(--caccent);
	}

	.banner.error {
		background-color: var(--cfaint);
	}

	.field-error {
		font-size: var(--sm);
		color: var(--caccent);
		margin-top: var(--pi);
	}
</style>
