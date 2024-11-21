<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		title,
		style,
		children,
		...props
	}: { title?: string; style?: string; children?: Snippet; [key: string]: unknown } = $props();
</script>

<section {...props} {style}>
	<header>
		<h2>{title}</h2>
	</header>
	<div>
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
		container-type: inline-size;
		border: 1px solid var(--figma-color-border-brand);
		border-radius: var(--border-radius-large);
		background-color: var(--figma-color-bg);
		padding: var(--size-xsmall);
	}

	@media (max-width: 764px) {
		section {
			grid-column: 1 / -1;
		}
	}

	section > div {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--size-xsmall);
	}
</style>
