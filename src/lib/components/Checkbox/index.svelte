<script lang="ts">
	import { blurOnEvent } from '$lib/helpers.svelte.js';
	import type { HTMLInputAttributes } from 'svelte/elements';

	type Props = {
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
	} & HTMLInputAttributes;

	let {
		onchange,
		onfocus,
		onblur,
		id = 'fk-' + Math.random().toString(36),
		checked = $bindable(false),
		disabled = false,
		tabindex = 0,
		class: className = '',
		value,
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
		{disabled}
		{tabindex}
		{value}
		class={className}
		{onchange}
		{onfocus}
		{onblur}
		use:blurOnEvent
	/>
	{@render children?.()}

	<!-- 
	<svg class="svg" xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8"><path fill="#fff" fill-opacity="1" fill-rule="evenodd" stroke="none" d="M1.176 2.824 3.06 4.706 6.824.941 8 2.118 3.059 7.059 0 4z"></path></svg>
	-->
</label>

<style>
	label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: var(--font-size-small);
		user-select: none;
	}

	input {
		position: relative;
		appearance: none;
		margin-block: 0.625rem;
		padding: 0;
		width: 0.75rem;
		height: 0.75rem;
	}

	input::before {
		display: block;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		appearance: none;
		border: 1px solid var(--figma-color-icon);
		border-radius: var(--border-radius-small);
		width: inherit;
		height: inherit;
		content: '';
	}

	input:checked::before {
		border-color: transparent;
		background-image: url("data:image/svg+xml,%3Csvg class='svg' xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Cpath fill='%23fff' fill-opacity='1' fill-rule='evenodd' stroke='none' d='M1.176 2.824 3.06 4.706 6.824.941 8 2.118 3.059 7.059 0 4z'%3E%3C/path%3E%3C/svg%3E");
		background-position: center;
		background-repeat: no-repeat;
		background-color: var(--figma-color-bg-brand);
	}

	label:has(input:disabled) {
		color: var(--figma-color-text-disabled);
	}

	input:disabled::before {
		border: 1px solid var(--figma-color-icon-disabled);
	}

	input:checked:disabled::before {
		border: 1px solid transparent;
		background-color: var(--figma-color-icon-disabled);
	}
</style>
