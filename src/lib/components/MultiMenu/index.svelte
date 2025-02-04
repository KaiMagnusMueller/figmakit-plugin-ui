<script lang="ts">
	import type { MenuGroup, MenuOption } from './types.ts';
	import { type Snippet } from 'svelte';

	type Value = { [key: string]: string | string[] };

	type Props = {
		onmouseenter?: (event: MouseEvent) => void;
		onclick?: (action: string) => void;
		onchange: (value: Value) => void;
		groups: MenuGroup[];
		blink?: boolean;
		item?: any;
		rounded?: boolean;
		value?: Value;
		children?: Snippet;
		[propName: string]: any;
	};

	let {
		onmouseenter,
		onclick,
		onchange,
		groups = [],
		blink = false,
		item,
		rounded = false,
		value = $bindable({}),
		children,
		...props
	}: Props = $props();

	function collectSelectedOptions(groups: MenuGroup[]): Value {
		const result: Value = {};

		function processGroup(group: MenuGroup) {
			if (!group.children) return;

			const selectedValues: string[] = [];

			group.children.forEach((child) => {
				if ('children' in child) {
					Object.assign(result, collectSelectedOptions([child]));
				} else if ('selected' in child && child.selected && 'value' in child) {
					selectedValues.push(child.value);
				}
			});

			if (selectedValues.length > 0) {
				result[group.name] = group.mode === 'single' ? selectedValues[0] : selectedValues;
			}
		}

		groups.forEach(processGroup);
		return result;
	}

	function handleOptionClick(option: MenuOption, group: MenuGroup) {
		if ('action' in option) {
			console.log('Action:', option.action);
			onclick?.(option.action);
			return;
		}

		if (group.mode === 'single') {
			group.children.forEach((child) => {
				if ('selected' in child) {
					child.selected = false;
				}
			});
			option.selected = true;
		} else if (group.mode === 'multi') {
			option.selected = !option.selected;
		}

		value = collectSelectedOptions(groups);

		console.log('Selected options:', value);
		onchange?.(value);
	}

	let menuContainerElem: HTMLElement;
	let originalAnchor = `--fk-${crypto.getRandomValues(new Uint32Array(1))[0]}`;
</script>

<div class="multi-menu-container" bind:this={menuContainerElem}>
	<button popovertarget={originalAnchor} style={`anchor-name: ${originalAnchor};`}
		>Trigger button
	</button>

	{@render popoverContainer(groups, originalAnchor)}
</div>

{#snippet popoverContainer(groups: MenuGroup[], anchorName?: string)}
	<div
		popover=""
		id={anchorName}
		style={`position-anchor: ${anchorName};`}
		ontoggle={(e) => {
			if (e.newState === 'open') {
				const button = (e.target as HTMLElement)?.querySelector('button');
				button?.focus();
			}
		}}
		onmouseleave={() => {
			menuContainerElem.querySelectorAll('div[popover]').forEach((popover) => {
				if (popover.id !== originalAnchor) {
					(popover as HTMLElement).hidePopover();
				}
			});
		}}
	>
		<div class="popover-inner-wrapper">
			{#each groups as group}
				{@render multiMenuGroup(group, anchorName)}
			{/each}
		</div>
	</div>
{/snippet}

{#snippet multiMenuGroup(group: MenuGroup, parentAnchor?: string)}
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
						{@render menuOption(option, group, parentAnchor)}
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
		onmouseenter={() => {
			menuContainerElem.querySelectorAll('div[popover]').forEach((popover) => {
				if (popover.id !== anchorName && popover.id !== originalAnchor) {
					(popover as HTMLElement).hidePopover();
				}
			});

			const popover = document.getElementById(anchorName);
			popover?.showPopover();
		}}
	>
		<span>{group.label}</span>
		<span>{'>'}</span>
	</button>
	{@render popoverContainer([group], anchorName)}
{/snippet}

{#snippet menuOption(option: MenuOption, group: MenuGroup, parentAnchor?: string)}
	<button
		class="menu-item"
		onclick={() => {
			handleOptionClick(option, group);
		}}
		onmouseenter={() => {
			menuContainerElem.querySelectorAll('div[popover]').forEach((popover) => {
				if (popover.id !== parentAnchor && popover.id !== originalAnchor) {
					(popover as HTMLElement).hidePopover();
				}
			});
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

	/* button:focus-visible,
	button:focus {
		outline: 2px solid var(--figma-color-border-selected);
	} */

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

	.menu-item.focused {
		outline: none;
		background: var(--figma-color-bg-hover);
	}

	.multi-menu-container {
		outline: none;
	}
</style>
