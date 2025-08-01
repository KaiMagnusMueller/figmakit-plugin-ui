<script lang="ts">
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	interface Props extends HTMLTextareaAttributes {
		oninput?: (event: Event) => void;
		onchange?: (event: Event) => void;
		onkeydown?: (event: KeyboardEvent) => void;
		class?: string;
		disabled?: boolean;
		id?: string;
		name?: string;
		placeholder?: string;
		rows?: number;
		label: string;
		showLabel?: boolean;
		value?: string;
		[key: string]: any;
	}

	let {
		oninput,
		onchange,
		onkeydown,
		label,
		showLabel = true,
		class: className = '',
		disabled = false,
		id,
		name,
		placeholder = 'Input something here...',
		rows = 2,
		value = $bindable(''),
		...props
	}: Props = $props();
</script>

<div class="textarea {className}">
	<label>
		<span class:visually-hidden={!showLabel}>{label}</span>
		<textarea
			{...props}
			{oninput}
			{onchange}
			{onkeydown}
			{id}
			{name}
			{rows}
			{disabled}
			{placeholder}
			bind:value
		></textarea>
	</label>
</div>

<style>
	label {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	span {
		font-weight: var(--font-weight-strong);
		font-size: var(--font-size-xsmall);
		letter-spacing: var(--font-letter-spacing-pos-xsmall);
	}

	textarea {
		display: flex;
		position: relative;
		align-items: center;
		margin: 1px 0 1px 0;
		outline: 1px solid var(--figma-color-border);
		outline-offset: -1px;
		border: none;
		border-radius: var(--border-radius-medium);
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
		line-height: var(--font-line-height);
		font-family: var(--font-stack);
		letter-spacing: var(--font-letter-spacing-neg-xsmall);
	}
	textarea:hover,
	textarea:placeholder-shown:hover {
		outline: 1px solid var(--figma-color-border);
		outline-offset: -1px;
		border: none;
		background-image: none;
		color: var(--figma-color-text);
	}
	textarea::selection {
		background-color: var(--text-highlight);
		color: var(--figma-color-text);
	}
	textarea::placeholder {
		outline: 1px solid transparent;
		outline-offset: -1px;
		border: none;
		color: var(--figma-color-text-tertiary);
	}
	textarea:focus:placeholder-shown {
		outline: 1px solid var(--figma-color-border-selected);
		outline-offset: -2px;
		border: none;
	}

	textarea:focus {
		outline: 1px solid var(--figma-color-border-selected);
		outline-offset: -2px;
		border: none;
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
