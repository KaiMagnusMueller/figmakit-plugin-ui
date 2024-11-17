<script lang="ts">
	import { clickOutside, resizeAndPosition } from '$lib/helpers.svelte.js';

	import { SelectItem, SelectDivider } from './index.js';
	import { Icon } from '$lib/index.js';

	type Group = {
		label?: string;
		items: Option[];
	};

	type Option = {
		value: string;
		label: string;
		selected?: boolean;
		hidden?: boolean;
		id?: string;
	};

	type OptionInternal = Option & {
		id: string;
	};

	type GroupInternal = {
		label?: string;
		items: OptionInternal[];
	};

	type Props = {
		onchange?: (e: Option[]) => void;
		onfocus?: (e: Event) => void;
		onblur?: (e: Event) => void;
		icon?: string;
		iconText?: string;
		disabled?: boolean;
		macOSBlink?: boolean;
		optGroups?: Group[]; //pass data in via this prop to generate menu items
		placeholder?: string;
		value?: OptionI[]; //stores the current selection, note, the value will be an object from your array
		open?: boolean;
		multiselect?: boolean;
		showGroupLabels?: boolean; //default prop, true will show option group labels
		rounded?: boolean;
		class?: string;
		[key: string]: unknown;
	};

	let {
		onchange,
		onblur,
		onfocus,
		icon,
		iconText,
		disabled = $bindable(false),
		optGroups = [],
		placeholder = $bindable('Please make a selection.'),
		value = $bindable([]),
		multiselect = $bindable(false),
		open = $bindable(false),
		showGroupLabels,
		rounded,
		class: className = '',
		...props
	}: Props = $props();

	let menuWrapper = $state();
	let menuButton: HTMLButtonElement = $state(undefined);
	let menuList: HTMLUListElement = $state(undefined);

	let internalGroups: GroupInternal[] = $state([]);

	//FUNCTIONS

	$effect(() => {
		updateSelectedAndIds();
	});

	// this function runs everytime the optGroups array os updated
	// it will auto assign ids and keep the value var updated
	function updateSelectedAndIds() {
		internalGroups = optGroups.map((group, groupIndex) => {
			return {
				...group,
				items: group.items.map((item, itemIndex) => ({
					...item,
					id: `${groupIndex}-${itemIndex}`
				}))
			};
		});

		//Update the value variable, if an element is selected. If not, select the first one.

		//set placeholder
		if (optGroups.length <= 0) {
			placeholder = 'There are no items to select';
			disabled = true;
		} else {
			placeholder = 'Please make a selection';
			disabled = false;
		}
	}

	// //menu highlight function on the selected menu item
	// function removeHighlight(event) {
	// 	let items = Array.from(event.target.parentNode.children);
	// 	items.forEach((item) => {
	// 		item.blur();
	// 		item.classList.remove('highlight');
	// 	});
	// }

	//run for all menu click events
	//this opens/closes the menu
	function menuClick(event: MouseEvent) {
		// console.log('menuClick', event);
		open = !open;

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

		let itemId = (event.target as HTMLElement).getAttribute('data-id');

		function getOptionById(id: string, groups: GroupInternal[]): OptionInternal | null {
			for (const group of groups) {
				for (const item of group.items) {
					if (item.id === id) {
						return item;
					}
				}
			}
			return null;
		}

		if (!itemId) {
			return;
		}

		const selectedItem = getOptionById(itemId, internalGroups);

		if (!selectedItem) {
			return;
		}

		if (selectedItem.selected) {
			selectedItem.selected = false;
			value = value.filter((item) => item.id !== selectedItem.id);
		} else {
			selectedItem.selected = true; //select current item
			if (multiselect) {
				value = [...value, selectedItem];
			} else {
				value = [selectedItem];
			}
		}

		// updateSelectedAndIds();
		onchange?.(value);

		// if (macOSBlink) {
		// var x = 4;
		// var interval = 70;

		// //blink the background
		// for (var i = 0; i < x; i++) {
		// 	setTimeout(function () {
		// 		event.target.classList.toggle('blink');
		// 	}, i * interval);
		// }
		// //delay closing the menu
		// setTimeout(
		// 	function () {
		// 		menuList.classList.add('hidden'); //hide the menu
		// 	},
		// 	interval * x + 40
		// );
		// } else {

		open = false;

		// menuButton.classList.remove('selected'); //remove selected state from button
		// }
		// 	}
	}

	function hideMenu(event?: Event) {
		open = false;
	}

	$effect(() => {
		$inspect(value);
	});
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
			<span class="icon"><Icon {icon} color="black3" /></span>
		{/if}

		{#if !!value && value.length === 1}
			<span class="label">{value[0].label}</span>
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
			onclickOutside={(e) => hideMenu(e)}
		>
			{#if internalGroups && internalGroups.length > 0}
				{#each internalGroups as group, i}
					{#if internalGroups.length > 1 && i > 0}
						<SelectDivider></SelectDivider>
					{/if}
					{#if group.label && internalGroups.length > 1}
						<SelectDivider label>{group.label}</SelectDivider>
					{/if}
					{#each group.items as item}
						<SelectItem
							onclick={(e) => menuClick(e)}
							itemId={item.id}
							disabled={item.hidden}
							{rounded}>{item.label}</SelectItem
						>
					{/each}

					<!-- {#if i === 0}
					{#if item.group && showGroupLabels}
						<SelectDivider label>{item.group}</SelectDivider>
					{/if}
				{:else if i > 0 && item.group && optGroups[i - 1].group != item.group}
					{#if showGroupLabels}
						<SelectDivider />
						<SelectDivider label>{item.group}</SelectDivider>
					{:else}
						<SelectDivider />
					{/if}
				{/if}
				<SelectItem
					on:click={menuClick}
					on:mouseenter={removeHighlight}
					itemId={item.id}
					disabled={item.hidden}
					bind:selected={item.selected}
					{rounded}>{item.label}</SelectItem
				> -->
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
		margin: 1px 0 1px 0;
		border: 1px solid transparent;
		border-radius: var(--border-radius-small);
		background-color: var(--figma-color-bg);
		padding: 4px var(--size-xxsmall) 0px var(--size-xxsmall);
		width: 100%;
		height: 30px;
		overflow-y: hidden;
	}
	button:hover,
	button:active {
		border-color: var(--figma-color-border);
	}
	button:hover .placeholder {
		color: var(--figma-color-icon);
	}
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
		color: var(--black3);
	}
	button:disabled:hover {
		justify-content: flex-start;
		border-color: transparent;
	}
	button:disabled:hover .placeholder {
		color: var(--black3);
	}
	button:disabled:hover .caret svg path {
		fill: var(--black3);
	}
	button * {
		pointer-events: none;
	}

	.label,
	.placeholder {
		margin-top: -3px;
		margin-right: 6px;
		overflow-x: hidden;
		color: var(--figma-color-text);
		font-weight: var(--font-weight-normal);
		font-size: var(--font-size-xsmall);
		line-height: var(--line-height);
		letter-spacing: var(--font-letter-spacing-neg-xsmall);
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.placeholder {
		color: var(--figma-color-text-tertiary);
	}

	.caret {
		display: block;
		margin-top: -1px;
	}

	.caret svg path {
		fill: var(--figma-color-icon-tertiary);
	}

	.icon {
		margin-top: -2px;
		margin-right: 0;
		margin-left: -8px;
	}

	.menu {
		position: absolute;
		top: 32px;
		left: 0;
		z-index: 50;
		margin: 0;
		box-shadow: var(--shadow-hud);
		border-radius: var(--border-radius-small);
		background-color: var(--figma-color-bg);
		padding: var(--size-xxsmall) 0 var(--size-xxsmall) 0;
		width: 100%;
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
			background-color: yellow; /* Highlight color */
		}
	}

	.blink {
		animation: blink 0.7s ease-in-out 4; /* Adjust duration and iteration count as needed */
	}
</style>
