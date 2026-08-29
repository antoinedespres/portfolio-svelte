<script lang="ts">
	import Slide from '$components/molecules/Slide.svelte';
	import SlideHeader from '$components/molecules/SlideHeader.svelte';
	import Separator from '$components/atoms/Separator.svelte';
	import { m } from '$lib/paraglide/messages';

	let { gotoSlide }: { gotoSlide: (slide: string) => void } = $props();
</script>

<Slide {gotoSlide}>
	<SlideHeader onBackClicked={() => gotoSlide('map')} title={m.slide_education()} />

	<div class="col">
		<section class="col">
			<h3 class="highlighted">{m.edu_efrei_degree()}</h3>
			<Separator size="sm" />
			<div class="entry">
				<h4>EFREI — Grande école du numérique</h4>
				<Separator size="pi" />
				<p class="meta">{m.edu_efrei_meta()}</p>
				<Separator size="mi" />
				<div class="body">
					<ul>
						<li>{m.edu_efrei_b1()}</li>
						<Separator size="mi" />
						<li>{m.edu_efrei_b2()}</li>
						<Separator size="mi" />
						<li>{m.edu_efrei_b3()}</li>
					</ul>
				</div>
			</div>
		</section>

		<Separator size="xxl" />

		<section class="col">
			<h3 class="highlighted">{m.edu_iut_degree()}</h3>
			<Separator size="sm" />
			<div class="entry">
				<h4>IUT de Paris — Rives de Seine</h4>
				<Separator size="pi" />
				<p class="meta">{m.edu_iut_meta()}</p>
				<Separator size="mi" />
				<div class="body">
					<p>{m.edu_iut_body()}</p>
				</div>
			</div>
		</section>

		<Separator size="xxl" />

		<section class="col">
			<h3 class="highlighted">{m.edu_sejong_degree()}</h3>
			<Separator size="sm" />
			<div class="entry">
				<h4>Institut Roi Sejong · 프랑스 거점 세종학당</h4>
				<Separator size="pi" />
				<p class="meta">{m.edu_sejong_meta()}</p>
				<Separator size="mi" />
				<div class="body">
					<p>{m.edu_sejong_body()}</p>
				</div>
			</div>
		</section>

		<Separator size="xl" />

		<section class="col">
			<h3 class="highlighted">{m.edu_lexis_degree()}</h3>
			<Separator size="sm" />
			<div class="entry">
				<h4>Lexis Korea</h4>
				<Separator size="pi" />
				<p class="meta">{m.edu_lexis_meta()}</p>
			</div>
		</section>

		<Separator size="xl" />

		<section class="col">
			<h3 class="highlighted">{m.edu_bac_degree()}</h3>
			<Separator size="sm" />
			<div class="entry">
				<h4>Lycée La Salle Saint-Denis</h4>
				<Separator size="pi" />
				<p class="meta">{m.edu_bac_meta()}</p>
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
</style>
