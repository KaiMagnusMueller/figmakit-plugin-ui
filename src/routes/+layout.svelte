<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types.js';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<div>
	{@render children()}
</div>

<style>
	div {
		margin: 1rem;
	}
</style>
