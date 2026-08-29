<script lang="ts">
	import '$styles/theme-engine.css';
	import '$styles/themes.css';
	import '$styles/global.css';
	import '$styles/flex-helpers.css';

	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { m } from '$lib/paraglide/messages';
	import {
		baseLocale,
		locales,
		localizeHref,
		deLocalizeHref,
		getLocale
	} from '$lib/paraglide/runtime';

	let { children }: { children?: Snippet } = $props();

	let unmounted = $state(true);
	onMount(() => {
		unmounted = false;
	});

	const siteUrl = 'https://antoinedespres.com';
	const thumbnail = `${siteUrl}/images/thumbnail.jpg`;

	const title = $derived(m.site_title());
	const description = $derived(m.site_description());
	const keywords = $derived(m.site_keywords());

	// Canonical + hreflang for the current page in every locale. The path has to
	// be de-localized first, otherwise /fr/map would localize into /ko/fr/map.
	const basePath = $derived(deLocalizeHref(page.url.pathname));
	const canonical = $derived(`${siteUrl}${localizeHref(basePath, { locale: getLocale() })}`);
	const alternates = $derived(
		locales.map((locale) => ({ locale, href: `${siteUrl}${localizeHref(basePath, { locale })}` }))
	);
	// x-default points at the base locale, not whatever locale is being viewed.
	const xDefault = $derived(`${siteUrl}${localizeHref(basePath, { locale: baseLocale })}`);
</script>

<svelte:head>
	<meta name="application-name" content={title} />
	<meta name="keywords" content={keywords} />
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	{#each alternates as { locale, href } (locale)}
		<link rel="alternate" hreflang={locale} {href} />
	{/each}
	<link rel="alternate" hreflang="x-default" href={xDefault} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="og:url" content={canonical} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={thumbnail} />
	<meta property="og:image:secure_url" content={thumbnail} />
	<meta property="og:image:type" content="image/jpeg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={title} />
</svelte:head>

<main class="main-theme light-theme theme-compute" class:unmounted>
	{@render children?.()}
</main>

<style>
	main {
		height: 100vh;
		overflow-x: hidden;
	}

	.unmounted {
		opacity: 0;
	}
</style>
