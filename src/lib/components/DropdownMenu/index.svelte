<script module lang="ts">
	export type Option = {
		hidden?: boolean;
		label: string;
		icon?: string;
		value: string;
		selected?: boolean;
		id?: string;
		nestedGroups?: Group[];
	};

	export type Group = {
		label?: string;
		options: Option[];
		type: 'singleselect' | 'multiselect' | 'button';
		value?: string[];
	};
</script>

<script lang="ts">
	import { Icon, MenuFlyout } from '$lib/index.js';
	import type { Snippet } from 'svelte';
	import MenuDivider from '../MenuFlyout/MenuDivider.svelte';
	import MenuItem from '../MenuFlyout/MenuItem.svelte';

	type Props = {
		onchange?: (e: Option, value: Option[]) => void;
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
		children?: Snippet;
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
		children,
		...props
	}: Props = $props();

	let menuWrapper = $state();
	let menuButton: HTMLButtonElement | null = $state(null);
	let menuList: HTMLUListElement | null = $state(null);
	let anchorName = `--fk-${crypto.getRandomValues(new Uint32Array(1))[0]}`;

	let internalGroups: Group[] = $derived(validateAndUpdateGroups(optGroups));

	//FUNCTIONS
	function validateUniqueValues(groups: Group[]): boolean {
		const values = new Set<string>();
		for (const group of groups) {
			for (const item of group.items) {
				if (values.has(item.value)) {
					console.error(`Duplicate value found: ${item.value}`);
					return false;
				}
				values.add(item.value);
			}
		}
		return true;
	}

	function validateAndUpdateGroups(groups: Group[]): Group[] {
		if (!validateUniqueValues(groups)) {
			throw new Error('MenuFlyout: All items must have unique values');
		}
		return updateSelectedAndIds(groups);
	}

	// this function runs everytime the optGroups array is updated
	function updateSelectedAndIds(groups: Group[]): Group[] {
		return groups.map((group, groupIndex) => {
			return {
				...group,
				items: group.items.map((item, itemIndex) => ({
					...item,
					id: `${groupIndex}-${itemIndex}`
				}))
			};
		});

		//Update the value variable, if an element is selected. If not, select the first one.
	}

	// TODO: Make this depth independent
	function getOptionById(id: string, groups: Group[]): Option | null {
		for (const group of groups) {
			for (const item of group.items) {
				if (item.id === id) {
					return item;
				}
			}
		}
		return null;
	}

	//run for all menu click events
	//this opens/closes the menu
	function menuClick(item: Option) {
		const id = item.id;
		if (!id) return;

		const selectedItem = getOptionById(id, internalGroups);
		if (!selectedItem) return;
		selectedItem.selected = !selectedItem.selected;

		if (multiselect) {
			value = selectedItem.selected
				? [...value, selectedItem]
				: value.filter((item) => item.id !== selectedItem.id);
		} else {
			internalGroups.forEach((group) =>
				group.items.forEach((item) => (item.selected = false))
			);
			selectedItem.selected = true;
			value = [selectedItem];
		}

		onchange?.(item, value);

		if (!multiselect) {
			menuList?.hidePopover();
		}
	}
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

		{#if children}
			<span class="label">{@render children?.()}</span>
		{/if}
	</button>

	<ul
		{...props}
		class="menu"
		class:rounded
		bind:this={menuList}
		popover=""
		id={anchorName}
		style={`position-anchor: ${anchorName};`}
	>
		{#if internalGroups && internalGroups.length > 0}
			{#each internalGroups as group, i}
				{#if internalGroups.length > 1 && i > 0}
					<MenuDivider></MenuDivider>
				{/if}
				{#if group.label && internalGroups.length > 1 && showGroupLabels}
					<MenuDivider label>{group.label}</MenuDivider>
				{/if}
				{#each group.items as item (item.id)}
					<MenuItem
						{blink}
						onclick={(e) => {
							console.log(e.id, 'clicked');
							menuClick(e);
						}}
						{item}
						{rounded}
					>
						{item.label}
					</MenuItem>
				{/each}
			{/each}
		{/if}
	</ul>
</div>

<style>
	.menu {
		position-area: y-end span-x-end;
		margin: 0;
		box-shadow: var(--shadow-hud);
		border-radius: var(--border-radius-small);
		background-color: var(--color-bg-menu);
		padding: var(--size-xxsmall) 0 var(--size-xxsmall) 0;
		min-width: anchor-size(width);
		overflow-x: overlay;
		overflow-y: auto;
	}

	.menu::-webkit-scrollbar {
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=);
		background-size: 100% auto;
		background-repeat: repeat;
		background-color: transparent;
		width: 12px;
	}

	.menu::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 10px 10px transparent;
		box-shadow: inset 0 0 10px 10px transparent;
		border: solid 3px transparent;
	}

	.menu::-webkit-scrollbar-thumb {
		-webkit-box-shadow: inset 0 0 10px 10px rgba(255, 255, 255, 0.4);
		box-shadow: inset 0 0 10px 10px rgba(255, 255, 255, 0.4);
		border: solid 3px transparent;
		border-radius: 6px;
	}

	.rounded {
		border-radius: var(--border-radius-large);
		/* 4px padding, together with .menu border */
		padding: 3px;
	}

	@keyframes blink {
		0%,
		100% {
			background-color: transparent;
		}
		50% {
			background-color: var(--figma-color-border-brand); /* Highlight color */
		}
	}

	.blink {
		animation: blink 0.7s ease-in-out 4; /* Adjust duration and iteration count as needed */
	}
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
