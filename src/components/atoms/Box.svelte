<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		size,
		margin = false,
		children
	}: { size: string; margin?: boolean; children?: Snippet } = $props();
</script>

<div style="--size: var(--{size});" class:margin>
	{@render children?.()}
</div>

<style>
	div {
		font-size: var(--size);
		max-width: 100%;
		max-height: 100%;
		width: max-content;
		height: max-content;
	}

	.margin {
		margin: var(--marg);
	}
</style>
