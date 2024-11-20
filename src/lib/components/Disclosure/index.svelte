<script module lang="ts">
	export type Disclosure = {
		id: string;
		expanded: boolean;
	};
</script>

<script lang="ts">
	import { setContext } from 'svelte';
	import { SvelteMap } from 'svelte/reactivity';

	interface Props {
		class?: string;
		disclosures?: SvelteMap<string, Disclosure>;
		multiple?: boolean;
		children?: import('svelte').Snippet;
		[key: string]: unknown;
	}

	let {
		class: className = '',
		disclosures = $bindable(new SvelteMap()),
		multiple = false,
		children,
		...props
	}: Props = $props();

	let disclosureWrapper = $state();

	function handleDisclosures(id: string, expanded: boolean) {
		if (!multiple) {
			disclosures.forEach((value, key) => {
				if (key !== id) {
					disclosures.delete(key);
				}
			});
		}
		disclosures.set(id, { id, expanded: expanded });
	}

	setContext('disclosure', { disclosures, handleDisclosures });
</script>

<ul {...props} class={className} bind:this={disclosureWrapper}>
	{@render children?.()}
</ul>

<style>
	ul {
		position: relative;
		margin: 0;
		padding: 0;
		width: 100%;
		list-style-type: none;
	}
</style>
