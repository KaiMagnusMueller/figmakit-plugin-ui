<script lang="ts">
	import { blurOnEvent } from '$lib/helpers.svelte.js';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends HTMLInputAttributes {
		onchange?: (e: Event) => void;
		onfocus?: (e: Event) => void;
		onblur?: (e: Event) => void;
		class?: string;
		disabled?: boolean;
		group: string | number;
		tabindex?: number;
		value: any;
		children?: import('svelte').Snippet;
		[key: string]: unknown;
	}

	let {
		onchange,
		onfocus,
		onblur,
		class: className = '',
		disabled = false,
		group = $bindable(''),
		id = 'fk-' + Math.random().toString(36),
		tabindex = 0,
		value = null,
		children,
		...props
	}: Props = $props();

	let checked = $derived(group === value);
</script>

<label for={id}>
	<input
		{...props}
		type="radio"
		{value}
		{checked}
		{disabled}
		{tabindex}
		{id}
		bind:group
		class={className}
		{onchange}
		{onfocus}
		{onblur}
	/>
	{@render children?.()}
</label>

<style>
	label {
		display: flex;
		display: flex;
		position: relative;
		align-items: center;
		gap: 0.5rem;
		cursor: default;
		color: var(--figma-color-text);
		user-select: none;
	}

	input {
		--radio-diameter: 0.875rem; /* 14px */
		position: relative;
		appearance: none;
		margin: 0;
		padding: 0;
		width: var(--radio-diameter);
		height: var(--radio-diameter);
	}

	input:checked:after {
		background-color: var(--figma-color-icon);
	}
	label:has(input:disabled) {
		color: var(--figma-color-text-disabled);
	}

	input:checked:disabled::after {
		border: 1px solid var(--figma-color-icon-disabled);
	}

	/* checked dot */
	input:after {
		display: block;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 50%;
		background-color: transparent;
		width: calc(var(--radio-diameter) - 8px);
		height: calc(var(--radio-diameter) - 8px);
		content: '';
	}

	/* circle */
	input:before {
		display: block;
		flex-shrink: 0;
		border: 1px solid var(--figma-color-icon);
		border-radius: var(--border-radius-small);
		border-radius: 50%;
		width: inherit;
		height: inherit;
		content: '';
	}

	input:enabled:focus:before {
		outline: 2px solid var(--figma-color-border-selected);
		outline-offset: -1px;
	}

	input:focus-visible {
		outline: none;
	}
</style>
