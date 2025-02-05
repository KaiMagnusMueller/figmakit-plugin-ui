<script lang="ts">
	import type { Snippet } from 'svelte';

	//pass svg data into icon by importing an svg in parent

	type Props = {
		class?: string;
		color?: string;
		destructive?: boolean;
		disabled?: boolean;
		icon: string;
		iconText?: string;
		rounded?: boolean;
		size?: number;
		spin?: boolean;
		style?: string;
		tabindex?: number;
		children?: Snippet;
		[key: string]: unknown;
	};

	let {
		class: className = '',
		color,
		destructive,
		disabled,
		icon,
		iconText,
		rounded,
		selected,
		size = 32,
		spin,
		style,
		tabindex = 0,
		children,
		...props
	}: Props = $props();

	const _style = !!color
		? `color: var(${color}); fill: currentColor; width: ${size}px; height: ${size}px`
		: `color: currentColor; fill: currentColor; width: ${size}px; height: ${size}px`;
</script>

<div {...props} class={[spin, className]} style={_style}>
	{#if iconText}
		{iconText}
	{:else}
		{@html icon}
	{/if}
</div>

<style>
	div {
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: default;
		width: var(--size-medium);
		height: var(--size-medium);
		pointer-events: none;
		font-size: var(--font-size-xsmall);
		font-family: var(--font-stack);
		user-select: none;
	}

	.spin {
		animation: rotating 1s linear infinite;
	}

	@keyframes rotating {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
