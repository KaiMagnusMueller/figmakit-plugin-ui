<script>
	export let label = false;
</script>

{#if label === true}
	<li class="label"><slot /></li>
{:else}
	<li class="divider"></li>
{/if}

<style>
	.label {
		display: flex;
		align-items: center;
		margin-top: var(--size-xxsmall);
		padding: 0 var(--size-xxsmall) 0 var(--size-medium);
		height: var(--size-small);
		color: var(--color-text-menu-secondary);
		font-weight: var(--font-weight-normal);
		font-size: var(--font-size-small);
		line-height: var(--font-line-height);
		letter-spacing: var(--font-letter-spacing-neg-small);
	}
	.label:first-child {
		margin-top: 0;
		border-top: none;
	}

	.divider {
		display: block;
		margin: 8px 0 7px 0;
		background-color: var(--colo-border-menu);
		height: 1px;
	}
</style>
