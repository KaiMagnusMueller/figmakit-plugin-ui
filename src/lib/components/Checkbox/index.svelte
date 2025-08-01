<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	interface Props extends HTMLInputAttributes {
		onchange?: (event: Event) => void;
		onfocus?: (event: FocusEvent) => void;
		onblur?: (event: FocusEvent) => void;
		checked?: boolean;
		class?: string;
		disabled?: boolean;
		id?: string;
		tabindex?: number;
		value?: string;
		children?: Snippet;
	}

	let {
		onchange,
		onfocus,
		onblur,
		checked = $bindable(false),
		class: className = '',
		disabled = false,
		id,
		tabindex = 0,
		value,
		children,
		...props
	}: Props = $props();

	const uid = $props.id();
	id = 'checkbox-' + uid;
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
		font-size: var(--font-size-xsmall);
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

	input:focus:before {
		outline: 2px solid var(--figma-color-border-selected);
		outline-offset: -1px;
	}

	input:focus {
		outline: none;
	}
</style>
