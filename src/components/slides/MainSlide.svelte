<script lang="ts">
	import Separator from '$components/atoms/Separator.svelte';
	import Button from '$components/atoms/Button.svelte';
	import Box from '$components/atoms/Box.svelte';
	import Slide from '$components/molecules/Slide.svelte';
	import DesignCredit from '$components/atoms/DesignCredit.svelte';
	import { m } from '$lib/paraglide/messages';

	let { gotoSlide }: { gotoSlide: (slide: string) => void } = $props();

	const nextSlide = 'map';
</script>

<Slide {gotoSlide}>
	<header class="row center-y wrap header">
		<img id="pp" alt="me" src="https://avatars.githubusercontent.com/u/58844676?v=4" />
		<div class="col">
			<h1 class="myname">Antoine</h1>
			<h1 class="myname">Després</h1>
		</div>
	</header>
	<Separator size="md" />
	<h4>{m.main_greeting()}</h4>
	<Separator size="mi" />
	<p id="aboutme">{m.main_about()}</p>
	<Separator size="lg" />
	<Box size="sm" margin>
		<Button
			onclick={() => gotoSlide(nextSlide)}
			size="lg"
			label={m.main_discover()}
			rightEmoji="🌍"
			accent
			round
		/>
	</Box>
	<Separator size="lg" />
	<p><i>{m.main_find_me()}</i></p>
	<Separator size="mi" />
	<div class="links row wrap">
		<Box size="sm" margin>
			<Button
				size="md"
				label="Linkedin"
				leftEmoji="👔"
				round
				href="https://www.linkedin.com/in/antoine-despres/"
			/>
		</Box>
		<Box size="sm" margin>
			<Button
				size="md"
				label="Github"
				leftEmoji="🐙"
				round
				href="https://github.com/antoinedespres"
			/>
		</Box>
	</div>
	<DesignCredit />
</Slide>

<style>
	.header {
		width: 100%;
		max-width: 100%;
	}

	.myname {
		font-size: var(--giga);
	}

	.myname:not(:first-child) {
		margin-top: calc(var(--lg) / -1);
	}

	#pp {
		font-size: var(--md);
		width: 7.5em;
		height: 7.5em;
		object-fit: cover;
		border-radius: 6em;
		margin: var(--marg) var(--sm);
		margin-left: 0;
		border: solid var(--bord) var(--ccontrast);
		box-shadow: var(--shad-offx) var(--shad-offy) var(--ssmth) var(--ccontrast-shadow);
	}

	@media (max-width: 700px) {
		#pp {
			width: 5.5em;
			height: 5.5em;
		}

		.myname {
			font-size: var(--mega);
		}

		.myname:not(:first-child) {
			margin-top: -0.275em;
		}
	}
</style>
