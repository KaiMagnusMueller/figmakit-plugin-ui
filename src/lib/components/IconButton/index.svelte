<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import Icon from '$lib/components/Icon/index.svelte';
	import type { Snippet } from 'svelte';

	interface Props extends HTMLButtonAttributes {
		onclick?: (event: MouseEvent) => void;
		onsubmit?: (event: SubmitEvent) => void;
		class?: string;
		destructive?: boolean;
		disabled?: boolean;
		icon: string;
		style?: string;
		size?: 'default';
		variant?: 'tertiary';
		label?: string;
		spin?: boolean;
		tabindex?: number;
		children?: Snippet;
		[key: string]: any;
	}

	let {
		onclick,
		onsubmit,
		class: className = '',
		destructive = false,
		disabled = false,
		icon,
		label,
		size = 'default',
		variant = 'tertiary',
		spin = false,
		style = '',
		tabindex = 0,
		children,
		...props
	}: Props = $props();
</script>

<button
	type="button"
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
