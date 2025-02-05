<script lang="ts">
	import type { Snippet } from 'svelte';
	import { blurOnEvent } from '$lib/helpers.svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { Icon } from '$lib/index.js';

	type Props = {
		checked?: boolean;
		onchange?: (checked: boolean) => void;
		class?: string;
		disabled?: boolean;
		label?: string;
		style?: string;
		children?: Snippet;
		[key: string]: any;
	} & HTMLButtonAttributes;

	let {
		checked = $bindable(false),
		onchange,
		class: className = '',
		disabled = false,
		label = '',
		style = '',
		children,
		...props
	}: Props = $props();

	function handleClick() {
		checked = !checked;
		onchange?.(checked);
	}
</script>

<button
	{...props}
	type="button"
	role="checkbox"
	aria-checked={checked}
	{disabled}
	class={['toggle-button', className, checked && 'checked']}
	{style}
	onclick={() => handleClick()}
	aria-label={label}
>
	{#if children}
		{@render children?.()}
	{:else}
		<p>Buttons require content</p>
	{/if}
</button>

<style>
	button {
		--button-height: 24px;
		--border-width: 1px;

		display: flex;
		position: relative;
		flex-shrink: 0;
		justify-content: center;
		align-items: center;
		outline: var(--border-width) solid transparent;
		border: 0;
		border-radius: var(--border-radius-medium);
		background-color: transparent;
		padding: 0 8px;
		min-width: var(--button-height);
		min-height: var(--button-height);
		color: var(--figma-color-text);
		font-weight: var(--font-weight-default);
		line-height: 16px;
		user-select: none;
		fill: var(--figma-color-icon);
		outline-offset: calc(var(--border-width) * -1);

		:global(&:has(svg)) {
			padding: 0;
		}

		&:focus-visible {
			outline-color: var(--figma-color-border-selected);
		}

		&:hover {
			background-color: var(--figma-color-bg-hover);
		}

		&:active {
			background-color: var(--figma-color-bg-pressed);
		}

		&.checked {
			background-color: var(--figma-color-bg-selected);
			color: var(--figma-color-text-onselected);

			:global(svg) {
				fill: var(--figma-color-icon-selected);
			}

			&:hover {
				background-color: var(--figma-color-bg-selected-secondary);
			}

			&:active {
				background-color: var(--figma-color-bg-selected-pressed);
			}
		}

		&:disabled {
			color: var(--figma-color-text-disabled);
		}
	}
</style>
