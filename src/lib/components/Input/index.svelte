<script lang="ts">
	import type { HTMLInputAttributes, HTMLInputTypeAttribute } from 'svelte/elements';
	import Icon from './../Icon/index.svelte';

	type Props = {
		oninput?: (e: Event) => void;
		onchange?: (e: Event) => void;
		onkeydown?: (e: Event) => void;
		onfocus?: (e: Event) => void;
		onblur?: (e: Event) => void;
		autofocus?: boolean;
		borders?: boolean;
		class?: string;
		color?: string;
		disabled?: boolean;
		errorMessage?: string;
		icon?: string;
		iconText?: string;
		id?: string;
		invalid?: boolean;
		name?: string;
		placeholder?: string;
		spin?: boolean;
		type?: HTMLInputTypeAttribute;
		value?: string;
		[key: string]: unknown;
	} & HTMLInputAttributes;

	let {
		oninput,
		onchange,
		onkeydown,
		onfocus,
		onblur,
		autofocus,
		borders = true,
		class: className = '',
		color,
		disabled = false,
		errorMessage = 'Error message',
		icon,
		iconText,
		id,
		invalid,
		name,
		placeholder = 'Input something here...',
		spin,
		type = 'text',
		value = $bindable(''),
		...props
	}: Props = $props();

	let indent: boolean = $derived(icon || iconText ? true : false);
</script>

<div class="input {className}">
	{#if icon}
		<div class="icon">
			<Icon {icon} {iconText} {spin} color={'--figma-color-icon'} />
		</div>
	{/if}
	<!-- svelte-ignore a11y_autofocus -->
	<input
		{...props}
		{type}
		{oninput}
		{onchange}
		{onkeydown}
		{onfocus}
		{onblur}
		bind:value
		{id}
		{name}
		{disabled}
		{placeholder}
		{autofocus}
		class:indent
		class:borders
		class:invalid
	/>
	{#if invalid}
		<div class="error">
			{errorMessage}
		</div>
	{/if}
</div>

<style>
	.input {
		position: relative;
		transition: flex 0s 0.2s;
	}

	input {
		display: flex;
		align-items: center;
		margin: 0;
		outline: none;
		border: 1px solid transparent;
		border-radius: var(--border-radius-small);
		background-color: var(--figma-color-bg);
		padding: var(--size-xxsmall) var(--size-xxxsmall) var(--size-xxsmall) var(--size-xxsmall);
		width: 100%;
		height: 2rem;
		overflow: visible;
		color: var(--figma-color-text);
		font-weight: var(--font-weight-normal);
		font-size: var(--font-size-xsmall);
		line-height: var(--font-line-height);
		letter-spacing: var(--font-letter-spacing-neg-xsmall);
	}
	input:hover,
	input:placeholder-shown:hover {
		background-image: none;
		color: var(--figma-color-text-hover);
	}
	input::selection {
		background-color: var(--figma-color-text-selected);
		color: var(--figma-color-text);
	}
	input::placeholder {
		border: 1px solid transparent;
		color: var(--figma-color-text-tertiary);
	}
	input:placeholder-shown {
		background-image: none;
		color: var(--figma-color-text);
	}
	input:focus:placeholder-shown,
	input:active,
	input:focus {
		outline: 1px solid var(--figma-color-border-selected);
		outline-offset: -2px;
		border: 1px solid var(--figma-color-border-selected);
		color: var(--figma-color-text);
	}
	input:disabled {
		position: relative;
		cursor: not-allowed;
		background-image: none;
	}
	input:disabled:active {
		outline: none;
		border: 1px solid var(--figma-color-border);
	}

	.borders {
		border: 1px solid var(--figma-color-border);
		background-image: none;
	}
	.borders:disabled,
	.borders:disabled:placeholder-shown {
		background-image: none;
	}
	.borders:disabled:placeholder-shown:active {
		outline: none;
	}

	.indent {
		padding-left: 32px;
	}

	.invalid,
	.invalid:hover,
	.invalid:focus {
		outline: 1px solid var(--figma-color-border-danger-strong);
		outline-offset: -2px;
		border: 1px solid var(--figma-color-border-danger-strong);
	}

	.icon {
		position: absolute;
		left: 0;
		z-index: 1;
	}

	.error {
		padding-top: var(--size-xxxsmall);
		padding-left: var(--size-xxsmall);
		color: var(--figma-color-text-danger);
		font-weight: var(--font-weight-normal);
		font-size: var(--font-size-xsmall);
		line-height: var(--font-line-height);
		letter-spacing: var(--font-letter-spacing-neg-xsmall);
	}
</style>
