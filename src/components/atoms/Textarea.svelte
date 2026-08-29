<script lang="ts">
	let {
		size = 'md',
		value = $bindable(''),
		label = '',
		name = '',
		rows = 6,
		required = false,
		maxlength
	}: {
		size?: string;
		value?: string;
		label?: string;
		name?: string;
		rows?: number;
		required?: boolean;
		maxlength?: number;
	} = $props();
</script>

<div class="textarea-wrapper col" style="--size: var(--{size})">
	{#if label.length > 0}
		<p class="label" class:non-empty-value={value.length > 0}>{label}</p>
	{/if}
	<textarea bind:value {name} {rows} {required} {maxlength}></textarea>
</div>

<style>
	.textarea-wrapper {
		font-size: var(--size);
		position: relative;
		border: solid var(--bord) var(--ccontrast);
		border-radius: var(--brad);
		box-shadow: var(--shad-offx) var(--shad-offy) var(--ssmth) var(--ccontrast-shadow);
		transform: translate(calc(var(--shad-offx) / -2), calc(var(--shad-offy) / -2));
		padding: 0.4em;
		background-color: var(--cfaint);
		transition: all calc(var(--trans) * 0.2s) ease-in-out;
	}

	.textarea-wrapper textarea {
		font-size: inherit;
		background-color: transparent;
		border: none;
		outline: none;
		resize: vertical;
		width: 100%;
		font: var(--font);
		color: var(--ctext);
	}

	.textarea-wrapper:focus-within {
		transition: all calc(var(--trans) * 0.2s) ease-in-out;
		box-shadow: var(--shad-offx-large) var(--shad-offy-large) var(--ssmth) var(--ccontrast-shadow);
		transform: translate(calc(var(--shad-offx) / -1), calc(var(--shad-offy) / -1));
		border-color: var(--ccontrast);
	}

	.label {
		position: absolute;
		margin-top: 0em;
		font-size: 1em;
		border: solid var(--bord) transparent;
		pointer-events: none;
		color: var(--ccontrast);
		transition:
			all calc(var(--trans) * 0.2s) ease-in-out,
			background-color calc(var(--trans) * 0.1s),
			border calc(var(--trans) * 0.1s);
	}

	.textarea-wrapper:focus-within .label,
	.label.non-empty-value {
		opacity: 1;
		transition: all calc(var(--trans) * 0.1s) ease-in-out;
		margin-top: -1.8em;
		font-size: 0.5em;
		background-color: var(--caccent-faint);
		color: var(--caccent);
		padding: 0.1em 0.3em;
		border: solid var(--bord) var(--caccent);
		border-radius: var(--brad);
		width: max-content;
	}
</style>
