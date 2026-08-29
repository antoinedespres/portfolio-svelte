<script lang="ts">
	import Slide from '$components/molecules/Slide.svelte';
	import Card from '$components/organisms/Card.svelte';
	import SlideHeader from '../molecules/SlideHeader.svelte';
	import Cards from '../organisms/Cards.svelte';
	import Separator from '../atoms/Separator.svelte';

	let { gotoSlide }: { gotoSlide: (slide: string) => void } = $props();
</script>

<Slide {gotoSlide}>
	<SlideHeader onBackClicked={() => gotoSlide('main')} title="Discover my world 🌍" />
	<Cards>
		<Card title="👔 Professional Experience" onclick={() => gotoSlide('professionalXp')} />
		<Card title="🎓 Education" onclick={() => gotoSlide('education')} />
		<Card
			title="💻 Fullstack dev portfolio"
			abstract="From frontend with Svelte and React, backend with Node.js, Java and Elixir, to devOps with Docker. I love to solve difficult problems, share my knowledge and build beautiful UI."
			onclick={() => gotoSlide('webdevShowreel')}
		/>
		<Card
			title="🎲 Game creation portfolio"
			abstract="Creating small games is my main hobby. I'm doing a bit of everything but mostly Pixel art, gameplay programming and game design. Many game jams. Godot Engine is great."
			href="https://anicetngrt.itch.io/"
		/>
		<Card
			title="🎴 Web design portfolio"
			abstract="As a self-thaught web designer I'm most proficient with minimalist, brutalist and flat design. Professional experience with web design and UI/UX. Using mostly simple techniques and tools."
			onclick={() => gotoSlide('webdesignShowreel')}
		/>
		<Card
			title="👨‍🎨 Art gallery"
			abstract="There you will discover my artworks. You'll find ink on paper works, Pixel Art works, drawings. My goal isn't to work in the art industry thought. I'm mostly keen to work and collaborate on hobby projects."
			onclick={() => gotoSlide('artGallery')}
		/>
		<div class="row">
			<Card small title="Theme editor" onclick={() => gotoSlide('themeEditor')} />
			<Card small title="Source code" href="https://github.com/AnicetNgrt/portfolio-svelte" />
		</div>
	</Cards>
	<Separator size="md" />
</Slide>
