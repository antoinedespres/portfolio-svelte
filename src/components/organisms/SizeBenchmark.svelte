<script lang="ts">
	import Button from '../atoms/Button.svelte';
	import Input from '../atoms/Input.svelte';
	import Box from '../atoms/Box.svelte';

	let { size = 'md' }: { size?: string } = $props();
</script>

<div class="row wrap">
	<Box {size} margin>
		<Input value="" label="Username" {size} />
	</Box>
	<Box {size} margin>
		<Button leftEmoji="🧪" label="test" accent {size} onclick={() => {}} />
	</Box>
	<Box {size} margin>
		<Button label="Open file" round {size} onclick={() => {}} />
	</Box>
	<Box {size} margin>
		<Button label="Lock" rightEmoji="🔑" round {size} onclick={() => {}} />
	</Box>
	<Box {size} margin>
		<Button rightEmoji="🎲" {size} onclick={() => {}} />
	</Box>
</div>
