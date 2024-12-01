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
	import { clickOutside, resizeAndPosition } from '$lib/helpers.svelte.js';

	import SelectItem from './SelectItem.svelte';
	import SelectDivider from './SelectDivider.svelte';
	import { Icon } from '$lib/index.js';

	type Props = {
		onchange?: (e: IOption[]) => void;
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
		value?: IOption[]; //stores the current selection, note, the value will be an object from your array
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
	function menuClick(event: MouseEvent) {
		// console.log('menuClick', event);
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

		let id = (event.target as HTMLElement).getAttribute('data-id');

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

	function hideMenu() {
		open = false;
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
	<button bind:this={menuButton} onclick={(e) => menuClick(e)} {disabled} class:selected={open}>
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
						fill="black"
					/>
				</svg>
			</span>
		{/if}
	</button>

	{#if open}
		<ul
			class="menu"
			class:rounded
			bind:this={menuList}
			use:clickOutside={menuButton}
			use:resizeAndPosition={menuButton}
			onclickOutside={() => hideMenu()}
		>
			{#if internalGroups && internalGroups.length > 0}
				{#each internalGroups as group, i}
					{#if internalGroups.length > 1 && i > 0}
						<SelectDivider></SelectDivider>
					{/if}
					{#if group.label && internalGroups.length > 1 && showGroupLabels}
						<SelectDivider label>{group.label}</SelectDivider>
					{/if}
					{#each group.items as item}
						<SelectItem
							{blink}
							selected={item.selected}
							onclick={(e) => menuClick(e)}
							itemId={item.id}
							disabled={item.hidden}
							{rounded}>{item.label}</SelectItem
						>
					{/each}
				{/each}
			{/if}
		</ul>
	{/if}
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
	}
	button:hover,
	button:active {
		border-color: var(--figma-color-border);
	}
	button:hover .placeholder {
		color: var(--figma-color-icon);
	}

	/* Can probably be removed */
	button:hover .caret svg path,
	button:focus .caret svg path {
		fill: var(--figma-color-icon);
	}
	button:hover .caret,
	button:focus .caret {
		margin-left: auto;
	}
	button:focus {
		outline: 2px solid var(--figma-color-border-brand);
		outline-offset: -2px;
	}
	button:focus .placeholder {
		color: var(--figma-color-text);
	}
	button:disabled .label {
		color: var(--figma-color-text-secondary);
	}
	button:disabled:hover {
		justify-content: flex-start;
		border-color: transparent;
	}
	button:disabled:hover .placeholder {
		color: var(--figma-color-text-secondary);
	}
	button:disabled:hover .caret svg path {
		fill: var(--figma-color-text-secondary);
	}
	button * {
		pointer-events: none;
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

	.caret svg path {
		fill: var(--figma-color-icon-tertiary);
	}

	.icon {
		margin-inline-start: -0.5rem;
		color: var(--figma-color-icon);
	}

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
