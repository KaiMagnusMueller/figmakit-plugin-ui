<script lang="ts">
	import type { Snippet } from 'svelte';
	import { blurOnEvent } from '$lib/helpers.svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Props = {
		onclick?: (arg: string) => void;
		onsubmit?: (arg: string) => void;
		variant?: 'primary' | 'secondary' | 'tertiary';
		disabled?: boolean;
		destructive?: boolean;
		rounded?: boolean;
		class?: string;
		style?: string;
		children?: Snippet;
		[key: string]: unknown;
	} & HTMLButtonAttributes;

	let {
		onclick,
		onsubmit,
		variant = 'primary',
		disabled,
		destructive,
		rounded,
		class: className,
		style,
		children,
		...props
	}: Props = $props();
</script>

<button
	{...props}
	onclick={(e) => {
		// TODO: Fix type error "Property 'onclick' does not exist on type '{}'.ts(2339)"
		// @ts-ignore
		props.onclick?.(e);
	}}
	onsubmit={(e) => {
		e.preventDefault();
		// @ts-ignore
		props.onsubmit?.(e);
	}}
	{disabled}
	class:destructive
	class:rounded
	class="{variant}
	{className}"
	{style}
	use:blurOnEvent
>
	{#if children}
		{@render children?.()}
	{:else}
		Label
	{/if}
</button>

<style>
	button {
		display: flex;
		flex-shrink: 0;
		justify-content: center;
		align-items: center;
		outline: none;
		border: 2px solid transparent;
		border-radius: var(--border-radius-medium);
		padding: 0 0.75rem;
		height: 2rem;
		color: var(--figma-color-text-onbrand);
		font-weight: var(--font-weight-medium);
		font-size: var(--font-size-xsmall);
		line-height: 1rem;
		font-family: var(--font-stack);
		letter-spacing: var(--font-letter-spacing-neg-small);
		user-select: none;
		text-decoration: none;
	}

	/* Primary styles */
	.primary {
		background-color: var(--figma-color-bg-brand);
		color: var(--figma-color-text-onbrand);
	}
	.primary:enabled:active,
	.primary:enabled:focus {
		border: 2px solid var(--figma-color-border-brand-strong);
	}
	.primary:disabled {
		background-color: var(--figma-color-bg-disabled);
	}
	.primary.destructive {
		background-color: var(--figma-color-bg-danger);
	}
	.primary.destructive:active,
	.primary.destructive:focus {
		border: 2px solid var(--figma-color-border-disabled-strong);
	}
	.primary.destructive:disabled {
		background-color: var(--figma-color-bg-disabled);
	}

	/* Secondary styles */
	.secondary {
		border: 1px solid var(--figma-color-border-strong);
		background-color: transparent;
		padding: 0 calc(var(--size-xsmall) + 1px) 0 calc(var(--size-xsmall) + 1px);
		color: var(--figma-color-text);
		letter-spacing: var(--font-letter-spacing-pos-small);
	}
	.secondary:enabled:active,
	.secondary:enabled:focus {
		border: 2px solid var(--figma-color-border-selected);
		padding: 0 var(--size-xsmall) 0 var(--size-xsmall);
	}
	.secondary:disabled {
		border: 1px solid var(--figma-color-border-disabled-strong);
		color: var(--figma-color-text-disabled);
	}
	.secondary.destructive {
		/* this should be deprecated */
		border-color: var(--figma-color-border-danger-strong);
		color: var(--figma-color-text-danger);
	}
	.secondary.destructive:enabled:active,
	.secondary.destructive:enabled:focus {
		border: 2px solid var(--figma-color-border-danger-strong);
		padding: 0 var(--size-xsmall) 0 var(--size-xsmall);
	}
	.secondary.destructive:disabled {
		opacity: 0.4;
	}

	/* tertiary styles */
	.tertiary {
		cursor: pointer;
		border: 1px solid transparent;
		background: initial;
		padding: 0;
		color: var(--figma-color-text-brand);
		font-weight: var(--font-weight-normal);
		letter-spacing: var(--font-letter-spacing-pos-small);
	}
	.tertiary:enabled:focus {
		text-decoration: underline;
	}
	.tertiary:disabled {
		color: var(--figma-color-text-disabled);
	}
	.tertiary.destructive {
		color: var(--figma-color-text-danger);
	}
	.tertiary.destructive:enabled:focus {
		text-decoration: underline;
	}
	.tertiary.destructive:disabled {
		opacity: 0.4;
	}

	.rounded {
		border-radius: var(--border-radius-medium);
	}
</style>
