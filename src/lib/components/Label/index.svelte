<script lang="ts">
	interface Props {
		class?: string;
		children?: import('svelte').Snippet;
	}

	let { class: className = '', children }: Props = $props();
</script>

<div class={className}>
	{@render children?.()}
</div>

<style>
	div {
		display: flex;
		align-items: center;
		cursor: default;
		padding: 0 calc(var(--size-xxsmall) / 2) 0 var(--size-xxsmall);
		width: 100%;
		min-height: var(--size-medium);
		color: var(--figma-color-text-secondary);
		font-weight: var(--font-weight-normal);
		font-size: var(--font-size-xsmall);
		line-height: var(--line-height);
		letter-spacing: var(--font-letter-spacing-pos-xsmall);
		user-select: none;
	}
</style>
