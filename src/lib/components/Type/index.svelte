<script lang="ts">
	interface Props {
		size?: string;
		weight?: string;
		inverse?: boolean; //this prop uses different letterspacing values for inversed type (light on dark)
		color?: string;
		inline?: boolean;
		class?: string;
		children?: import('svelte').Snippet;
	}

	let {
		size = 'xsmall',
		weight = 'normal',
		inverse = false,
		color = '--figma-color-text',
		inline = false,
		class: className = '',
		children
	}: Props = $props();

	let cssColorVar = $state();

	$effect(() => {
		if (inverse && color === '--figma-color-text') {
			cssColorVar = 'var(--color-text-menu-text)';
		} else {
			cssColorVar = 'var(' + color + ')';
		}
	});
</script>

<div
	class="type {className} {size} {weight}"
	class:inverse
	class:inline
	style="color: {cssColorVar}"
>
	{@render children?.()}
</div>

<style>
	.type {
		font-weight: var(--font-weight-normal);
		font-size: var(--font-size-xsmall);
		line-height: var(--font-line-height);
		font-family: var(--font-stack);
		letter-spacing: var(--font-letter-spacing-pos-xsmall);
	}

	/* sizes */
	.small {
		font-size: var(--font-size-small);
		letter-spacing: var(--font-letter-spacing-pos-small);
	}
	.large {
		font-size: var(--font-size-large);
		line-height: var(--font-line-height-large);
		letter-spacing: var(--font-letter-spacing-pos-large);
	}
	.xlarge {
		font-size: var(--font-size-xlarge);
		line-height: var(--font-line-height-large);
		letter-spacing: var(--font-letter-spacing-pos-xlarge);
	}

	/* weights */
	.medium {
		font-weight: var(--font-weight-medium);
	}
	.bold {
		font-weight: var(--font-weight-bold);
	}

	/* letter spacing adjustments based pos/neg application */
	.inverse {
		letter-spacing: var(--font-letter-spacing-neg-xsmall);
	}
	.inverse.small {
		letter-spacing: var(--font-letter-spacing-neg-small);
	}
	.inverse.large {
		letter-spacing: var(--font-letter-spacing-neg-large);
	}
	.inverse.xlarge {
		letter-spacing: var(--font-letter-spacing-neg-xlarge);
	}

	.inline {
		display: inline-block;
	}
</style>
