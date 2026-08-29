<script lang="ts">
	import Separator from '../atoms/Separator.svelte';

	let {
		min = 0,
		max = 100,
		step = 1,
		value = $bindable(50),
		label = ''
	}: { min?: number; max?: number; step?: number; value?: number; label?: string } = $props();

	const steps = $derived(Math.sqrt(Math.sqrt((max - min) / step)) * 20);
</script>

<div class="row" style="--steps: {steps};">
	<p id="label">{label}</p>
	<Separator size="md" />
	<input type="range" {min} {max} {step} bind:value />
	<Separator size="md" />
	<p>({value})</p>
</div>

<style>
	input {
		width: calc(var(--steps) * 0.5em);
	}

	#label {
		width: 9em;
	}
</style>
