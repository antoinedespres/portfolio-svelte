<script lang="ts">
	import Slide from '$components/molecules/Slide.svelte';
	import SlideHeader from '$components/molecules/SlideHeader.svelte';
	import Separator from '$components/atoms/Separator.svelte';
	import Button from '$components/atoms/Button.svelte';
	import Box from '$components/atoms/Box.svelte';
	import { m } from '$lib/paraglide/messages';

	let { gotoSlide }: { gotoSlide: (slide: string) => void } = $props();

	type Project = {
		name: string;
		subtitle: string;
		info: string;
		body: string;
		stack: string;
		repo: string;
	};

	const projects: Project[] = [
		{
			name: 'home-automation-pi',
			subtitle: m.proj_ha_setup_sub(),
			info: 'Home automation · Raspberry Pi 4B',
			body: m.proj_ha_setup_body(),
			stack: 'Docker · Home Assistant · Zigbee · Pi-hole',
			repo: 'home-automation-pi'
		},
		{
			name: 'home-assistant-bot',
			subtitle: m.proj_ha_bot_sub(),
			info: 'Discord bot · self-hosted',
			body: m.proj_ha_bot_body(),
			stack: 'Python · Discord · Home Assistant',
			repo: 'home-assistant-bot'
		},
		{
			name: 'Tenky',
			subtitle: m.proj_tenky_sub(),
			info: 'Android · 2021, rewritten 2026',
			body: m.proj_tenky_body(),
			stack: 'Kotlin · Jetpack Compose · OpenWeatherMap API',
			repo: 'Tenky'
		},
		{
			name: 'pi-monitoring',
			subtitle: m.proj_pi_sub(),
			info: 'Discord bot · self-hosted',
			body: m.proj_pi_body(),
			stack: 'Python · Discord · SSH · Docker',
			repo: 'pi-monitoring'
		},
		{
			name: 'vps-monitoring',
			subtitle: m.proj_vps_sub(),
			info: 'Discord bot · self-hosted',
			body: m.proj_vps_body(),
			stack: 'Python · Discord · Linux',
			repo: 'vps-monitoring'
		}
	];
</script>

<Slide {gotoSlide}>
	<SlideHeader onBackClicked={() => gotoSlide('map')} title={m.slide_webdev()} />

	<div class="col projects">
		{#each projects as project, i (project.name)}
			{#if i > 0}
				<Separator size="xxl" />
			{/if}
			<section class="col">
				<h3 class="highlighted">{project.name}</h3>
				<Separator size="sm" />
				<div class="entry">
					<h4>{project.subtitle}</h4>
					<Separator size="pi" />
					<p class="meta">{project.info}</p>
					<Separator size="mi" />
					<div class="body">
						<p>{project.body}</p>
						<Separator size="mi" />
						<p class="stack">{project.stack}</p>
					</div>
					<Separator size="sm" />
					<Box size="sm">
						<Button
							size="sm"
							label={m.proj_source()}
							leftEmoji="🐙"
							round
							href="https://github.com/antoinedespres/{project.repo}"
							relExternal
						/>
					</Box>
				</div>
			</section>
		{/each}
	</div>

	<Separator size="xl" />
</Slide>

<style>
	.projects {
		max-width: 70ch;
	}

	.body {
		max-width: 70ch;
	}

	.entry {
		margin-left: var(--mi);
	}

	.meta,
	.stack {
		font-size: var(--sm);
		color: var(--ccontrast);
	}
</style>
