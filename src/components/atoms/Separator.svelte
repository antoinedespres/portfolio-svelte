<script lang="ts">
	let { size }: { size: string } = $props();
</script>

<div
	style="width: var(--{size}); height: var(--{size}); min-width: var(--{size}); min-height: var(--{size})"
></div>
