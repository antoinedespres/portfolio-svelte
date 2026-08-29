<script lang="ts">
	import Slide from '$components/molecules/Slide.svelte';
	import SlideHeader from '$components/molecules/SlideHeader.svelte';
	import Separator from '$components/atoms/Separator.svelte';
	import Box from '$components/atoms/Box.svelte';
	import Button from '$components/atoms/Button.svelte';
	import { m } from '$lib/paraglide/messages';

	let { gotoSlide }: { gotoSlide: (slide: string) => void } = $props();
</script>

<Slide {gotoSlide}>
	<SlideHeader onBackClicked={() => gotoSlide('map')} title={m.slide_professional_xp()} />

	<div class="col">
		<!-- Seekube -->
		<section class="col">
			<h3 class="highlighted">{m.xp_seekube_role()}</h3>
			<Separator size="sm" />
			<div class="entry">
				<h4>Seekube</h4>
				<Separator size="pi" />
				<p class="meta">{m.xp_seekube_meta()}</p>
				<Separator size="mi" />
				<div class="body">
					<p>{m.xp_seekube_body()}</p>
					<Separator size="mi" />
					<p class="stack">AWS · MongoDB · TypeScript · React</p>
				</div>
				<Separator size="sm" />
				<Box size="sm">
					<Button size="sm" label="seekube.com" leftEmoji="🔗" round href="https://seekube.com" />
				</Box>
			</div>
		</section>

		<Separator size="xxl" />

		<!-- Career break -->
		<section class="col">
			<h3 class="highlighted">{m.xp_break_role()}</h3>
			<Separator size="sm" />
			<div class="entry">
				<p class="meta">{m.xp_break_meta()}</p>
				<Separator size="mi" />
				<div class="body">
					<ul>
						<li>{m.xp_break_b1()}</li>
						<Separator size="mi" />
						<li>{m.xp_break_b2()}</li>
						<Separator size="mi" />
						<li>{m.xp_break_b3()}</li>
					</ul>
				</div>
			</div>
		</section>

		<Separator size="xxl" />

		<!-- IDEMIA -->
		<section class="col">
			<h3 class="highlighted">{m.xp_idemia_role()}</h3>
			<Separator size="sm" />
			<div class="entry">
				<h4>IDEMIA</h4>
				<Separator size="pi" />
				<p class="meta">{m.xp_idemia_meta()}</p>
				<Separator size="mi" />
				<div class="body">
					<ul>
						<li>{m.xp_idemia_b1()}</li>
						<Separator size="mi" />
						<li>{m.xp_idemia_b2()}</li>
						<Separator size="mi" />
						<li>{m.xp_idemia_b3()}</li>
					</ul>
					<Separator size="mi" />
					<p class="stack">Angular · Jenkins · smart cards · PKI</p>
				</div>
			</div>
		</section>

		<Separator size="xl" />

		<section class="col">
			<h3 class="highlighted">{m.xp_idemia_tools_role()}</h3>
			<Separator size="sm" />
			<div class="entry">
				<h4>IDEMIA</h4>
				<Separator size="pi" />
				<p class="meta">{m.xp_idemia_tools_meta()}</p>
				<Separator size="mi" />
				<div class="body">
					<p>{m.xp_idemia_tools_body()}</p>
				</div>
			</div>
		</section>

		<Separator size="xl" />
	</div>
</Slide>

<style>
	.body {
		max-width: 70ch;
	}

	.body ul {
		margin-left: var(--sm);
	}

	.entry {
		margin-left: var(--mi);
	}

	.meta {
		color: var(--ccontrast);
	}

	.stack {
		font-size: var(--sm);
		color: var(--ccontrast);
	}
</style>
