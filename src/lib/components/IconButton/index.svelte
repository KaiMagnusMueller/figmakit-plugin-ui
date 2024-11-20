<script lang="ts">
	import { blurOnEvent } from '$lib/helpers.svelte.js';
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	import Icon from './../Icon/index.svelte';

	type Props = {
		onclick?: (e: MouseEvent) => void;
		onsubmit?: (e: MouseEvent) => void;
		class?: string;
		destructive?: boolean;
		disabled?: boolean;
		icon: string;
		iconText?: string;
		rounded?: boolean;
		spin?: boolean;
		style?: string;
		tabindex?: number;
		children?: Snippet;
		[key: string]: unknown;
	} & HTMLButtonAttributes;

	let {
		onclick,
		onsubmit,
		class: className,
		destructive,
		disabled,
		icon,
		iconText,
		rounded,
		selected,
		spin,
		style,
		tabindex = 0,
		children,
		...props
	}: Props = $props();
</script>

<button
	{...props}
	onclick={(e) => {
		// @ts-ignore
		props.onclick?.(e);
	}}
	onsubmit={(e) => {
		e.preventDefault();
		// @ts-ignore
		props.onsubmit?.(e);
	}}
	class:selected
	class:disabled
	class:rounded
	class={className}
	{tabindex}
	use:blurOnEvent
>
	<Icon {icon} {iconText} {spin} color="currentColor" />
</button>

<style>
	button {
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		border: 2px solid transparent;
		border-radius: var(--border-radius-small);
		width: var(--size-medium);
		height: var(--size-medium);
		color: var(--figma-color-icon);
		fill: var(--figma-color-icon);
		background-color: transparent;
	}
	button:hover {
		background-color: var(--figma-color-bg-hover);
	}

	button:focus-visible {
		outline: none;
		border: 2px solid var(--figma-color-border-selected);
	}

	button:disabled {
		pointer-events: none;
		color: var(--figma-color-icon-disabled);
	}

	.selected {
		background-color: var(--figma-color-bg-selected-strong);
		color: var(--figma-color-icon-onbrand);
	}
	.selected:hover {
		background-color: var(--figma-color-bg-selected-strong);
	}
	.selected:active,
	.selected:focus-visible {
		border: 2px solid var(--figma-color-border);
	}

	.rounded {
		border-radius: var(--border-radius-medium);
	}
</style>
