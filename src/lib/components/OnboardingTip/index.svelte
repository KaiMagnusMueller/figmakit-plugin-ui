<script lang="ts">
	import { Icon } from '$lib/index.js';

	interface Props {
		class?: string;
		color?: string;
		icon?: string;
		spin?: boolean;
		children?: import('svelte').Snippet;
	}

	let { spin = false, color, icon = '', class: className = '', children }: Props = $props();
</script>

<div class="onboarding-tip {className}">
	<div class="icon">
		<Icon {icon} {color} {spin} />
	</div>
	<p>
		{@render children?.()}
	</p>
</div>

<style>
	.onboarding-tip {
		display: flex;
		align-items: top;
		padding: 0 var(--size-xsmall) 0 0;
	}

	.icon {
		margin-right: var(--size-xxsmall);
		width: var(--size-medium);
		height: var(--size-medium);
	}

	p {
		margin: 0;
		padding: var(--size-xxsmall) 0 var(--size-xxsmall) 0;
		color: var(--figma-color-text);
		font-weight: var(--font-weight-normal);
		font-size: var(--font-size-xsmall);
		line-height: var(--font-line-height);
		letter-spacing: var(--font-letter-spacing-pos-xsmall);
	}
</style>
