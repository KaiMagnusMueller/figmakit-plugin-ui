<script lang="ts">
	import { Button } from '$lib/index.js';
	import type { Snippet } from 'svelte';
	import Dialog from './Dialog.svelte';

	let {
		id = $bindable(),
		title = 'Dialog modal',
		dialog = $bindable(),
		triggerButton,
		children,
		headerControls,
		...props
	}: {
		id?: string;
		title: string;
		dialog?: HTMLDialogElement;
		triggerButton?: Snippet<[dialog?: HTMLDialogElement]>;
		children: Snippet;
		headerControls?: Snippet;
		[key: string]: any;
	} = $props();
</script>

{#if triggerButton}
	{@render triggerButton(dialog)}
{:else}
	<Button
		onclick={() => {
			dialog?.showModal();
		}}>Open Dialog</Button
	>
{/if}

<Dialog {...props} {title} {id} bind:dialog {headerControls}>
	{@render children()}
</Dialog>
