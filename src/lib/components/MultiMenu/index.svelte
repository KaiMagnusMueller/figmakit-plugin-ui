<script lang="ts">
	import type {
		MenuGroup,
		BaseMenuOption,
		MenuChangeEvent,
		MenuClickEvent,
		MenuOption
	} from './types.ts';
	import { createEventDispatcher, type Snippet } from 'svelte';

	type Props = {
		onmouseenter?: (event: MouseEvent) => void;
		onclick?: (action: string) => void;
		groups: MenuGroup[];
		blink?: boolean;
		item?: any;
		rounded?: boolean;
		children?: Snippet;
		[propName: string]: any;
	};
	import MenuDivider from '../MenuFlyout/MenuDivider.svelte';

	let {
		onmouseenter,
		onclick,
		groups = [],
		blink = false,
		item,
		rounded = false,
		children,
		...props
	}: Props = $props();

	const dispatch = createEventDispatcher<{
		change: MenuChangeEvent;
		click: MenuClickEvent;
	}>();

	// function handleOptionClick(option: MenuOption, path: string[]) {
	// 	if (option.groups) {
	// 		// Handle submenu opening
	// 		return;
	// 	}

	// 	// Find the parent group
	// 	const group = findGroupByPath(groups, path);
	// 	if (!group) return;

	// 	if (group.mode === 'button') {
	// 		dispatch('click', {
	// 			optionId: option.id,
	// 			value: option.value,
	// 			path
	// 		});
	// 	} else {
	// 		const groupOptions = group.options || [];

	// 		if (group.mode === 'single') {
	// 			groupOptions.forEach((o) => (o.selected = false));
	// 			option.selected = true;
	// 		} else {
	// 			option.selected = !option.selected;
	// 		}

	// 		const selectedValues = groupOptions.filter((o) => o.selected).map((o) => o.value);

	// 		group.value = selectedValues;
	// 		dispatch('change', {
	// 			groupId: group.id,
	// 			value: selectedValues,
	// 			path
	// 		});
	// 	}
	// }

	// function findGroupByPath(group: MenuGroup, path: string[]): MenuGroup | null {
	// 	if (path.length === 0) return group;
	// 	const [currentId, ...rest] = path;

	// 	const nextGroup = (group.groups || []).find((g) => g.id === currentId);
	// 	if (!nextGroup) return null;

	// 	return findGroupByPath(nextGroup, rest);
	// }

	function handleOptionClick(option: MenuOption) {
		console.log('Option:', option);

		if ('action' in option) {
			console.log('Action:', option.action);
		} else {
			console.log('Selected:', option.value);
		}
	}

	let anchorName = `--fk-${crypto.getRandomValues(new Uint32Array(1))[0]}`;
</script>

<button popovertarget={anchorName} style={`anchor-name: ${anchorName};`}>Trigger button </button>

{@render popoverContainer(groups, anchorName)}

{#snippet popoverContainer(groups: MenuGroup[], anchorName?: string)}
	<div popover="" id={anchorName} style={`position-anchor: ${anchorName};`}>
		<div class="popover-inner-wrapper">
			{#each groups as group}
				{@render multiMenuGroup(group)}
			{/each}
		</div>
	</div>
{/snippet}

{#snippet multiMenuGroup(group: MenuGroup)}
	<div class="multi-menu" class:rounded>
		{#if !group.children}
			<p>No options in this group</p>
		{:else}
			<div>
				{#each group.children as optionOrGroup}
					{#if 'children' in optionOrGroup && (!('action' in optionOrGroup) || !('value' in optionOrGroup))}
						{@const group = optionOrGroup as MenuGroup}

						{@render menuGroupExpandable(group)}
					{:else}
						{@const option = optionOrGroup as MenuOption}

						{@render menuOption(option)}
					{/if}
				{/each}
			</div>
		{/if}
	</div>
{/snippet}

{#snippet menuGroupExpandable(group: MenuGroup)}
	{@const anchorName = `--fk-${crypto.getRandomValues(new Uint32Array(1))[0]}`}
	<button
		class="menu-item menu-group"
		popovertarget={anchorName}
		style={`anchor-name: ${anchorName};`}
	>
		<span>{group.label}</span>
		<span>{'>'}</span>
	</button>
	{@render popoverContainer([group], anchorName)}
{/snippet}

{#snippet menuOption(option: MenuOption)}
	<button
		class="menu-item"
		onclick={() => {
			handleOptionClick(option);
		}}
	>
		<span>{option.label}</span>
		{#if 'action' in option}
			<span>{option.action}</span>
		{/if}
	</button>
{/snippet}

<style>
	.multi-menu {
		border: 1px solid var(--figma-color-border);
		background: var(--figma-color-bg);
		min-width: 180px;
	}

	.rounded {
		border-radius: var(--border-radius-large);
	}

	.menu-item {
		display: flex;
		align-items: center;
		cursor: default;
		padding: var(--size-xxsmall) var(--size-xsmall);
		width: 100%;
		user-select: none;
	}

	.menu-group {
		display: flex;
		justify-content: space-between;
	}

	.menu-item:hover:not(.disabled) {
		background: var(--figma-color-bg-hover);
	}

	div[popover] {
		position-area: x-end span-y-end;
		margin: 0;
		margin-inline-start: 4px;
		border: none;
		padding: 0 4px;
		overflow: visible;
	}

	.popover-inner-wrapper {
		box-shadow: 0 7px 20px #0000001f;
		border: 1px solid var(--figma-color-border);
		border-radius: var(--border-radius-medium);
		background: var(--figma-color-bg);
	}

	button.menu-item {
		border: none;
		background: none;
	}

	.menu-item.selected {
		background: var(--figma-color-bg-selected);
	}

	.menu-item.disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.label {
		flex: 1;
	}

	.chevron {
		margin-left: var(--size-xsmall);
		font-size: 14px;
	}

	.nested {
		margin-left: var(--size-xsmall);
		border-left: 1px solid var(--figma-color-border);
	}

	.has-children {
		font-weight: var(--font-weight-medium);
	}
</style>
