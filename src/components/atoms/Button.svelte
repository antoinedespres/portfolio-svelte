<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		size = 'md',
		label = '',
		href = '',
		leftEmoji = '',
		rightEmoji = '',
		round = false,
		accent = false,
		relExternal = false,
		onclick,
		children
	}: {
		size?: string;
		label?: string;
		href?: string;
		leftEmoji?: string;
		rightEmoji?: string;
		round?: boolean;
		accent?: boolean;
		relExternal?: boolean;
		onclick?: (event: MouseEvent) => void;
		children?: Snippet;
	} = $props();

	const link = $derived(href.length > 0);
	const left = $derived(label.length > 0 || rightEmoji.length > 0);
	const right = $derived(label.length > 0 || leftEmoji.length > 0);
	const onechar = $derived(label.length == 0);
</script>

{#snippet content()}
	{#if leftEmoji.length > 0}
		<p class="emoji" class:left>{leftEmoji}</p>
	{/if}
	{#if label.length > 0}
		<p class="label">{label}</p>
	{/if}
	{@render children?.()}
	{#if rightEmoji.length > 0}
		<p class="emoji" class:right>{rightEmoji}</p>
	{/if}
{/snippet}

{#if !link}
	<button
		class="button row center-x center-y"
		style="--size: var(--{size})"
		class:round
		class:accent
		class:onechar
		{onclick}
	>
		{@render content()}
	</button>
{:else}
	<a
		class="button row center-x center-y"
		style="--size: var(--{size})"
		class:round
		class:accent
		class:onechar
		{href}
		rel={relExternal ? 'external' : 'internal'}
	>
		{@render content()}
	</a>
{/if}

<style>
	a {
		text-decoration: none;
	}

	.button {
		--color1: var(--cfaint);
		--color2: var(--ccontrast);
		--colorS: var(--ccontrast-shadow);

		font-size: var(--size);
		padding: 0em var(--padd);
		border: solid var(--bord) var(--color2);
		background-color: var(--color1);
		cursor: pointer;
		border-radius: var(--brad);
		box-shadow: var(--shad-offx) var(--shad-offy) var(--ssmth) var(--colorS);
		transform: translate(calc(var(--shad-offx) / -2), calc(var(--shad-offy) / -2));
		user-select: none;
		height: 2.1em;
		width: max-content;
		transition: all calc(var(--trans) * 0.2s) ease-in-out;
	}

	.button.accent {
		--color1: var(--caccent-faint);
		--color2: var(--caccent);
		--colorS: var(--caccent-shadow);
	}
	.button.accent p {
		color: var(--color2);
	}

	.button.round {
		border-radius: 3em;
		padding: 0em calc(var(--padd) * 1.5);
	}

	.button.round.onechar {
		width: 2.15em;
		height: 2.1em;
	}

	.button:hover,
	.button:focus {
		transition: all calc(var(--trans) * 0.1s) ease-out;
		box-shadow: var(--shad-offx-large) var(--shad-offy-large) var(--ssmth) var(--colorS);
		transform: translate(calc(var(--shad-offx) / -1), calc(var(--shad-offy) / -1));
		outline: none;
	}

	.button:active {
		transition: all calc(var(--trans) * 0.1s) ease-out;
		box-shadow: none;
		transform: translate(calc(var(--shad-offx-large) / 2), calc(var(--shad-offy-large) / 2));
	}

	.button p {
		color: var(--ctext);
		height: max-content;
		max-height: 100%;
		font-size: var(--size);
	}

	a .label {
		font-style: italic;
	}

	.emoji {
		font-size: 0.8em;
	}

	.emoji.left {
		margin-right: 0.2em;
	}

	.emoji.right {
		margin-left: 0.2em;
	}
</style>
