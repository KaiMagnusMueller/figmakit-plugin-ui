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
		class: className,
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

	console.log(color);

	$effect(() => {
		style = computeStyle(color);
	});

	function computeStyle(color: string = '') {
		return !!color
			? `color: var(${color}); fill: currentColor; width: ${size}px; height: ${size}px`
			: `color: currentColor; fill: currentColor; width: ${size}px; height: ${size}px`;
	}

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
