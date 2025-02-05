<script lang="ts">
	import { blurOnEvent } from '$lib/helpers.svelte.js';
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	import Icon from './../Icon/index.svelte';

	type Props = {
		onclick?: (e: MouseEvent) => void;
		onsubmit?: (e: SubmitEvent) => void;
		class?: string;
		destructive?: boolean;
		disabled?: boolean;
		icon: string;
		style?: string;
		size: 'default';
		variant?: 'tertiary';
		label?: string;

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
		label,

		selected,
		size = 'default',
		variant = 'tertiary',
		spin,
		style,
		tabindex = 0,
		children,
		...props
	}: Props = $props();
</script>

<button
	aria-label={label}
	{...props}
	{onclick}
	{onsubmit}
	class={[variant, size, className, destructive && 'destructive']}
	{tabindex}
	{style}
>
	<Icon {icon} {spin} />
</button>

<style>
	button {
		--button-height: 24px;
		--border-width: 1px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		outline: var(--border-width) solid transparent;
		outline-offset: calc(var(--border-width) * -1);
		border: none;
		border-radius: var(--border-radius-medium);

		background-color: transparent;
		min-width: 24px;
		min-height: 24px;
	}
	button:hover {
		background-color: var(--figma-color-bg-hover);
	}

	button:active {
		background-color: var(--figma-color-bg-pressed);
	}

	button:focus-visible {
		outline-color: var(--figma-color-border-selected);
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
		outline-color: var(--figma-color-border);
	}
</style>
