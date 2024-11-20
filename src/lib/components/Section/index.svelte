<script>
	export { className as class };

	let className = '';
</script>

<div class={className}>
	<slot />
</div>

<style>
	div {
		display: flex;
		align-items: center;
		cursor: default;
		padding: 0 calc(var(--size-xxsmall) / 2) 0 var(--size-xxsmall);
		width: 100%;
		height: var(--size-medium);
		color: var(--figma-color-text);
		font-weight: var(--font-weight-bold);
		font-size: var(--font-size-xsmall);
		line-height: var(--font-line-height);
		letter-spacing: var(--font-letter-spacing-pos-xsmall);
		user-select: none;
	}
</style>
