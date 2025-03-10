<script lang="ts">
	import type { Snippet } from 'svelte';
	import { clickOutside } from '$lib/helpers.svelte.js';
	import { IconButton, IconClose } from '$lib/index.js';

	let {
		id = $bindable(),
		title,
		dialog = $bindable(),
		onclose,
		children,
		headerControls,
		...props
	}: {
		id?: string;
		title: string;
		dialog?: HTMLDialogElement;
		onclose?: (e: Event) => void;
		headerControls?: Snippet;
		children: Snippet;
		[key: string]: any;
	} = $props();

	const uid = $props.id();
	id = 'dialog-' + uid;
</script>

<dialog
	{...props}
	{id}
	class={['dialog__modal', 'container--xlarge  elevation--2']}
	bind:this={dialog}
	use:clickOutside
	{onclose}
	onclickOutside={() => {
		if (!dialog) return;
		dialog.close();
	}}
>
	<div class="header__wrapper">
		<h1>{title}</h1>
		<div class="group__end">
			{@render headerControls?.()}
			<IconButton
				icon={IconClose}
				aria-label="Close dialog"
				onclick={() => {
					if (!dialog) return;
					dialog.close();
				}}
			/>
		</div>
	</div>
	<div class="content__wrapper">{@render children()}</div>
</dialog>

<style>
	dialog {
		position: fixed;
		box-shadow: var(--elevation-500-modal-window);
		border: none;
		border-radius: var(--border-radius-large);
		background: var(--figma-color-bg);
		padding: 0;
		min-width: 240px;
		max-width: 400px;
		color: inherit;

		&::backdrop {
			background-color: color-mix(in lch, var(--bronze-60) 24%, transparent);
			/* backdrop-filter: blur(8px); */
			pointer-events: none;
		}
	}

	.header__wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-block-end: 1px solid var(--figma-color-border);
		padding-inline: 16px 8px;
		min-height: 40px;
	}

	.content__wrapper {
		padding: 16px;
	}

	h1 {
		font-weight: var(--font-weight-strong);
		font-size: var(--font-size-xsmall);
		letter-spacing: var(--font-letter-spacing-pos-xsmall);
	}

	.group__end {
		display: flex;
		align-items: center;
	}
</style>
