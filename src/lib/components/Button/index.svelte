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
		spin?: boolean;
		style?: string;
		size?: 'large' | 'default';
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
		spin = false,
		style = '',
		size = 'default',
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
	class={[variant, size, className, destructive && 'destructive']}
	{style}
	{onclick}
	{onsubmit}
>
	{#if icon}
		<Icon {icon} {spin} />
	{/if}
	{#if children}
		<span>{@render children?.()}</span>
	{/if}
</button>

<style>
	button {
		display: flex;
		flex-shrink: 0;
		justify-content: center;
		align-items: center;
		outline: 1px solid transparent;
		outline-offset: -1px;
		border: none;
		border-radius: var(--border-radius-medium);
		padding: 0 8px;
		min-height: 24px;
		font-weight: var(--font-weight-default);
		font-size: var(--font-size-xsmall);

		line-height: 16px;
		letter-spacing: var(--font-letter-spacing-pos-xsmall);
		user-select: none;
		text-decoration: none;

		&.large {
			min-height: 32px;
		}

		/* &:global(:has(svg)) {
			padding-inline-start: 4px;
		} */

		&.primary {
			background-color: var(--figma-color-bg-brand);
			color: var(--figma-color-text-onbrand);

			&:enabled {
				&:active {
					background-color: var(--figma-color-bg-brand-pressed);
				}
				&:focus-visible {
					outline: 1px solid var(--figma-color-border-brand-strong);
					outline-offset: -1px;
				}
			}

			&:disabled {
				background-color: var(--figma-color-bg-disabled);
			}

			&.destructive {
				background-color: var(--figma-color-bg-danger);

				&:enabled {
					&:active {
						background-color: var(--figma-color-bg-danger-pressed);
					}
					&:focus-visible {
						outline: 1px solid var(--figma-color-border-danger-strong);
					}
				}

				&:disabled {
					background-color: var(--figma-color-bg-disabled);
				}
			}
		}

		&.secondary {
			outline: 1px solid var(--figma-color-border);
			background-color: transparent;
			color: var(--figma-color-text);
			letter-spacing: var(--font-letter-spacing-pos-small);

			&:enabled {
				&:active {
					background-color: var(--figma-color-bg-hover);
				}
				&:focus-visible {
					outline: 1px solid var(--figma-color-border-selected);
					outline-offset: -1px;
				}
			}

			&:disabled {
				outline: 1px solid var(--figma-color-border-disabled);
				color: var(--figma-color-text-disabled);
			}

			&.destructive {
				outline-color: var(--figma-color-border-danger-strong);
				color: var(--figma-color-text-danger);

				&:disabled {
					opacity: 0.4;
				}
			}
		}

		&.tertiary {
			cursor: pointer;
			background: none;
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

				&:disabled {
					opacity: 0.4;
				}
			}
		}
	}
</style>
