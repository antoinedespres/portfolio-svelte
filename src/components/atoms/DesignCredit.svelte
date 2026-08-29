<script lang="ts">
	import { m } from '$lib/paraglide/messages';
</script>

<div class="design-credit">
	<a
		href="https://github.com/AnicetNgrt/portfolio-svelte"
		target="_blank"
		rel="noopener noreferrer external"
	>
		{m.design_credit()} <span class="handle">@AnicetNgrt</span>
	</a>
</div>

<style>
	.design-credit {
		/*
			#frame is inset by var(--sm) and drawn with a 2px border. At exactly
			var(--sm) the credit's last glyph lands on that border and reads as cut
			off, so it is inset one step further to clear it.
		*/
		position: fixed;
		right: calc(var(--sm) + var(--mi));
		bottom: calc(var(--sm) + var(--mi));
		z-index: 10;
		font-size: var(--sm);
		max-width: 40vw;
		text-align: right;
	}

	.design-credit a {
		color: var(--ctext);
		opacity: 0.55;
		text-decoration: none;
		font-size: 0.8em;
		transition: opacity calc(var(--trans) * 0.1s) ease-in-out;
	}

	.design-credit a:hover,
	.design-credit a:focus-visible {
		opacity: 1;
		text-decoration: underline;
		outline: none;
	}

	.handle {
		font-weight: bold;
	}

	/*
		Below this width the bottom bar grows to fill the viewport, so the credit
		moves above it rather than sitting on top of it.
	*/
	@media (max-width: 700px) {
		.design-credit {
			right: 50%;
			transform: translateX(50%);
			bottom: calc(1.6 * var(--mega));
			max-width: 90vw;
			text-align: center;
		}
	}
</style>
