<script lang="ts">
	import Slide from '$components/molecules/Slide.svelte';
	import Card from '$components/organisms/Card.svelte';
	import SlideHeader from '../molecules/SlideHeader.svelte';
	import Cards from '../organisms/Cards.svelte';
	import Separator from '../atoms/Separator.svelte';
	import { m } from '$lib/paraglide/messages';

	let { gotoSlide }: { gotoSlide: (slide: string) => void } = $props();
</script>

<Slide {gotoSlide}>
	<SlideHeader onBackClicked={() => gotoSlide('main')} title={m.map_title()} />
	<Cards>
		<Card title={m.map_professional_xp()} onclick={() => gotoSlide('professionalXp')} />
		<Card title={m.map_education()} onclick={() => gotoSlide('education')} />
		<Card
			title={m.map_certifications()}
			abstract={m.map_certifications_abstract()}
			onclick={() => gotoSlide('certifications')}
		/>
		<Card
			title={m.map_webdev()}
			abstract={m.map_webdev_abstract()}
			onclick={() => gotoSlide('webdevShowreel')}
		/>
		<div class="row">
			<Card small title={m.map_theme_editor()} onclick={() => gotoSlide('themeEditor')} />
			<Card
				small
				title={m.map_source_code()}
				href="https://github.com/antoinedespres/portfolio-svelte"
			/>
		</div>
	</Cards>
	<Separator size="md" />
</Slide>
