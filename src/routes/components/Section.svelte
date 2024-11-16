<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		title,
		style,
		children,
		...props
	}: { title?: string; style?: string; children?: Snippet; [key: string]: unknown } = $props();
</script>

<section {...props}>
	<header>
		<h2>{title}</h2>
	</header>
	<div {style}>
		{#if children}
			{@render children?.()}
		{:else}
			<p>This section is empty</p>
		{/if}
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		gap: var(--size-xsmall);
		border: 1px solid var(--figma-color-border);
		border-radius: var(--border-radius-large);
		padding: var(--size-xsmall);
	}

	div {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--size-xsmall);
	}
</style>
