<script>
	/** @type {{ data: import('./$types').LayoutData, children: import('svelte').Snippet }} */
	let { data, children } = $props();
</script>

<div>
	{@render children()}
</div>

<style>
	div {
		margin: 1rem;
	}
</style>
