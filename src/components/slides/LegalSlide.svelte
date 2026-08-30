<script lang="ts">
	import Slide from '$components/molecules/Slide.svelte';
	import SlideHeader from '$components/molecules/SlideHeader.svelte';
	import Separator from '$components/atoms/Separator.svelte';
	import { m } from '$lib/paraglide/messages';

	let { gotoSlide }: { gotoSlide: (slide: string) => void } = $props();
</script>

<Slide {gotoSlide}>
	<SlideHeader onBackClicked={() => gotoSlide('map')} title={m.slide_legal()} />

	<div class="col legal">
		<h3 class="highlighted">{m.legal_notice_title()}</h3>
		<Separator size="md" />

		<section class="col">
			<h4>{m.legal_publisher_title()}</h4>
			<Separator size="mi" />
			<p>{m.legal_publisher_body()}</p>
			<Separator size="mi" />
			<p>{m.legal_publisher_contact()}</p>
		</section>

		<Separator size="xl" />

		<section class="col">
			<h4>{m.legal_host_title()}</h4>
			<Separator size="mi" />
			<p>{m.legal_host_body()}</p>
		</section>

		<Separator size="xl" />

		<section class="col">
			<h4>{m.legal_domain_title()}</h4>
			<Separator size="mi" />
			<p>{m.legal_domain_body()}</p>
		</section>

		<Separator size="xl" />

		<section class="col">
			<h4>{m.legal_ip_title()}</h4>
			<Separator size="mi" />
			<p>{m.legal_ip_body()}</p>
			<Separator size="mi" />
			<p>
				{m.design_credit()}
				<a href="https://github.com/AnicetNgrt" target="_blank" rel="noopener noreferrer external">
					@AnicetNgrt
				</a>
			</p>
		</section>

		<Separator size="xxl" />

		<h3 class="highlighted">{m.legal_privacy_title()}</h3>
		<Separator size="md" />
		<p>{m.legal_privacy_intro()}</p>

		<Separator size="xl" />

		<section class="col">
			<h4>{m.legal_privacy_form_title()}</h4>
			<Separator size="mi" />
			<p>{m.legal_privacy_form_body()}</p>
			<Separator size="mi" />
			<p>{m.legal_privacy_form_recipients()}</p>
		</section>

		<Separator size="xl" />

		<section class="col">
			<h4>{m.legal_privacy_spam_title()}</h4>
			<Separator size="mi" />
			<p>{m.legal_privacy_spam_body()}</p>
		</section>

		<Separator size="xl" />

		<section class="col">
			<h4>{m.legal_privacy_analytics_title()}</h4>
			<Separator size="mi" />
			<p>{m.legal_privacy_analytics_body()}</p>
			<Separator size="mi" />
			<p>{m.legal_privacy_analytics_consent()}</p>
		</section>

		<Separator size="xl" />

		<section class="col">
			<h4>{m.legal_privacy_cookies_title()}</h4>
			<Separator size="mi" />
			<p>{m.legal_privacy_cookies_body()}</p>
		</section>

		<Separator size="xl" />

		<section class="col">
			<h4>{m.legal_privacy_transfers_title()}</h4>
			<Separator size="mi" />
			<p>{m.legal_privacy_transfers_body()}</p>
		</section>

		<Separator size="xl" />

		<section class="col">
			<h4>{m.legal_privacy_rights_title()}</h4>
			<Separator size="mi" />
			<p>{m.legal_privacy_rights_body()}</p>
			<Separator size="mi" />
			<p>{m.legal_privacy_rights_cnil()}</p>
		</section>

		<Separator size="lg" />
		<p class="updated">{m.legal_updated()}</p>
	</div>

	<Separator size="xl" />
</Slide>

<style>
	.legal {
		width: 100%;
		max-width: 72ch;
	}

	.legal section {
		margin-left: var(--mi);
	}

	.updated {
		color: var(--ccontrast);
		font-size: var(--mi);
	}
</style>
