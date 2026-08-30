<script lang="ts">
	import Separator from '$components/atoms/Separator.svelte';
	import Box from '$components/atoms/Box.svelte';

	let {
		small = false,
		title,
		abstract = '',
		href = '',
		disabled = false,
		wip = false,
		onclick
	}: {
		small?: boolean;
		title: string;
		abstract?: string;
		href?: string;
		disabled?: boolean;
		wip?: boolean;
		onclick?: (event: MouseEvent) => void;
	} = $props();

	const slim = $derived(abstract.length <= 0);
</script>

<a class="card row" {href} class:small class:disabled class:slim {onclick}>
	{#if wip}
		<span class="wip">soon</span>
	{/if}
	<Box size={small || slim ? 'sm' : 'xl'} margin>
		<div class="col">
			<h4>{title}</h4>
			{#if abstract.length > 0}
				<Separator size="mi" />
				<p class:small>{abstract}</p>
			{/if}
		</div>
	</Box>
	<div class="link col center-y" class:disabled>
		{#if !disabled}
			⋗
		{/if}
	</div>
</a>

<style>
	.card {
		overflow: hidden;
		position: relative;
		text-decoration: none;
		justify-content: space-between;
		width: 33ch;
		height: max-content;
		margin: var(--pi);
		padding: 0;
		background-color: var(--cfaint);
		border: solid var(--bord) var(--ccontrast);
		border-radius: var(--brad);
		box-shadow: var(--shad-offx) var(--shad-offy) var(--ssmth) var(--ccontrast-shadow);
		transform: translate(calc(var(--shad-offx) / -2), calc(var(--shad-offy) / -2));
		text-align: left;
		transition: all calc(var(--trans) * 0.2s) ease-in-out;
	}

	.wip {
		position: absolute;
		top: 0.6em;
		left: 79.5%;
		transform: rotate(45deg);
		font-size: 0.7em;
		background-color: var(--ctext);
		color: var(--cfaint);
		padding-bottom: 0.1em;
		padding-left: 3em;
		padding-right: 3em;
	}

	.slim .wip {
		left: 57%;
	}

	.card.disabled {
		pointer-events: none;
		filter: opacity(0.5);
	}

	.slim.card {
		font-size: var(--md);
		width: 33ch;
	}

	.slim.card h4 {
		font-size: var(--md);
	}

	.slim.card h4,
	.small.card h4 {
		padding-left: 0.3em;
	}

	/*
		A fixed width truncated the longer locales: the title is laid out at
		max-content, so anything past 15.9ch pushed the chevron column out of the
		card instead of widening it. The width is a floor now, not a ceiling.
	*/
	.small.card {
		font-size: var(--md);
		width: max-content;
		min-width: 15.9ch;
		max-width: 100%;
	}

	p.small {
		font-size: var(--mi);
	}

	.link {
		font-size: var(--md);
		flex-shrink: 0;
		min-height: 100%;
		background-color: var(--caccent-faint);
		text-decoration: none;
		padding: 0 var(--padd);
		padding-bottom: 0.15em;
		transition: all calc(var(--trans) * 0.1s) ease-out;
		border-left: solid var(--bord) transparent;
		border-top-right-radius: calc(var(--brad) * 1);
		border-bottom-right-radius: calc(var(--brad) * 1);
	}

	.link.disabled {
		background-color: var(--cfaint);
		width: 1.8em;
	}

	.card:hover,
	.card:focus {
		transition: all calc(var(--trans) * 0.1s) ease-out;
		box-shadow: var(--shad-offx-large) var(--shad-offy-large) var(--ssmth) var(--ccontrast-shadow);
		transform: translate(calc(var(--shad-offx) / -1), calc(var(--shad-offy) / -1));
		outline: none;
	}

	.card:hover .link,
	.card:focus .link,
	.card:active .link {
		transition: all calc(var(--trans) * 0.1s) ease-out;
		background-color: var(--caccent-faint);
		color: var(--caccent);
	}

	.card:active {
		transition: all calc(var(--trans) * 0.1s) ease-out;
		box-shadow: none;
		transform: translate(calc(var(--shad-offx-large) / 2), calc(var(--shad-offy-large) / 2));
	}
</style>
