<script lang="ts">
	import Separator from '$components/atoms/Separator.svelte';
	import Button from '$components/atoms/Button.svelte';
	import { m } from '$lib/paraglide/messages';

	let { title, onBackClicked }: { title: string; onBackClicked: () => void } = $props();
</script>

<div class="header row center-y center-x wrap">
	<div style="margin-top: 0.2em">
		<Button size="sm" onclick={onBackClicked} leftEmoji="◂" label={m.nav_go_back()} />
	</div>
	<Separator size="sm" />
	<div>
		<h4>{title}</h4>
	</div>
</div>
<Separator size="md" />

<style>
	.header {
		width: 100%;
	}

	.header div {
		margin-bottom: var(--mi);
	}
</style>
