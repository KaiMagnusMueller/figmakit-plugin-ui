<script lang="ts">
	import { Button } from '$lib/index.js';
	import type { Snippet } from 'svelte';
	import DialogElem from './DialogElem.svelte';

	let {
		id = $bindable(),
		title = 'Dialog modal',
		dialog = $bindable(),
		triggerButton,
		children,
		...props
	}: {
		id?: string;
		title: string;
		dialog?: HTMLDialogElement;
		triggerButton?: Snippet<[dialog?: HTMLDialogElement]>;
		children: Snippet;
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
<Button
	onclick={() => {
		dialog?.showModal();
	}}>Open Dialog</Button
>
<DialogElem {...props} {title} bind:id bind:dialog>
	{@render children()}
</DialogElem>
