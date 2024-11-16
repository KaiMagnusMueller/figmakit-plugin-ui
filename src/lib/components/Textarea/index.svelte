<script lang="ts">
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	type Props = {
		oninput?: (e: Event) => void;
		onchange?: (e: Event) => void;
		onkeydown?: (e: Event) => void;
		onfocus?: (e: Event) => void;
		onblur?: (e: Event) => void;
		id?: string;
		value?: string;
		rows?: number;
		name?: any;
		disabled?: boolean;
		placeholder?: string;
		class?: string;
		[key: string]: unknown;
	} & HTMLTextareaAttributes;

	let {
		oninput,
		onchange,
		onkeydown,
		onfocus,
		onblur,
		id,
		value = $bindable(''),
		rows = 2,
		name,
		disabled,
		placeholder = 'Input something here...',
		class: className = '',
		...props
	}: Props = $props();
</script>

<div class="textarea {className}">
	<textarea
		{...props}
		{oninput}
		{onchange}
		{onkeydown}
		{onfocus}
		{onblur}
		{id}
		{name}
		{rows}
		{disabled}
		{placeholder}
		bind:value
	></textarea>
</div>

<style>
	.textarea {
		position: relative;
	}

	textarea {
		display: flex;
		position: relative;
		align-items: center;
		margin: 1px 0 1px 0;
		outline: none;
		border: 1px solid var(--figma-color-border);
		border-radius: var(--border-radius-small);
		background-color: var(--figma-color-bg);
		padding: 7px 4px 9px 7px;
		width: 100%;
		min-height: 62px;
		overflow: visible;
		overflow-y: auto;
		resize: none;
		color: var(--figma-color-text);
		font-weight: var(--font-weight-normal);
		font-size: var(--font-size-xsmall);
		line-height: var(--line-height);
		font-family: var(--font-stack);
		letter-spacing: var(--font-letter-spacing-neg-xsmall);
	}
	textarea:hover,
	textarea:placeholder-shown:hover {
		border: 1px solid var(--figma-color-border);
		background-image: none;
		color: var(--figma-color-text);
	}
	textarea::selection {
		background-color: var(--text-highlight);
		color: var(--figma-color-text);
	}
	textarea::placeholder {
		border: 1px solid transparent;
		color: var(--figma-color-text-tertiary);
	}
	textarea:focus:placeholder-shown {
		outline: 1px solid var(--figma-color-border-selected);
		outline-offset: -2px;
		border: 1px solid var(--figma-color-border-selected);
	}

	textarea:focus {
		outline: 1px solid var(--figma-color-border-selected);
		outline-offset: -2px;
		border: 1px solid var(--figma-color-border-selected);
	}
	textarea:disabled,
	textarea:disabled:hover {
		position: relative;
		cursor: not-allowed;
	}

	textarea:disabled:active {
		outline: none;
		padding: 7px 4px 9px 7px;
	}
</style>
