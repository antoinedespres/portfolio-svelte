<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children?: Snippet } = $props();
</script>

<div class="cards-container row center-x">
	<div class="row center-x wrap cards">
		{@render children?.()}
	</div>
</div>

<style>
	.cards-container {
		width: 100%;
	}

	.cards {
		width: 70ch;
		max-width: 100%;
	}

	@media (max-width: 80ch) {
		.cards {
			width: 35ch;
		}
	}

	@media (max-width: 700px) {
		.cards {
			justify-content: center;
		}
	}
</style>
