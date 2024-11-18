<script lang="ts">
	import { getContext } from 'svelte';
	import { Icon, IconCaretDown, IconCaretRight } from '$lib/index.js';
	import type { Disclosure } from './index.svelte';

	interface Props {
		id?: string;
		title?: string;
		expanded?: boolean;
		section?: boolean;
		children?: import('svelte').Snippet;
		[key: string]: unknown;
	}

	let { disclosures, handleDisclosures } = getContext<{
		disclosures: Map<string, Disclosure>;
		handleDisclosures: (id: string, expanded: boolean) => void;
	}>('disclosure');

	let {
		id = 'fk-' + Math.random().toString(36),
		title = '',
		expanded = $bindable(false),
		section = false,
		children,
		...props
	}: Props = $props();

	if (expanded) {
		disclosures.set(id, { id, expanded });
	}

	$effect(() => {
		expanded = disclosures.get(id)?.expanded || false;
	});
</script>

<li {title} {id} class:expanded>
	<button
		onclick={() => {
			expanded = !expanded;
			handleDisclosures(id, expanded);
		}}
		class="header"
		class:section
	>
		<div class="icon">
			{#if expanded}
				<Icon icon={IconCaretDown} />
			{:else}
				<Icon icon={IconCaretRight} />
			{/if}
		</div>
		<div class="title">{title}</div>
	</button>

	{#if expanded}
		<div class="content">
			{@render children?.()}
		</div>
	{/if}
</li>

<style>
	button {
		appearance: none;
		border: none;
		background: none;
	}

	li {
		display: flex;
		position: relative;
		flex-direction: column;
		margin: 0;
		border-bottom: 1px solid var(--figma-color-border);
		padding: 0;
		width: 100%;
		list-style-type: none;
	}
	li:last-child {
		border-bottom: 1px solid transparent;
	}

	.header {
		display: flex;
		align-items: center;
		height: var(--size-medium);
		color: var(--figma-color-text);
		font-weight: var(--font-weight-normal);
		font-size: var(--font-size-xsmall);
		line-height: var(--line-height);
		letter-spacing: var(--font-letter-spacing-pos-xsmall);
	}
	.header:hover .icon {
		opacity: 0.9;
	}

	.title {
		margin-left: -4px;
		user-select: none;
	}

	.icon {
		opacity: 0.3;
		margin-left: -4px;
	}
	.expanded .icon {
		opacity: 0.8;
	}

	.section {
		font-weight: var(--font-weight-bold);
	}

	.content {
		padding: var(--size-xxsmall) var(--size-xxsmall) var(--size-xxsmall) var(--size-small);
		pointer-events: none;
		color: var(--figma-color-text);
		font-weight: var(--font-weight-normal);
		font-size: var(--font-size-xsmall);
		line-height: var(--line-height);
		letter-spacing: var(--font-letter-spacing-pos-xsmall);
		user-select: none;
	}
</style>
