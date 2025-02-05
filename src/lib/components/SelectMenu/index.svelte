<script lang="ts">
	import type { Option, Group } from '$lib/components/MenuFlyout/index.svelte';
	import { Icon, MenuFlyout } from '$lib/index.js';

	type Props = {
		onchange?: (e: Option[]) => void;
		onfocus?: (e: Event) => void;
		onblur?: (e: Event) => void;
		blink?: boolean;
		class?: string;
		disabled?: boolean;
		icon?: string;
		iconText?: string;
		multiselect?: boolean;
		open?: boolean;
		optGroups?: Group[]; //pass data in via this prop to generate menu items
		placeholder?: string;
		rounded?: boolean;
		showGroupLabels?: boolean; //default prop, true will show option group labels
		value?: Option[]; //stores the current selection, note, the value will be an object from your array
		[key: string]: unknown;
	};

	let {
		onchange,
		onblur,
		onfocus,
		blink,
		class: className = '',
		disabled = $bindable(false),
		icon,
		iconText,
		multiselect = $bindable(false),
		open = $bindable(false),
		optGroups = [],
		placeholder = optGroups.length <= 0
			? 'There are no items to select'
			: 'Please make a selection',
		rounded,
		showGroupLabels,
		value = $bindable([]),
		...props
	}: Props = $props();

	let menuWrapper = $state();
	let menuButton: HTMLButtonElement | null = $state(null);
	let menuList: HTMLUListElement | null = $state(null);
	let anchorName = `--fk-${crypto.getRandomValues(new Uint32Array(1))[0]}`;
</script>

<div
	{...props}
	{onfocus}
	{onblur}
	bind:this={menuWrapper}
	{placeholder}
	class="wrapper {className}"
>
	<button
		bind:this={menuButton}
		onclick={(e) => {}}
		{disabled}
		class:selected={open}
		popovertarget={anchorName}
		style={`anchor-name: ${anchorName};`}
	>
		{#if icon}
			<span class="icon"><Icon {icon} /></span>
		{/if}

		{#if value.length > 3}
			<span class="label">{value[0].label}, {value[1].label}, {value.length - 2} more</span>
		{:else if value.length > 0}
			<span class="label">{value.map((o) => o.label).join(', ')}</span>
		{:else}
			<span class="placeholder">{placeholder}</span>
		{/if}

		{#if !disabled}
			<span class="caret">
				<svg
					width="8"
					height="8"
					viewBox="0 0 8 8"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M3.64645 5.35359L0.646454 2.35359L1.35356 1.64648L4.00001 4.29293L6.64645 1.64648L7.35356 2.35359L4.35356 5.35359L4.00001 5.70714L3.64645 5.35359Z"
						fill="var(--color-icon)"
					/>
				</svg>
			</span>
		{/if}
	</button>

	<MenuFlyout
		{menuButton}
		{optGroups}
		onchange={(item, _value) => {
			value = _value;
			onchange?.(value);
		}}
		{anchorName}
		{showGroupLabels}
		{rounded}
		{multiselect}
		{blink}
	></MenuFlyout>
</div>

<style>
	.wrapper {
		position: relative;
	}

	button {
		display: flex;
		align-items: center;
		border: 1px solid transparent;
		border-radius: var(--border-radius-small);
		background-color: var(--figma-color-bg);
		padding-inline: var(--size-xxsmall) var(--size-xxsmall);
		width: 100%;
		height: 2rem;
		overflow-y: hidden;

		* {
			pointer-events: none;
		}

		&:hover,
		&:active {
			border-color: var(--figma-color-border);

			.placeholder {
				color: var(--figma-color-icon);
			}

			.caret {
				margin-left: auto;

				svg path {
					fill: var(--figma-color-icon);
				}
			}
		}

		&:focus {
			outline: 2px solid var(--figma-color-border-brand);
			outline-offset: -2px;

			.placeholder {
				color: var(--figma-color-text);
			}

			.caret {
				margin-left: auto;
			}
		}

		&:disabled {
			.label {
				color: var(--figma-color-text-secondary);
			}

			&:hover {
				justify-content: flex-start;
				border-color: transparent;

				.placeholder {
					color: var(--figma-color-text-secondary);
				}

				.caret svg path {
					fill: var(--figma-color-text-secondary);
				}
			}
		}
	}

	.label,
	.placeholder {
		margin-inline-end: 0.5rem;
		color: var(--figma-color-text);
		letter-spacing: var(--font-letter-spacing-neg-xsmall);
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.placeholder {
		color: var(--figma-color-text-tertiary);
	}

	.caret {
		svg path {
			fill: var(--figma-color-icon-tertiary);
		}
	}

	.icon {
		margin-inline-start: -0.5rem;
		color: var(--figma-color-icon);
	}
</style>
