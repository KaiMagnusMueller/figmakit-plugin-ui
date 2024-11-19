<script lang="ts">
	import type { Snippet } from 'svelte';

	//pass svg data into icon by importing an svg in parent

	type Props = {
		icon: string;
		iconText?: string;
		color?: string;
		disabled?: boolean;
		destructive?: boolean;
		rounded?: boolean;
		class?: string;
		tabindex?: number;
		style?: string;
		size?: number;
		spin?: boolean;
		children?: Snippet;
		[key: string]: unknown;
	};

	let {
		icon,
		iconText,
		spin,
		color,
		size = 32,
		selected,
		disabled,
		destructive,
		rounded,
		class: className,
		tabindex = 0,
		style = !!color
			? `color: ${color}; fill: currentColor; width: {size}px; height: {size}px`
			: 'color: currentColor; fill: currentColor; width: {size}px; height: {size}px',
		children,
		...props
	}: Props = $props();

	// let svg: SVGSVGElement | null = new DOMParser()
	// 	.parseFromString(icon, 'image/svg+xml')
	// 	.querySelector('svg');
</script>

<div {...props} class:spin class="icon-component {className}" {style}>
	{#if iconText}
		{iconText}
	{:else}
		{@html icon}
	{/if}
</div>

<style>
	.icon-component {
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

	:global(.icon-component *) {
		fill: inherit;
		color: inherit;
	}
</style>
