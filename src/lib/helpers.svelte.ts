export function blurOnEvent(node: HTMLElement): void {
	function handleClick(event: MouseEvent): void {
		node.blur();
	}

	$effect(() => {
		// setup goes here
		node.addEventListener('click', handleClick);

		return () => {
			// teardown goes here
			node.removeEventListener('click', handleClick);
		};
	});
}
