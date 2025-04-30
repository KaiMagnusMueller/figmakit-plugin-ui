<script lang="ts">
	import type { MenuGroup, MenuOption, SelectableMenuOption, SelectedValue } from './types.ts';
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
		id?: string;
		name?: string;
		disabled?: boolean;
		required?: boolean;
		onchange?: (value: Value) => void;
		onclick?: (action: string, parameters: string) => void;
		onmouseenter?: (event: MouseEvent) => void;
		ontoggle?: ({ newState }: { newState: 'open' | 'closed' }) => void;
		blink?: boolean;
		triggerType?: 'button' | 'select';
		icon?: string;
		rounded?: boolean;
		style?: string;
		triggerStyle?: string;
		children?: Snippet;
		showSelectedValues?: boolean;
		[propName: string]: any;
	}

	let {
		groups = [],
		value = $bindable(convertToValueStrings(collectSelectedOptions(groups)) || {}),
		id,
		name,
		disabled = false,
		required = false,
		onchange,
		onclick,
		icon,
		triggerType = 'button',
		onmouseenter,
		ontoggle,
		rounded = false,
		children,
		style,
		triggerStyle,
		showSelectedValues = false,
		...props
	}: Props = $props();

	// State
	let dropdownWrapperElem: HTMLElement;
	let menuContainerAnchor = `--fk-popover-${crypto.getRandomValues(new Uint32Array(1))[0]}`;

	// Reactive groups
	let internalGroups: MenuGroup[] = $state(groups);
	let selectedValue: SelectedValue = $state(collectSelectedOptions(internalGroups));

	let _disabled = $state(
		disabled || internalGroups.every((group) => group.children.length === 0)
	);

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
	function collectSelectedOptions(_groups: MenuGroup[]): SelectedValue {
		return _groups.reduce((result, group) => {
			if (!group?.children) return result;

			const selectedOptions = group.children
				.filter(
					(option) => isMenuOption(option) && option.selected && isValueOption(option)
				)
				.map((option) => ({
					label: option.label,
					value: (option as SelectableMenuOption).value
				}));

			if (selectedOptions.length > 0) {
				result[group.name] = group.mode === 'single' ? selectedOptions[0] : selectedOptions;
			}

			group.children.filter(isMenuGroup).forEach((childGroup) => {
				Object.assign(result, collectSelectedOptions([childGroup]));
			});

			return result;
		}, {} as SelectedValue);
	}

	function convertToValueStrings(selected: SelectedValue): Value {
		return Object.entries(selected).reduce((acc, [key, value]) => {
			if (Array.isArray(value)) {
				acc[key] = value.map((opt) => opt.value);
			} else if (value) {
				acc[key] = value.value;
			}
			return acc;
		}, {} as Value);
	}

	function handleOptionClick(option: MenuOption, group: MenuGroup) {
		if ('action' in option) {
			onclick?.(option.action, option?.parameters);
			hidePopovers('', true);
			return;
		}

		if (group.mode === 'single') {
			group.children?.forEach((child) => {
				if ('selected' in child) child.selected = false;
			});
			option.selected = true;
			hidePopovers('', true);
		} else if (group.mode === 'multi') {
			option.selected = !option.selected;
		}

		selectedValue = collectSelectedOptions(internalGroups);
		value = convertToValueStrings(selectedValue);
		onchange?.(value);
	}

	function hidePopovers(exceptId: string = '', includeContainer: boolean = false) {
		dropdownWrapperElem.querySelectorAll('div[popover]').forEach((popover) => {
			if (
				popover.id !== exceptId &&
				(popover.id !== menuContainerAnchor || includeContainer)
			) {
				(popover as HTMLElement).hidePopover();
			}
		});
	}
</script>

<!-- NOTE: Be careful when using MultiMenu in forms. Use only a single group with mode:"single", multiple selected options will not be submitted. -->
<select {name} {id} {required} disabled={_disabled} hidden>
	{#if Object.values(value).flat()[0]}
		<option value={Object.values(value).flat()[0]}>{Object.values(value).flat()[0]}</option>
	{/if}
</select>

<div class="dropdowm__wrapper" bind:this={dropdownWrapperElem} {style}>
	<button
		type="button"
		disabled={_disabled}
		{...props}
		class={['dropdown__trigger', triggerType === 'button' ? 'button' : 'select']}
		popovertarget={menuContainerAnchor}
		style={`anchor-name: ${menuContainerAnchor}; ${triggerStyle}`}
		aria-haspopup="true"
	>
		{#if showSelectedValues && Object.values(selectedValue).flat().length > 0}
			<span class="selected-values-wrapper">
				<span class="selected-values line-clamp">
					{#each Object.values(selectedValue).flat().slice(0, 4) as opt, i}
						{#if i > 0}
							<span class="separator">, </span>
						{/if}
						<span class="value">
							{opt.label}
						</span>
					{/each}
				</span>
				{#if Object.values(selectedValue).flat().length > 4}
					<span class="more-values"
						>(+{Object.values(selectedValue).flat().length - 4})</span
					>
				{/if}
			</span>
		{:else if children}
			<span>{@render children?.()}</span>
		{/if}
		<Icon icon={icon || IconChevronDown}></Icon>
	</button>

	{#if internalGroups.some((group) => group.children.length > 0)}
		{@render popoverContainer(internalGroups, menuContainerAnchor)}
	{/if}
</div>

{#snippet popoverContainer(_groups: MenuGroup[], anchorName?: string)}
	{@const hasSelectableOptions = _groups.some(
		(elem) => elem.mode === 'single' || elem.mode === 'multi'
	)}
	{@const isMainContainer = anchorName === menuContainerAnchor}
	<div
		role="menu"
		class="dropdown__flyout"
		tabindex="0"
		popover=""
		id={anchorName}
		style={`position-anchor: ${anchorName};`}
		onmouseleave={() => hidePopovers(menuContainerAnchor)}
		aria-orientation="vertical"
		ontoggle={(e) => {
			if (isMainContainer && ontoggle) {
				const newState = e.newState === 'open' ? 'open' : 'closed';
				ontoggle({ newState });
			}
		}}
	>
		<div class="dropdown__flyout-content">
			{#each _groups as group, i}
				{#if group.children.length > 0}
					{#if i > 0 && _groups[i - 1].children.length > 0}
						<hr />
					{/if}
					{@render multiMenuGroup(group, anchorName, hasSelectableOptions)}
				{/if}
			{/each}
		</div>
		<div class="hover-helper" aria-hidden="true"></div>
	</div>
{/snippet}

{#snippet multiMenuGroup(group: MenuGroup, parentAnchor?: string, hasSelectableOptions?: boolean)}
	<div class="flyout__group" class:rounded role="group" aria-label={group.name}>
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
			type="button"
			class="group__item"
			popovertarget={anchorName}
			style={`anchor-name: ${anchorName};`}
			onmouseenter={() => {
				hidePopovers(anchorName);
				document.getElementById(anchorName)?.showPopover();
			}}
			disabled={option.disabled || option.children.length === 0}
			aria-haspopup="true"
		>
			<div class="group__item-content">
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
			type="button"
			class="group__item"
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
			<div class="group__item-content">
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

<style>
	.flyout__group {
		border: none;
		padding-block: var(--popover-paddding);
		min-width: 180px;
	}

	.group__item {
		--group__item-padding-left: 8px;
		--group__item-padding-right: 0;
		--group__item-height: 24px;
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
			--group__item-padding-left: 4px;
		}

		&:hover:not(.disabled) {
			.group__item-content {
				background: var(--figma-color-bg-brand-hover);
			}
		}

		&.disabled,
		&:disabled {
			color: var(--color-text-menu-disabled);
			--color-icon: var(--figma-color-icon-disabled);
			cursor: not-allowed;
			pointer-events: none;

			.group__item-content {
				--color-icon: var(--color-text-menu-disabled);
			}
		}
	}

	.group__item-content {
		--color-icon: var(--color-icon-menu);
		--color-icon-secondary: var(--figma-color-icon-secondary);
		--color-icon-tertiary: var(--figma-color-icon-tertiary);

		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 4px;
		margin: 0 var(--popover-paddding);
		border-radius: var(--border-radius-medium);
		padding: 0 var(--group__item-padding-right) 0 var(--group__item-padding-left);
		width: 100%;
		min-height: var(--group__item-height);
		font-size: var(--font-size-xsmall);
	}

	.menu-empty {
		padding: 0 var(--group__item-padding);
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

	.dropdowm__wrapper {
		--popover-gap-left: 4px;
		--popover-paddding: 8px;
		display: contents;
		outline: none;

		& > div[popover] {
			inset-inline-start: 0;
		}
	}

	.dropdown__trigger {
		--button-height: 24px;
		--border-width: 1px;

		display: flex;
		position: relative;
		flex-shrink: 0;
		justify-content: center;
		align-items: center;
		font-size: var(--font-size-xsmall);

		&.button {
			outline: var(--border-width) solid transparent;
			outline-offset: calc(var(--border-width) * -1);
			border: 0;
			border-radius: var(--border-radius-medium);
			background-color: transparent;

			min-width: var(--button-height);
			min-height: var(--button-height);
			color: var(--figma-color-text);
			font-weight: var(--font-weight-default);
			line-height: 16px;
			user-select: none;
		}

		&.select {
			display: flex;
			flex-grow: 1;
			justify-content: space-between;
			outline: 1px solid var(--figma-color-border);
			outline-offset: -1px;
			border: none;
			border-radius: var(--border-radius-medium);
			background-color: var(--figma-color-bg);
			min-width: var(--button-height);
			min-height: var(--button-height);
			color: var(--figma-color-text);
			font-weight: var(--font-weight-normal);
			font-size: var(--font-size-xsmall);
			line-height: var(--font-line-height);
			letter-spacing: var(--font-letter-spacing-neg-xsmall);

			.more-values {
				color: var(--figma-color-text-secondary);
			}

			&:hover {
				background-image: none;
				color: var(--figma-color-text-hover);
			}
		}

		:global(:has(svg)) {
			padding: 0;
		}

		&:has(> span) {
			padding-inline: 8px 0;
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
		&:has(+ div[popover]:popover-open):not(.select) {
			--color-icon: var(--figma-color-icon-selected);
			--color-icon-secondary: var(--figma-color-icon-selected-secondary);
			--color-icon-tertiary: var(--figma-color-icon-selected-tertiary);

			background-color: var(--figma-color-bg-selected);
			color: var(--figma-color-text-selected);

			&:hover {
				background-color: var(--figma-color-bg-selected-secondary);
			}

			&:active {
				background-color: var(--figma-color-bg-selected-pressed);
			}

			.more-values {
				color: var(--figma-color-text-selected-secondary);
			}
		}

		&:disabled {
			pointer-events: none;
			--color-icon: var(--figma-color-icon-disabled);
			color: var(--figma-color-text-disabled);
		}

		span {
			padding-block-start: 1px;
		}

		.more-values {
			color: var(--figma-color-text-secondary);
		}
	}

	.selected-values-wrapper {
		display: flex;
		flex-wrap: nowrap;
		gap: 4px;
	}

	.selected-values {
		text-align: initial;
	}

	.value {
		display: inline;
		word-break: break-all;
	}

	div[popover] {
		position: relative;
		position-area: right span-bottom;
		position-try: flip-block, flip-inline;
		margin: 0;
		inset: auto;
		inset-block-start: -8px;
		border: none;
		background: none;
		padding-inline: 4px var(--popover-gap-left);
		padding-block: 0;
		overflow: visible;

		.dropdown__flyout-content {
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
