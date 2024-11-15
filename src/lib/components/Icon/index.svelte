<script lang="ts">
	import type { Snippet } from 'svelte';

	export { className as class };

	type Props = {
		icon?: string;
		color?: string;
		iconText?: string;
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
		color = '--figma-color-icon',
		icon, //pass svg data into this var by importing an svg in parent
		iconText,
		spin,
		size = 32,
		selected,
		disabled,
		destructive,
		rounded,
		class: className,
		tabindex = 0,
		style,
		children,
		...props
	}: Props = $props();
</script>

<div
	class:spin
	class="icon-component {className}"
	style="color: currentColor; fill: currentColor; width: {size}px; height: {size}px"
>
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
