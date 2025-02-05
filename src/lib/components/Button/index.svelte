<script lang="ts">
	import type { Snippet } from 'svelte';
	import { blurOnEvent } from '$lib/helpers.svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { Icon } from '$lib/index.js';

	type Props = {
		onclick?: (e: MouseEvent) => void;
		onsubmit?: (e: SubmitEvent) => void;
		class?: string;
		destructive?: boolean;
		disabled?: boolean;
		icon?: string;
		rounded?: boolean;
		spin?: boolean;
		style?: string;
		variant?: 'primary' | 'secondary' | 'tertiary';
		children?: Snippet;
	} & HTMLButtonAttributes;

	let {
		onclick,
		onsubmit,
		class: className = '',
		destructive = false,
		disabled = false,
		icon,
		rounded = false,
		spin = false,
		style = '',
		type = 'button',
		variant = 'primary',
		children,
		...props
	}: Props = $props();
</script>

<button
	{...props}
	{type}
	{disabled}
	class={[
		variant,
		className,
		destructive && 'destructive',
		rounded && 'rounded',
		icon && 'icon-button'
	]}
	{style}
	{onclick}
	{onsubmit}
	use:blurOnEvent
>
	{#if icon}
		<Icon {icon} {spin} color="currentColor" />
	{/if}
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
		padding: 0 12px;
		height: 32px;
		color: var(--figma-color-text-onbrand);
		font-weight: var(--font-weight-bold);
		line-height: 16px;
		user-select: none;
		text-decoration: none;
		fill: var(--figma-color-icon);

		&.icon-button {
			padding-inline-start: 4px;
		}

		&.rounded {
			border-radius: var(--border-radius-medium);
		}

		&.primary {
			background-color: var(--figma-color-bg-brand);
			color: var(--figma-color-text-onbrand);

			&:enabled {
				&:active {
					background-color: var(--figma-color-bg-brand-pressed);
				}
				&:focus-visible {
					border: 2px solid var(--figma-color-border-brand-strong);
				}
			}

			&:disabled {
				background-color: var(--figma-color-bg-disabled);
			}

			&.destructive {
				background-color: var(--figma-color-bg-danger);

				&:active {
					background-color: var(--figma-color-bg-danger-pressed);
				}
				&:focus-visible {
					border: 2px solid var(--figma-color-border-disabled-strong);
				}
				&:disabled {
					background-color: var(--figma-color-bg-disabled);
				}
			}
		}

		&.secondary {
			border: 1px solid var(--figma-color-border-strong);
			background-color: transparent;

			color: var(--figma-color-text);
			letter-spacing: var(--font-letter-spacing-pos-small);

			&:enabled {
				&:active {
					background-color: var(--figma-color-bg-hover);
				}
				&:focus-visible {
					outline: 2px solid #2c2c2c;
					outline-offset: -2px;
				}
			}

			&:disabled {
				border: 1px solid var(--figma-color-border-disabled-strong);
				color: var(--figma-color-text-disabled);
			}

			&.destructive {
				border-color: var(--figma-color-border-danger-strong);
				color: var (--figma-color-text-danger);

				&:enabled {
					&:active,
					&:focus-visible {
						border: 2px solid var(--figma-color-border-danger-strong);
						padding: 0 12px;
					}
				}

				&:disabled {
					opacity: 0.4;
				}
			}
		}

		&.tertiary {
			cursor: pointer;
			border: 1px solid transparent;
			background: initial;
			padding: 0;
			color: var(--figma-color-text-brand);
			font-weight: var(--font-weight-normal);
			letter-spacing: var(--font-letter-spacing-pos-small);

			&:enabled:focus-visible {
				text-decoration: underline;
			}

			&:disabled {
				color: var(--figma-color-text-disabled);
			}

			&.destructive {
				color: var(--figma-color-text-danger);

				&:enabled:focus-visible {
					text-decoration: underline;
				}

				&:disabled {
					opacity: 0.4;
				}
			}
		}
	}
</style>
