<script lang="ts">
	import type { HTMLInputAttributes, HTMLInputTypeAttribute } from 'svelte/elements';
	import Icon from '$lib/components/Icon/index.svelte';

	interface Props extends HTMLInputAttributes {
		oninput?: (event: Event) => void;
		onchange?: (event: Event) => void;
		onkeydown?: (event: KeyboardEvent) => void;
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
		hidden?: boolean;
		label: string;
		showLabel?: boolean;
		responsiveFont?: boolean;
		type?: HTMLInputTypeAttribute;
		value?: string;
		[key: string]: any;
	}

	let {
		oninput,
		onchange,
		onkeydown,
		label,
		showLabel = true,
		autofocus = false,
		borders = true,
		class: className = '',
		color,
		disabled = false,
		errorMessage = 'Error message',
		icon,
		iconText,
		id,
		invalid = false,
		name,
		hidden = false,
		placeholder = 'Input something here...',
		spin = false,
		responsiveFont = false,
		type = 'text',
		value = $bindable(''),
		...props
	}: Props = $props();
</script>

<label {hidden} class={className}>
	<span class:visually-hidden={!showLabel}>{label}</span>

	<div class={['input', !borders && 'no-borders', invalid && 'invalid']}>
		{#if icon}
			<div class="icon">
				<Icon {icon} {iconText} {spin} />
			</div>
		{/if}
		<!-- svelte-ignore a11y_autofocus -->
		<input
			{...props}
			{type}
			{oninput}
			{onchange}
			{onkeydown}
			bind:value
			{id}
			{name}
			{disabled}
			{placeholder}
			{autofocus}
			class={[responsiveFont && 'responsive-font']}
		/>
	</div>
	{#if invalid}
		<div class="error">
			{errorMessage}
		</div>
	{/if}
</label>

<style>
	label {
		display: flex;
		flex-direction: column;
		gap: 4px;

		&[hidden] {
			display: none;
		}
	}

	span {
		font-weight: var(--font-weight-strong);
		font-size: var(--font-size-xsmall);
		font-family: var(--font-stack);
		letter-spacing: var(--font-letter-spacing-pos-xsmall);
	}

	.input {
		display: flex;
		position: relative;
		flex-direction: row;
		align-items: center;
		transition: flex 0s 0.2s;
		outline: 1px solid var(--figma-color-border);
		outline-offset: -1px;
		border: none;
		border-radius: var(--border-radius-medium);
		background-color: var(--figma-color-bg);
		height: 24px;

		&:hover,
		&:placeholder-shown:hover {
			background-image: none;
			color: var(--figma-color-text-hover);
		}

		&::selection {
			background-color: var(--figma-color-text-selected);
			color: var(--figma-color-text);
		}

		&::placeholder {
			color: var(--figma-color-text-tertiary);
		}

		&:has(input:active),
		&:has(input:focus) {
			outline-color: var(--figma-color-border-selected);
		}

		&:disabled {
			cursor: not-allowed;
			background-image: none;
			color: var(--figma-color-text-disabled);

			&:active,
			&:focus {
				outline: none;
			}
		}

		&.no-borders {
			outline-color: transparent;

			&:disabled {
				outline: 1px solid var(--figma-color-border-disabled);
			}
		}

		&.invalid {
			outline: 1px solid var(--figma-color-border-danger-strong);
			outline-offset: -1px;
			border: none;
		}
	}

	input {
		appearance: none;
		margin: 0;
		margin-block-end: -1px;
		border: none;
		background: unset;
		padding: 0 7px;
		width: 100%;
		height: 100%;
		color: var(--figma-color-text);
		font-weight: var(--font-weight-normal);
		font-size: var(--font-size-xsmall);
		line-height: var(--font-line-height);
		font-family: var(--font-stack);
		letter-spacing: var(--font-letter-spacing-neg-xsmall);

		.icon + & {
			padding-inline-start: 2px;
		}

		&:focus,
		&:active {
			outline: none;
		}
	}

	.responsive-font {
		font: inherit;
		letter-spacing: inherit;
	}

	.error {
		color: var(--figma-color-text-danger);
		font-weight: var(--font-weight-normal);
		font-size: var(--font-size-xsmall);
		line-height: var (--font-line-height);
		letter-spacing: var(--font-letter-spacing-neg-xsmall);
	}
</style>
