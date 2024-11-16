<script lang="ts">
	import { blurOnEvent } from '$lib/helpers.svelte.js';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends HTMLInputAttributes {
		onchange?: (e: Event) => void;
		onfocus?: (e: Event) => void;
		onblur?: (e: Event) => void;
		id?: string;
		checked?: boolean;
		disabled?: boolean;
		tabindex?: number;
		class?: string;
		value?: string;
		children?: import('svelte').Snippet;
		[key: string]: unknown;
	}

	let {
		onchange,
		onfocus,
		onblur,
		id = 'fk-' + Math.random().toString(36),
		checked = $bindable(false),
		value = '',
		disabled = false,
		tabindex = 0,
		class: className = '',
		children,
		...props
	}: Props = $props();
</script>

<label for={id}>
	<input
		{...props}
		type="checkbox"
		{id}
		bind:checked
		{value}
		{disabled}
		{tabindex}
		class={className}
		{onchange}
		{onfocus}
		{onblur}
		use:blurOnEvent
	/>
	{@render children?.()}
</label>

<style>
	label {
		display: flex;
		position: relative;
		align-items: center;
		gap: 0.5rem;
		cursor: default;
		color: var(--figma-color-text);
		user-select: none;
	}

	input {
		--switch-width: 1.5rem;
		--switch-height: 0.75rem;
		position: relative;
		appearance: none;
		margin-block: 0.625rem;
		padding: 0;
		width: var(--switch-width);
		height: var(--switch-height);
	}

	/* track */
	input:before {
		display: block;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		transition: background-color 0.2s;
		border-radius: calc(var(--switch-height) / 2);
		background-color: var(--figma-color-icon-tertiary);
		width: inherit;
		height: inherit;
		content: '';
	}

	/* knob */
	input:after {
		--knob-padding: 1px;
		--knob-diameter: calc(var(--switch-height) - var(--knob-padding) * 2);
		display: block;
		position: absolute;
		top: var(--knob-padding);
		left: var(--knob-padding);
		/* transform: translate(-11px, -50%); */
		transition: transform 0.2s;
		border-radius: 50%;
		background-color: var(--figma-color-icon-onbrand);
		width: var(--knob-diameter);
		height: var(--knob-diameter);
		content: '';
	}

	input:checked::before {
		background-color: var(--figma-color-bg-brand);
		color: var(--figma-color-icon);
	}

	input:checked::after {
		transform: translateX(
			calc(var(--switch-width) - var(--knob-diameter) - var(--knob-padding) * 2)
		);
	}

	label:has(input:disabled) {
		color: var(--figma-color-text-disabled);
	}

	input:disabled::before,
	input:checked:disabled::before {
		background-color: var(--figma-color-bg-disabled);
	}

	input:disabled::after,
	input:checked:disabled::after {
		background-color: var(--figma-color-bg-disabled-secondary);
	}

	input:focus::after {
		box-shadow: 0 0 0 2px var(--figma-color-border-selected);
	}
</style>
