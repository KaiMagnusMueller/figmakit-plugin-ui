<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		'aria-hidden'?: boolean;
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
		[key: string]: any;
	}

	let {
		'aria-hidden': ariaHidden,
		class: className = '',
		color,
		destructive = false,
		disabled = false,
		icon,
		iconText,
		rounded = false,
		size = 24,
		spin = false,
		style = '',
		tabindex = 0,
		children,
		...props
	}: Props = $props();

	// TODO: Find a more robust way to handle icon colors
	const _style = !!color
		? `--color-icon: var(${color});`
		: `color: currentColor; fill: currentColor; width: ${size}px; height: ${size}px`;
</script>

<div {...props} class={['icon__wrapper', spin, className]} style={_style} aria-hidden={ariaHidden}>
	{#if iconText}
		{iconText}
	{:else}
		{@html icon}
	{/if}
</div>

<style>
	.icon__wrapper {
		display: inline;
		cursor: default;
		pointer-events: none;
		user-select: none;

		:global(svg) {
			width: 100%;
			height: 100%;
		}
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
