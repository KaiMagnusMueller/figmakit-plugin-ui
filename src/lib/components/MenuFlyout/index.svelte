<script module lang="ts">
	export type Group = {
		label?: string;
		items: Option[];
	};

	export type Option = {
		value: string;
		label: string;
		selected?: boolean;
		hidden?: boolean;
		id?: string;
	};
</script>

<script lang="ts">
	import MenuDivider from './MenuDivider.svelte';
	import MenuItem from './MenuItem.svelte';

	type Props = {
		onclick?: (e: MouseEvent) => void;
		onchange?: (item: Option, value: Option[]) => void;
		onfocus?: (e: Event) => void;
		onblur?: (e: Event) => void;
		anchorName: string;
		blink?: boolean;
		class?: string;
		disabled?: boolean;
		icon?: string;
		iconText?: string;
		menuButton: HTMLButtonElement | null;
		multiselect?: boolean;
		optGroups?: Group[]; //pass data in via this prop to generate menu items
		placeholder?: string;
		rounded?: boolean;
		showGroupLabels?: boolean; //default prop, true will show option group labels
		value?: Option[]; //stores the current selection, note, the value will be an object from your array
		[key: string]: unknown;
	};

	let {
		onclick,
		onchange,
		onblur,
		onfocus,
		onhidemenu,
		anchorName,
		blink,
		class: className = '',
		disabled = false,
		icon,
		iconText,
		menuButton = null,
		multiselect = false,
		optGroups = [],
		placeholder = optGroups.length <= 0
			? 'There are no items to select'
			: 'Please make a selection',
		rounded,
		showGroupLabels,
		value = [],
		...props
	}: Props = $props();

	let menuList: HTMLUListElement | null = $state(null);

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

<ul
	{...props}
	class="menu"
	class:rounded
	bind:this={menuList}
	popover=""
	id={anchorName}
	style={`position-anchor: ${anchorName};`}
>
	{#key value}
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
	{/key}
</ul>

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
</style>
