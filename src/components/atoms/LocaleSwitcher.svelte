<script lang="ts">
	import { getLocale, setLocale, locales, type Locale } from '$lib/paraglide/runtime';

	const labels: Record<string, string> = { en: 'EN', fr: 'FR', ko: 'KO' };
	const names: Record<string, string> = {
		en: 'English',
		fr: 'Français',
		ko: '한국어'
	};

	const current = $derived(getLocale());
	const label = (l: string) => labels[l] ?? l.toUpperCase();

	let open = $state(false);
	let wrapper: HTMLDivElement | undefined = $state();

	function choose(locale: string) {
		open = false;
		if (locale !== current) setLocale(locale as Locale);
	}

	// The trigger lives inside `wrapper`, so its own click never closes the menu
	// here — it toggles instead.
	function onWindowClick(event: MouseEvent) {
		if (open && wrapper && !wrapper.contains(event.target as Node)) open = false;
	}
</script>

<svelte:window
	onclick={onWindowClick}
	onkeydown={(e) => {
		if (e.key === 'Escape') open = false;
	}}
/>

<div class="locale-switcher" bind:this={wrapper}>
	{#if open}
		<!--
			The bar is pinned to the bottom of the viewport, so the list opens
			upwards to stay on screen.
		-->
		<ul class="menu col">
			{#each locales as locale (locale)}
				<li>
					<button
						type="button"
						class="option"
						class:active={locale === current}
						aria-current={locale === current ? 'true' : undefined}
						onclick={() => choose(locale)}
					>
						<span class="code">{label(locale)}</span>
						<span class="name">{names[locale] ?? locale}</span>
					</button>
				</li>
			{/each}
		</ul>
	{/if}

	<button
		type="button"
		class="trigger"
		aria-haspopup="listbox"
		aria-expanded={open}
		aria-label="Language"
		onclick={() => (open = !open)}
	>
		{label(current)}
	</button>
</div>

<style>
	.locale-switcher {
		position: relative;
		font-size: var(--sm);
	}

	.trigger {
		font: var(--font);
		font-size: 1em;
		font-weight: bold;
		color: var(--caccent);
		background-color: var(--caccent-faint);
		border: solid var(--bord) var(--caccent);
		border-radius: 3em;
		box-shadow: var(--shad-offx) var(--shad-offy) var(--ssmth) var(--caccent-shadow);
		transform: translate(calc(var(--shad-offx) / -2), calc(var(--shad-offy) / -2));
		height: 2.1em;
		padding: 0 calc(var(--padd) * 1.2);
		cursor: pointer;
		user-select: none;
		transition: all calc(var(--trans) * 0.2s) ease-in-out;
	}

	.trigger:hover,
	.trigger:focus-visible {
		transition: all calc(var(--trans) * 0.1s) ease-out;
		box-shadow: var(--shad-offx-large) var(--shad-offy-large) var(--ssmth) var(--caccent-shadow);
		transform: translate(calc(var(--shad-offx) / -1), calc(var(--shad-offy) / -1));
		outline: none;
	}

	.menu {
		position: absolute;
		bottom: calc(100% + var(--mi));
		left: 50%;
		transform: translateX(-50%);
		margin: 0;
		padding: var(--pi);
		list-style: none;
		width: max-content;
		background-color: var(--cbg);
		border: solid var(--bord) var(--ccontrast);
		border-radius: var(--brad);
		box-shadow: var(--shad-offx) var(--shad-offy) var(--ssmth) var(--ccontrast-shadow);
		z-index: 20;
	}

	.menu li {
		margin: 0;
	}

	.option {
		display: flex;
		align-items: center;
		gap: 0.5em;
		width: 100%;
		font: var(--font);
		font-size: 1em;
		text-align: left;
		color: var(--ctext);
		background: none;
		border: none;
		border-radius: var(--brad);
		padding: 0.35em 0.6em;
		cursor: pointer;
		white-space: nowrap;
	}

	.option:hover,
	.option:focus-visible {
		background-color: var(--cfaint);
		outline: none;
	}

	.option.active {
		color: var(--caccent);
		font-weight: bold;
	}

	.option .code {
		font-weight: bold;
		min-width: 2.2em;
	}

	.option .name {
		font-size: 0.9em;
		opacity: 0.8;
	}
</style>
