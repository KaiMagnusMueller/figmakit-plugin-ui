<script lang="ts">
	import type { MenuGroup, MenuOption, SelectableMenuOption } from './types.ts';
	import { type Snippet } from 'svelte';
	import {
		IconCheck,
		Icon,
		IconChevronRight,
		ToggleButton,
		IconChevronDown
	} from '$lib/index.js';

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
			hidePopovers('', true);
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

	function hidePopovers(exceptId?: string = '', includeContainer?: boolean = false) {
		menuContainerElem.querySelectorAll('div[popover]').forEach((popover) => {
			if (
				popover.id !== exceptId &&
				(popover.id !== menuContainerAnchor || includeContainer)
			) {
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
			<Icon icon={IconChevronDown}></Icon>
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
		onmouseleave={() => hidePopovers(menuContainerAnchor)}
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
	<div class="menu-group" class:rounded role="group" aria-label={group.name}>
		{#if group.children}
			{#each group.children as option}
				{@render menuElement(option, group, parentAnchor, hasSelectableOptions)}
			{/each}
		{:else}
			<p class="menu-empty">No options in this group</p>
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
				hidePopovers(anchorName);
				document.getElementById(anchorName)?.showPopover();
			}}
			aria-haspopup="true"
		>
			<div class="menu-item-content">
				<span class="left-group">
					{#if hasSelectableOptions}
						<div class="icon-placeholder" aria-hidden="true"></div>
					{/if}
					<span>{option.label}</span>
				</span>
				<Icon icon={IconChevronRight} size={16} aria-hidden="true" />
			</div>
		</button>
		{@render popoverContainer([option], anchorName)}
	{:else}
		<button
			class="menu-item"
			class:disabled={option.disabled}
			onclick={() => handleOptionClick(option, group)}
			onmouseenter={() => hidePopovers(parentAnchor || '')}
			role={group.mode === 'single'
				? 'menuitemradio'
				: group.mode === 'multi'
					? 'menuitemcheckbox'
					: 'menuitem'}
			disabled={option.disabled}
		>
			<div class="menu-item-content">
				<span class="left-group">
					{#if option.selected}
						<Icon icon={IconCheck} size={16} aria-hidden="true" />
					{:else if hasSelectableOptions}
						<div class="icon-placeholder" aria-hidden="true"></div>
					{/if}
					<span>{option.label}</span>
				</span>
			</div>
		</button>
	{/if}
{/snippet}

<style lang="scss">
	.menu-group {
		border: none;
		padding-block: var(--popover-paddding);
		min-width: 180px;
	}

	.menu-item {
		--menu-item-padding-left: 8px;
		--menu-item-padding-right: 0;
		--menu-item-height: 24px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		cursor: default;
		border: none;
		background: none;

		width: 100%;
		color: var(--color-text-menu-text);
		user-select: none;

		&[role='menuitemradio'],
		&[role='menuitemcheckbox'] {
			--menu-item-padding-left: 4px;
		}

		&:hover:not(.disabled) {
			.menu-item-content {
				background: var(--figma-color-bg-brand-hover);
			}
		}

		&.disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}
	}

	.menu-item-content {
		--color-icon: var(--color-icon-menu);
		--color-icon-secondary: var(--figma-color-icon-secondary);
		--color-icon-tertiary: var(--figma-color-icon-tertiary);

		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 4px;
		margin: 0 var(--popover-paddding);
		border-radius: var(--border-radius-medium);
		padding: 0 var(--menu-item-padding-right) 0 var(--menu-item-padding-left);
		width: 100%;
		min-height: var(--menu-item-height);
	}

	.menu-empty {
		padding: 0 var(--menu-item-padding);
		color: var(--color-text-menu-text-disabled, #999);
		font-style: italic;
	}

	.left-group {
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.icon-placeholder {
		width: 16px;
		height: 16px;
	}

	.menu-container {
		--popover-gap-left: 4px;
		--popover-paddding: 8px;
		outline: none;

		& > div[popover] {
			inset-inline-start: 0;
		}

		& > button {
			--button-height: 24px;
			--border-width: 1px;

			display: flex;
			position: relative;
			flex-shrink: 0;
			justify-content: center;
			align-items: center;

			outline: var(--border-width) solid transparent;
			outline-offset: calc(var(--border-width) * -1);
			border: 0;
			border-radius: var(--border-radius-medium);
			background-color: transparent;
			padding: 0 8px;
			min-width: var(--button-height);
			min-height: var(--button-height);
			color: var(--figma-color-text);
			font-weight: var(--font-weight-default);
			line-height: 16px;
			user-select: none;

			:global(&:has(svg)) {
				padding: 0;
			}

			&:focus-visible {
				outline-color: var(--figma-color-border-selected);
			}

			&:hover {
				background-color: var(--figma-color-bg-hover);
			}

			&:active {
				background-color: var(--figma-color-bg-pressed);
			}

			/* Ugly but elegant from a certain point of view */
			&:has(+ div[popover]:popover-open) {
				--color-icon: var(--figma-color-icon-selected);
				--color-icon-secondary: var(--figma-color-icon-selected-secondary);
				--color-icon-tertiary: var(--figma-color-icon-selected-tertiary);

				background-color: var(--figma-color-bg-selected);
				color: var(--figma-color-text-onselected);

				&:hover {
					background-color: var(--figma-color-bg-selected-secondary);
				}

				&:active {
					background-color: var(--figma-color-bg-selected-pressed);
				}
			}

			&:disabled {
				color: var(--figma-color-text-disabled);
			}
		}
	}

	div[popover] {
		position-area: x-end span-y-end;
		margin: 0;
		inset-block-start: -8px;
		border: none;
		background: none;
		padding-inline: 4px var(--popover-gap-left);
		padding-block: 0;
		overflow: visible;

		.popover-content {
			box-shadow: 0 7px 20px rgb(0 0 0 / 0.12);
			border-radius: var(--border-radius-large);
			background: var(--color-bg-menu);
			padding: 0;
			color: var(--color-text-menu-text);
		}

		hr {
			margin: 0 var(--popover-paddding);
			border: none;
			border-top: 1px solid var(--color-border-menu);
		}
	}

	.hover-helper {
		position: absolute;
		z-index: -1;
		clip-path: polygon(0px 32px, 26px 32px, 32px 26px, 32px 8px, 100% 0, 100% 100%, 8px 64px);
		inset: 0;
		inset-inline-start: -32px;
		width: 48px;
		height: 100%;
	}
</style>
