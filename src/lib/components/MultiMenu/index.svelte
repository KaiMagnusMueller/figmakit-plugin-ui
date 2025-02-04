<script lang="ts">
	import type { MenuGroup, MenuOption } from './types.ts';
	import { type Snippet } from 'svelte';
	import { IconCheck, Icon } from '$lib/index.js';

	type Value = { [key: string]: string | string[] };
	type Props = {
		groups: MenuGroup[];
		onchange: (value: Value) => void;
		onclick?: (action: string) => void;
		onmouseenter?: (event: MouseEvent) => void;
		blink?: boolean;
		rounded?: boolean;
		value?: Value;
		item?: any;
		children?: Snippet;
		[propName: string]: any;
	};

	// Component props
	let {
		groups = [],
		onchange,
		onclick,
		onmouseenter,
		rounded = false,
		value = $bindable({}),
		...props
	}: Props = $props();

	// DOM references and anchors
	let menuContainerElem: HTMLElement;
	let menuContainerAnchor = `--fk-${crypto.getRandomValues(new Uint32Array(1))[0]}`;

	let internalGroups: MenuGroup[] = $state(groups);

	// Helper functions
	function collectSelectedOptions(_groups: MenuGroup[]): Value {
		const result: Value = {};

		for (const group of _groups) {
			if (!group.children) continue;

			const selectedValues = group.children
				.filter((child): child is MenuOption => !('children' in child))
				.filter((option) => 'selected' in option && option.selected && 'value' in option)
				.map((option) => option.value);

			if (selectedValues.length > 0) {
				result[group.name] = group.mode === 'single' ? selectedValues[0] : selectedValues;
			}

			// Process nested groups
			group.children
				.filter((child): child is MenuGroup => 'children' in child)
				.forEach((childGroup) => {
					Object.assign(result, collectSelectedOptions([childGroup]));
				});
		}
		return result;
	}

	// Event handlers
	function handleOptionClick(option: MenuOption, group: MenuGroup) {
		// console.log('option', option);
		// console.log('group', group);

		if ('action' in option) {
			onclick?.(option.action);
			return;
		}

		if (group.mode === 'single') {
			group.children.forEach((child) => {
				if ('selected' in child) child.selected = false;
			});
			option.selected = true;
		} else if (group.mode === 'multi') {
			option.selected = !option.selected;
		}

		value = collectSelectedOptions(internalGroups);
		onchange?.(value);
	}

	function hideOtherPopovers(exceptId: string) {
		menuContainerElem.querySelectorAll('div[popover]').forEach((popover) => {
			if (popover.id !== exceptId && popover.id !== menuContainerAnchor) {
				(popover as HTMLElement).hidePopover();
			}
		});
	}
</script>

<div class="menu-container" bind:this={menuContainerElem}>
	<button popovertarget={menuContainerAnchor} style={`anchor-name: ${menuContainerAnchor};`}>
		Trigger button
	</button>

	{@render popoverContainer(internalGroups, menuContainerAnchor)}
</div>

{#snippet popoverContainer(_groups: MenuGroup[], anchorName?: string)}
	{@const hasSelectableOptions = _groups.some(
		(elem) => elem.mode === 'single' || elem.mode === 'multi'
	)}
	<div
		role="menu"
		tabindex="0"
		popover=""
		id={anchorName}
		style={`position-anchor: ${anchorName};`}
		onmouseleave={() => hideOtherPopovers(menuContainerAnchor)}
	>
		<div class="popover-content">
			{#each _groups as group, i}
				{#if i > 0}
					<hr />
				{/if}
				{@render multiMenuGroup(group, anchorName, hasSelectableOptions)}
			{/each}
		</div>
		<div class="hover-helper"></div>
	</div>
{/snippet}

{#snippet multiMenuGroup(group: MenuGroup, parentAnchor?: string, hasSelectableOptions?: boolean)}
	<div class="menu" class:rounded>
		{#if group.children}
			<div>
				{#each group.children as option}
					{@render menuElement(option, group, parentAnchor, hasSelectableOptions)}
				{/each}
			</div>
		{:else}
			<p>No options in this group</p>
		{/if}
	</div>
{/snippet}

{#snippet menuElement(
	option: MenuOption | MenuGroup,
	group: MenuGroup,
	parentAnchor?: string,
	hasSelectableOptions?: boolean
)}
	{#if 'children' in option}
		{@const anchorName = `--fk-${crypto.getRandomValues(new Uint32Array(1))[0]}`}
		<button
			class="menu-item group"
			popovertarget={anchorName}
			style={`anchor-name: ${anchorName};`}
			onmouseenter={() => {
				hideOtherPopovers(anchorName);
				document.getElementById(anchorName)?.showPopover();
			}}
		>
			<span class="left-group">
				{#if hasSelectableOptions}
					<div class="icon-placeholder"></div>
				{/if}
				<span>{option.label}</span>
			</span>
			<span>{'>'}</span>
		</button>
		{@render popoverContainer([option], anchorName)}
	{:else}
		<button
			class="menu-item"
			class:disabled={option.disabled}
			onclick={() => handleOptionClick(option, group)}
			onmouseenter={() => hideOtherPopovers(parentAnchor || '')}
		>
			<span class="left-group">
				{#if !!option.selected}
					<Icon icon={IconCheck} size={16}></Icon>
				{:else if hasSelectableOptions}
					<div class="icon-placeholder"></div>
				{/if}
				<span>{option.label}</span>
			</span>
		</button>
	{/if}
{/snippet}

<style>
	.menu-container {
		outline: none;
	}

	.menu {
		border: none;
		/* background: var(--figma-color-bg); */
		min-width: 180px;
	}

	.menu.rounded {
		border-radius: var(--border-radius-large);
	}

	.menu-item {
		display: flex;
		align-items: center;
		gap: 4px;
		cursor: default;
		border: none;
		border-radius: var(--border-radius-medium);
		background: none;
		padding: 0 8px;
		width: 100%;
		min-height: 25px;
		color: var(--color-text-menu-text);
		user-select: none;

		&:hover:not(.disabled) {
			background: var(--figma-color-bg-brand-hover);
		}

		&.group {
			justify-content: space-between;
		}

		span {
			display: inherit;
			gap: inherit;
		}

		&.disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}
	}

	.menu-container > div[popover] {
		padding: 0;
	}

	div[popover] {
		position-area: x-end span-y-end;
		margin: 0 0 0 0;
		inset-block-start: -8px;
		inset-inline-start: 8px;
		border: none;
		background: none;
		padding: 0 4px 0 8px;
		overflow: visible;
	}

	.popover-content {
		box-shadow: 0 7px 20px #0000001f;
		border-radius: var(--border-radius-large);
		background: var(--color-bg-menu);
		padding: 8px;
		color: var(--color-text-menu-text);

		hr {
			border: none;
			border-top: 1px solid var(--color-border-menu);
			background: none;
		}
	}

	.hover-helper {
		position: absolute;
		z-index: -1;
		clip-path: polygon(0 32px, 48% 32px, 48px 8px, 100% 0, 100% 100%, 16px 40px);
		inset: 0;
		inset-inline-start: -64px;
		/* background: red; */
		width: 80px;
		height: 100%;
	}

	.icon-placeholder {
		width: 16px;
		height: 16px;
	}
</style>
