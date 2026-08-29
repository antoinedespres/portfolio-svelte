<script lang="ts">
	import Slide from '$components/molecules/Slide.svelte';
	import SlideHeader from '$components/molecules/SlideHeader.svelte';
	import Separator from '$components/atoms/Separator.svelte';
	import { m } from '$lib/paraglide/messages';

	let { gotoSlide }: { gotoSlide: (slide: string) => void } = $props();

	type Cert = {
		name: string;
		issuer: string;
		issued: string;
		expires?: string;
		score?: string;
		id?: string;
		href?: string;
	};

	// Names, issuers and dates are proper nouns and numerals, so they stay here
	// rather than in the message catalogues. Only the labels around them translate.
	const languages: Cert[] = [
		{
			name: 'TOEIC',
			issuer: 'YBM',
			issued: '07/2025',
			expires: '07/2027',
			score: '955',
			id: '014301-0515004501',
			href: 'https://antoinedespres.fr/toeic'
		},
		{
			name: 'TOPIK 3급 — Test of Proficiency in Korean',
			issuer: 'NIIED',
			issued: '07/2025',
			expires: '07/2027',
			id: '3252-0279-9158-1790',
			href: 'https://antoinedespres.fr/topik'
		},
		{
			name: 'Certificat Voltaire — Orthographe',
			issuer: 'Certificat Voltaire',
			issued: '03/2024',
			expires: '03/2028',
			score: '885',
			id: 'K7MY97L',
			href: 'https://mon.certificat-voltaire.fr/verification-certificat?code=K7MY97L'
		}
	];

	// Built here rather than in the template: interleaving {#if} blocks inline
	// swallowed the spaces around the separators.
	const meta = (c: Cert) =>
		[
			`${c.issuer} · ${m.cert_issued()} ${c.issued}`,
			c.expires ? `${m.cert_expires()} ${c.expires}` : null,
			c.score ? `${m.cert_score()} ${c.score}` : null
		]
			.filter(Boolean)
			.join(' · ');

	const tech: Cert[] = [
		{
			name: 'AI for Brainstorming and Planning',
			issuer: 'Google',
			issued: '06/2026',
			id: 'W6TFPYF5U87B',
			href: 'https://www.coursera.org/account/accomplishments/verify/W6TFPYF5U87B'
		},
		{
			name: 'AI Fundamentals',
			issuer: 'Google',
			issued: '06/2026',
			id: 'HVANPHABTIPH',
			href: 'https://www.coursera.org/account/accomplishments/verify/HVANPHABTIPH'
		},
		{
			name: 'Azure AI Fundamentals (AI-900)',
			issuer: 'Microsoft',
			issued: '03/2024',
			id: '2569130',
			href: 'https://www.credly.com/badges/ffbf4f03-fe2b-46b1-8ccb-733db821627a'
		},
		{ name: 'SecNumacadémie', issuer: 'ANSSI', issued: '12/2023' },
		{
			name: 'Agile fundamentals: Scrum and Kanban',
			issuer: 'Udemy',
			issued: '01/2023',
			id: 'UC-35098100-2461-47de-bd12-3dccafb02c11',
			href: 'https://www.udemy.com/certificate/UC-35098100-2461-47de-bd12-3dccafb02c11/'
		},
		{
			name: 'Figma — UI/UX Design Essential Training',
			issuer: 'Udemy',
			issued: '08/2022',
			id: 'UC-4edb0354-8b61-461c-b966-9aea2e1f07fc',
			href: 'https://www.udemy.com/certificate/UC-4edb0354-8b61-461c-b966-9aea2e1f07fc/'
		}
	];
</script>

<Slide {gotoSlide}>
	<SlideHeader onBackClicked={() => gotoSlide('map')} title={m.slide_certifications()} />

	<div class="col certs">
		{#each [{ label: m.cert_group_languages(), items: languages }, { label: m.cert_group_tech(), items: tech }] as group (group.label)}
			<h3 class="highlighted">{group.label}</h3>
			<Separator size="sm" />
			{#each group.items as cert (cert.name)}
				<div class="cert">
					<h5>{cert.name}</h5>
					<Separator size="pi" />
					<p class="meta">{meta(cert)}</p>
					{#if cert.id}
						<p class="meta credential">
							{m.cert_id()}
							{#if cert.href}
								<a href={cert.href} target="_blank" rel="noopener noreferrer external">{cert.id}</a>
							{:else}
								<span>{cert.id}</span>
							{/if}
						</p>
					{:else if cert.href}
						<p class="meta credential">
							<a href={cert.href} target="_blank" rel="noopener noreferrer external"
								>{m.cert_verify()}</a
							>
						</p>
					{/if}
				</div>
				<Separator size="mi" />
			{/each}
			<Separator size="xl" />
		{/each}
	</div>
</Slide>

<style>
	.certs {
		max-width: 70ch;
	}

	.cert {
		margin-left: var(--mi);
	}

	.meta {
		font-size: var(--sm);
		color: var(--ccontrast);
	}

	.credential {
		font-size: var(--sm);
		word-break: break-all;
	}

	.credential a {
		color: var(--caccent);
	}
</style>
