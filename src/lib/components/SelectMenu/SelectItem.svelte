<script lang="ts">
	import { blinkEffect } from '$lib/helpers.svelte.js';

	interface Props {
		onmouseenter?: (e: MouseEvent) => void;
		onclick?: (e: MouseEvent) => void;
		itemId: any;
		selected?: boolean;
		rounded?: boolean;
		disabled?: boolean;
		class?: string;
		blink?: boolean;
		children?: import('svelte').Snippet;
	}

	let {
		onmouseenter,
		onclick,
		itemId,
		selected = $bindable(false),
		rounded = false,
		disabled = false,
		class: className = '',
		blink = false,
		children
	}: Props = $props();
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<li
	data-id={itemId}
	tabindex={itemId + 1}
	class:highlight={selected}
	class={className}
	class:rounded
	class:disabled
	{onmouseenter}
	onblinkDone={(e) => {
		onclick?.(e);
	}}
	use:blinkEffect={blink}
>
	<div class="icon" class:selected></div>
	<div class="label">{@render children?.()}</div>
</li>

<style>
	li {
		display: flex;
		align-items: center;
		transition-duration: 30ms;
		transition-property: background-color;
		cursor: default;
		outline: none;
		padding: 0px var(--size-xsmall) 0px var(--size-xxsmall);
		height: var(--size-small);
		color: var(--color-text-menu-text);
		font-weight: var(--font-weight-normal);
		font-size: var(--font-size-small);
		line-height: var(--font-line-height);
		font-family: var(--font-stack);
		letter-spacing: var(--font-letter-spacing-neg-xsmall);
		user-select: none;
	}

	li.disabled {
		display: none;
		pointer-events: none;
		color: var(--figma-color-text-disabled);
	}

	.label {
		width: fit-content;
		overflow-x: hidden;
		pointer-events: none;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.highlight,
	li:hover,
	li:focus {
		background-color: var(--figma-color-bg-brand);
	}

	.icon {
		opacity: 0;
		margin-right: var(--size-xxsmall);
		background-image: url('data:image/svg+xml;utf8,%3Csvg%20fill%3D%22none%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20width%3D%2216%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20clip-rule%3D%22evenodd%22%20d%3D%22m13.2069%205.20724-5.50002%205.49996-.70711.7072-.70711-.7072-3-2.99996%201.41422-1.41421%202.29289%202.29289%204.79293-4.79289z%22%20fill%3D%22%23fff%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E');
		background-position: center center;
		background-repeat: no-repeat;
		width: var(--size-xsmall);
		height: var(--size-xsmall);
		pointer-events: none;
	}
	.icon.selected {
		opacity: 1;
	}

	.blink,
	.blink:hover {
		background-color: transparent;
	}

	.rounded {
		border-radius: 3px;
		padding: 0 var(--size-xsmall) 0 var(--size-xxxsmall);
	}
</style>
