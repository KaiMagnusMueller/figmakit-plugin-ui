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
		disclosures?: SvelteMap<string, Disclosure>;
		children?: import('svelte').Snippet;
		class?: string;
		multiple?: boolean;
		[key: string]: unknown;
	}

	let {
		disclosures = $bindable(new SvelteMap()),
		multiple = false,
		children,
		class: className = '',
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
