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
		size = 24,
		spin,
		style,
		tabindex = 0,
		children,
		...props
	}: Props = $props();

	// TODO: Find a more robust way to handle icon colors
	const _style = !!color
		? `--color-icon: var(${color});`
		: `color: currentColor; fill: currentColor; width: ${size}px; height: ${size}px`;
</script>

<div {...props} class={['icon__wrapper', spin, className]} style={_style}>
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
