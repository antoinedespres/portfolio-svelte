<script lang="ts">
	let {
		size = 'md',
		value = $bindable(''),
		label = '',
		name = '',
		type = 'text',
		required = false,
		maxlength,
		autocomplete,
		ignoreAutofill = false
	}: {
		size?: string;
		value?: string;
		label?: string;
		name?: string;
		type?: 'text' | 'email';
		required?: boolean;
		maxlength?: number;
		autocomplete?: 'name' | 'email' | 'off';
		/**
		 * Keeps password managers away from a field that only looks like a form
		 * control, such as the theme editor's previews. Leave false on real
		 * fields so legitimate autofill keeps working.
		 */
		ignoreAutofill?: boolean;
	} = $props();

	/*
		Every manager ships its own opt-out attribute and most ignore
		autocomplete="off" on its own, so the useful thing is to set all of them.
	*/
	const autofillAttrs = $derived(
		ignoreAutofill
			? {
					autocomplete: 'off' as const,
					'data-1p-ignore': '',
					'data-lpignore': 'true',
					'data-bwignore': 'true',
					'data-protonpass-ignore': 'true',
					'data-form-type': 'other'
				}
			: { autocomplete }
	);
</script>

<div class="input-wrapper row center-y" style="--size: var(--{size})">
	{#if label.length > 0}
		<p class="label" class:non-empty-value={value.length > 0}>{label}</p>
	{/if}
	<!-- `type` is bound statically per usage, so a bind:value + dynamic type clash cannot occur. -->
	{#if type === 'email'}
		<input type="email" bind:value {name} {required} {maxlength} {...autofillAttrs} />
	{:else}
		<input type="text" bind:value {name} {required} {maxlength} {...autofillAttrs} />
	{/if}
</div>

<style>
	.input-wrapper {
		font-size: var(--size);
		position: relative;
		border: solid var(--bord) var(--ccontrast);
		border-radius: var(--brad);
		box-shadow: var(--shad-offx) var(--shad-offy) var(--ssmth) var(--ccontrast-shadow);
		transform: translate(calc(var(--shad-offx) / -2), calc(var(--shad-offy) / -2));
		padding: 0em 0.4em;
		background-color: var(--cfaint);
		height: 2.1em;
		transition: all calc(var(--trans) * 0.2s) ease-in-out;
	}

	.input-wrapper input {
		font-size: inherit;
		background-color: transparent;
		border: none;
		outline: none;
		height: 1.2em;
		font: var(--font);
		flex: 1 1 auto;
		min-width: 0;
	}

	.input-wrapper:focus-within {
		transition: all calc(var(--trans) * 0.2s) ease-in-out;
		box-shadow: var(--shad-offx-large) var(--shad-offy-large) var(--ssmth) var(--ccontrast-shadow);
		transform: translate(calc(var(--shad-offx) / -1), calc(var(--shad-offy) / -1));
		border-color: var(--ccontrast);
		background-color: var(--cfaint);
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

	.input-wrapper:focus-within .label,
	.label.non-empty-value {
		opacity: 1;
		transition: all calc(var(--trans) * 0.1s) ease-in-out;
		margin-top: -4.5em;
		font-size: 0.5em;
		background-color: var(--caccent-faint);
		color: var(--caccent);
		padding: 0.1em 0.3em;
		border: solid var(--bord) var(--caccent);
		border-radius: var(--brad);
	}
</style>
