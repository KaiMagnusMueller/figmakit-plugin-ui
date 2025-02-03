<script module lang="ts">
	export type Group = IGroup;
	export type Option = IOption;

	interface IGroup {
		label?: string;
		items: IOption[];
	}

	interface IOption {
		value: string;
		label: string;
		selected?: boolean;
		hidden?: boolean;
		id?: string;
	}
</script>

<script lang="ts">
	import { clickOutside } from '$lib/helpers.svelte.js';

	import MenuDivider from './MenuDivider.svelte';
	import MenuItem from './MenuItem.svelte';

	type Props = {
		onclick?: (e: MouseEvent) => void;
		onchange?: (e: Option[]) => void;
		onfocus?: (e: Event) => void;
		onblur?: (e: Event) => void;
		onhidemenu?: () => void;
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
		menuButton: HTMLButtonElement | null;

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
		blink,
		class: className = '',
		disabled = false,
		icon,
		iconText,
		multiselect = false,
		open = false,
		optGroups = [],
		placeholder = optGroups.length <= 0
			? 'There are no items to select'
			: 'Please make a selection',
		rounded,
		menuButton = null,
		showGroupLabels,
		value = [],
		...props
	}: Props = $props();

	let menuList: HTMLUListElement | null = $state(null);

	let internalGroups: Group[] = updateSelectedAndIds(optGroups);

	//FUNCTIONS

	// this function runs everytime the optGroups array os updated
	// it will auto assign ids and keep the value var updated
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

	//run for all menu click events
	//this opens/closes the menu
	function menuClick(id: string) {
		open = !open;

		// TODO: Menu positioning at the y pos of the currently selected item

		// if (!event.target) {
		// 	menuList.classList.add('hidden');
		// } else if (event.target.contains(menuButton)) {
		// 	let topPos = 0;

		// 	if (value) {
		// 		//toggle menu
		// 		menuList.classList.remove('hidden');

		// 		let id = value.id;
		// 		let selectedItem = menuList.querySelector('[itemId="' + id + '"]');
		// 		selectedItem.focus(); //set focus to the currently selected item

		// 		// calculate distance from top so that we can position the dropdown menu
		// 		let parentTop = menuList.getBoundingClientRect().top;
		// 		let itemTop = selectedItem.getBoundingClientRect().top;
		// 		let topPos = itemTop - parentTop - 3;
		// 		menuList.style.top = -Math.abs(topPos) + 'px';

		// 		//update size and position based on plugin UI
		// 		resizeAndPosition();
		// 	} else {
		// 		menuList.classList.remove('hidden');
		// 		menuList.style.top = '0px';
		// 		let firstItem = menuList.querySelector('[itemId="0"]');
		// 		firstItem.focus();

		// 		//update size and position based on plugin UI
		// 		resizeAndPosition();
		// 	}
		// } else if (menuList.contains(event.target)) {
		//find selected item in array

		// Make this depth independent
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

		if (!id) {
			return;
		}

		const selectedItem = getOptionById(id, internalGroups);

		if (!selectedItem) {
			return;
		}

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

		onchange?.(value);
		open = false;
	}
</script>

{#if open}
	<ul
		{...props}
		class="menu"
		class:rounded
		bind:this={menuList}
		use:clickOutside={menuButton}
		onclickOutside={() => onhidemenu?.()}
	>
		{#if internalGroups && internalGroups.length > 0}
			{#each internalGroups as group, i}
				{#if internalGroups.length > 1 && i > 0}
					<MenuDivider></MenuDivider>
				{/if}
				{#if group.label && internalGroups.length > 1 && showGroupLabels}
					<MenuDivider label>{group.label}</MenuDivider>
				{/if}
				{#each group.items as item}
					<MenuItem
						{blink}
						selected={item.selected}
						onclick={(e) => menuClick(e)}
						itemId={item.id}
						disabled={item.hidden}
						{rounded}>{item.label}</MenuItem
					>
				{/each}
			{/each}
		{/if}
	</ul>
{/if}

<style>
	.menu {
		position: absolute;
		top: 32px;
		left: 0;
		z-index: 50;
		margin: 0;
		box-shadow: var(--shadow-hud);
		border-radius: var(--border-radius-small);
		background-color: var(--color-bg-menu);
		padding: var(--size-xxsmall) 0 var(--size-xxsmall) 0;
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
