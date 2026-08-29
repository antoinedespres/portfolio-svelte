<script lang="ts">
	import type { Component } from 'svelte';
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';
	import { goto } from '$app/navigation';
	import { localizeHref } from '$lib/paraglide/runtime';

	import { initNavigation, updateNavigation } from '$logic/navigation';
	import MainSlide from '$components/slides/MainSlide.svelte';
	import MapSlide from '$components/slides/MapSlide.svelte';
	import ProfessionalXpSlide from '$components/slides/ProfessionalXpSlide.svelte';
	import Education from '$components/slides/Education.svelte';
	import WebDevShowreel from '$components/slides/WebDevShowreel.svelte';
	import ThemeEditor from '$components/slides/ThemeEditor.svelte';
	import ContactSlide from '$components/slides/ContactSlide.svelte';
	import Certifications from '$components/slides/Certifications.svelte';

	type SlideProps = { gotoSlide: (slide: string) => void };
	type SlideEntry = { url: string; component: Component<SlideProps>; name?: string };

	let { slideOverride = null }: { slideOverride?: string | null } = $props();

	const availableSlides: Record<string, SlideEntry> = {
		main: { url: '/', component: MainSlide },
		professionalXp: { url: '/professional-xp', component: ProfessionalXpSlide },
		education: { url: '/education', component: Education },
		certifications: { url: '/certifications', component: Certifications },
		map: { url: '/map', component: MapSlide },
		themeEditor: { url: '/theme-editor', component: ThemeEditor },
		webdevShowreel: { url: '/fullstackdev-portfolio', component: WebDevShowreel },
		contact: { url: '/contact', component: ContactSlide }
	};

	let shownSlides = $state<SlideEntry[]>([]);
	let prevSlide: string | undefined = undefined;
	let animating = $state(false);
	let y = $state(0);

	const animatedY = tweened(0, { duration: 500, easing: cubicInOut });

	// The incoming slide is rendered first so the outgoing one sits on top and
	// slides away; `toReversed` keeps `shownSlides` itself untouched.
	const stack = $derived(shownSlides.toReversed());

	onMount(() => {
		const savedNav = slideOverride
			? { slideName: slideOverride, prevSlide: 'map' }
			: initNavigation();
		shownSlides = [nameToSlide(savedNav.slideName)];
		prevSlide = savedNav.prevSlide;
	});

	function nameToSlide(name: string): SlideEntry {
		return { ...availableSlides[name], name };
	}

	function gotoSlide(slideName: string) {
		const slide = nameToSlide(slideName);

		shownSlides = [...shownSlides, slide];
		setTimeout(() => {
			y = 0;
			animatedY.set(1);
			animating = true;
			setTimeout(() => {
				animating = false;
				animatedY.set(0);
				prevSlide = shownSlides[0].name;
				updateNavigation({ prevSlide, slideName });
				shownSlides = [slide];
				goto(localizeHref(slide.url));
			}, 500);
		}, 1);
	}
</script>

<div class="slides" style="--top-mult: {y + (animating ? $animatedY : 0)}">
	{#each stack as entry (entry.name)}
		{@const SlideComponent = entry.component}
		<div class="slide">
			<SlideComponent {gotoSlide} />
		</div>
	{/each}
</div>

<style>
	.slide {
		position: absolute;
		top: 0px;
		left: 0px;
		transform: translateY(0%);
	}

	.slide:last-child {
		transform: translateY(calc(var(--top-mult) * 100%));
	}

	.slides {
		position: relative;
	}
</style>
