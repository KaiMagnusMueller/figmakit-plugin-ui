<script lang="ts">
	import type { Snippet } from 'svelte';
	import { clickOutside } from '$lib/helpers.svelte.js';

	let {
		id = $bindable(),
		title,
		dialog = $bindable(),
		children
	}: {
		id?: string;
		title: string;
		dialog?: HTMLDialogElement;
		children: Snippet;
	} = $props();

	const uid = $props.id();
	id = 'dialog-' + uid;
</script>

<dialog
	{id}
	class={['dialog__modal', 'container--xlarge  elevation--2']}
	bind:this={dialog}
	use:clickOutside
	onclickOutside={() => dialog?.close()}
>
	<div class="layout--verticDialogal">
		<h1>{title}</h1>
		{@render children()}
	</div>
</dialog>

<style>
	dialog {
		position: fixed;
		min-width: 280px;
		max-width: 400px;
		color: inherit;

		&::backdrop {
			background-color: color-mix(in lch, var(--bronze-60) 24%, transparent);
			/* backdrop-filter: blur(8px); */
			pointer-events: none;
		}
	}

	[popover] {
		background: inherit;
		color: inherit;
	}

	.popover {
		box-shadow: var(--elevation-500-modal-window);
		border: none;
		border-radius: var(--border-radius-small);
		padding: 0rem;
	}

	.popover__wrapper {
		display: flex;
		flex-direction: column;
		background: var(--figma-color-bg);
		height: 100%;

		.popover__content-wrapper {
			position: relative;
			width: 100%;
			height: 100%;
			overflow-y: scroll;
		}

		.popover__section > header {
			position: sticky;
			top: 0;
		}

		.popover__section {
			position: absolute;
			inset: 0;
		}

		.popover__section-content {
			padding: 0.5rem 0.5rem;
		}
	}
</style>
