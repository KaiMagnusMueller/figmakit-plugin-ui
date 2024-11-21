<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div>
	{@render children()}
</div>

<style>
	div {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	/* @media (max-width: 768px) {
		div {
			grid-template-columns: 1fr;
		}
	} */
</style>
