<script lang="ts">
	import type { MenuGroup, MenuOption, SelectableMenuOption } from './types.ts';
	import { type Snippet } from 'svelte';
	import { IconCheck, Icon } from '$lib/index.js';
	import { IconCheck, Icon, IconChevronRight } from '$lib/index.js';

	type Value = Record<string, string | string[]>;

	interface Props {
		groups: MenuGroup[];
		value?: Value;
		onchange?: (value: Value) => void;
		onclick?: (action: string) => void;
		onmouseenter?: (event: MouseEvent) => void;
		blink?: boolean;
		rounded?: boolean;
		children?: Snippet;
		[propName: string]: any;
	}

	let {
		groups = [],
		value = $bindable({}),
		onchange,
		onclick,
		onmouseenter,
		rounded = false,
		children,
		...props
	}: Props = $props();

	// State
	let menuContainerElem: HTMLElement;
	let menuContainerAnchor = `--fk-popover-${crypto.getRandomValues(new Uint32Array(1))[0]}`;

	// Reactive groups
	let internalGroups: MenuGroup[] = $state(groups);

	// Type guards
	function isMenuOption(item: MenuOption | MenuGroup): item is MenuOption {
		return !('children' in item) && ('value' in item || 'action' in item);
	}

	function isMenuGroup(item: MenuOption | MenuGroup): item is MenuGroup {
		return 'children' in item;
	}

	function isValueOption(item: MenuOption | MenuGroup): item is SelectableMenuOption {
		return 'value' in item;
	}

	// Helper functions
	function collectSelectedOptions(_groups: MenuGroup[]): Value {
		return _groups.reduce((result, group) => {
			if (!group.children) return result;

			const selectedValues = group.children
				.filter((option) => isMenuOption(option) && option.selected)
				.map((option) =>
					// Typescript now knows this is a SelectableMenuOption
					isValueOption(option) ? option.value : ''
				);

			if (selectedValues.length > 0) {
				result[group.name] = group.mode === 'single' ? selectedValues[0] : selectedValues;
			}

			group.children.filter(isMenuGroup).forEach((childGroup) => {
				Object.assign(result, collectSelectedOptions([childGroup]));
			});

			return result;
		}, {} as Value);
	}

	function handleOptionClick(option: MenuOption, group: MenuGroup) {
		if ('action' in option) {
			onclick?.(option.action);
			return;
		}

		if (group.mode === 'single') {
			group.children?.forEach((child) => {
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
	<button
		popovertarget={menuContainerAnchor}
		style={`anchor-name: ${menuContainerAnchor};`}
		aria-haspopup="true"
	>
		{#if children}
			{@render children?.()}
		{:else}
			<span>Menu</span>
		{/if}
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
		aria-orientation="vertical"
	>
		<div class="popover-content">
			{#each _groups as group, i}
				{#if i > 0}
					<hr />
				{/if}
				{@render multiMenuGroup(group, anchorName, hasSelectableOptions)}
			{/each}
		</div>
		<div class="hover-helper" aria-hidden="true"></div>
	</div>
{/snippet}

{#snippet multiMenuGroup(group: MenuGroup, parentAnchor?: string, hasSelectableOptions?: boolean)}
	<div class="menu" class:rounded role="group" aria-label={group.name}>
		{#if group.children}
			{#each group.children as option}
				{@render menuElement(option, group, parentAnchor, hasSelectableOptions)}
			{/each}
		{:else}
			<p class="empty-state">No options in this group</p>
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
		{@const anchorName = `--fk-popover-${crypto.getRandomValues(new Uint32Array(1))[0]}`}
		<button
			class="menu-item group"
			popovertarget={anchorName}
			style={`anchor-name: ${anchorName};`}
			onmouseenter={() => {
				hideOtherPopovers(anchorName);
				document.getElementById(anchorName)?.showPopover();
			}}
			aria-haspopup="true"
		>
			<span class="left-group">
				{#if hasSelectableOptions}
					<div class="icon-placeholder" aria-hidden="true"></div>
				{/if}
				<span>{option.label}</span>
			</span>
			<Icon icon={IconChevronRight} size={16} aria-hidden="true" />
		</button>
		{@render popoverContainer([option], anchorName)}
	{:else}
		<button
			class="menu-item"
			class:disabled={option.disabled}
			onclick={() => handleOptionClick(option, group)}
			onmouseenter={() => hideOtherPopovers(parentAnchor || '')}
			role={group.mode === 'single'
				? 'menuitemradio'
				: group.mode === 'multi'
					? 'menuitemcheckbox'
					: 'menuitem'}
			disabled={option.disabled}
		>
			<span class="left-group">
				{#if option.selected}
					<Icon icon={IconCheck} size={16} aria-hidden="true" />
				{:else if hasSelectableOptions}
					<div class="icon-placeholder" aria-hidden="true"></div>
				{/if}
				<span>{option.label}</span>
			</span>
		</button>
	{/if}
{/snippet}

<style lang="scss">
	.menu-container {
		outline: none;
	}

	.menu {
		border: none;
		min-width: 180px;

		&.rounded {
			border-radius: var(--border-radius-large);
		}
	}

	.menu-item {
		--menu-item-padding-left: 8px;
		--menu-item-padding-right: 0;
		--menu-item-height: 24px;

		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 4px;
		cursor: default;
		border: none;
		border-radius: var(--border-radius-medium);
		background: none;
		padding: 0 var(--menu-item-padding-right) 0 var(--menu-item-padding-left);
		width: 100%;
		min-height: var(--menu-item-height);
		color: var(--color-text-menu-text);
		user-select: none;

		&[role='menuitemradio'],
		&[role='menuitemcheckbox'] {
			--menu-item-padding-left: 4px;
		}

		&:hover:not(.disabled) {
			background: var(--figma-color-bg-brand-hover);
		}

		&.disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}

		.left-group {
			display: flex;
			align-items: center;
			gap: 4px;
		}
	}

	div[popover] {
		--popover-gap-left: 8px;
		--popover-paddding: 8px;

		position-area: x-end span-y-end;
		margin: 0;
		inset-block-start: -8px;
		inset-inline-start: var(--popover-gap-left);
		border: none;
		background: none;
		padding: 0 4px 0 8px;
		overflow: visible;

		.popover-content {
			box-shadow: 0 7px 20px rgb(0 0 0 / 0.12);
			border-radius: var(--border-radius-large);
			background: var(--color-bg-menu);
			padding: var(--popover-paddding);
			color: var(--color-text-menu-text);

			hr {
				margin: 4px 0;
				border: none;
				border-top: 1px solid var(--color-border-menu);
			}
		}
	}

	.hover-helper {
		position: absolute;
		z-index: -1;
		clip-path: polygon(0 32px, 48% 32px, 48px 8px, 100% 0, 100% 100%, 16px 40px);
		inset: 0;
		inset-inline-start: -64px;
		width: 80px;
		height: 100%;
	}

	.icon-placeholder {
		width: 16px;
		height: 16px;
	}

	.empty-state {
		padding: 0 var(--menu-item-padding);
		color: var(--color-text-menu-text-disabled, #999);
		font-style: italic;
	}
</style>
