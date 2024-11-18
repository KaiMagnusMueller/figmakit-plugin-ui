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

/**
 * Click outside action
 * @param node Element that triggered this action (set by Svelte)
 * @param [ignore] Optional element to ignore, clickOutside is not fired when event.target is equal to the ignored element
 */
export function clickOutside(node: HTMLElement, ignore?: HTMLElement) {
	const handleClick = (event: Event) => {
		const target = event.target as HTMLElement;

		// console.log(target.offsetParent);

		// Depends on the fact that for all modals, target.offsetParent is the modal container
		// So currently we can check relatively easily, if the current target is a modal and cancel the event
		// A more stable approach micht be needed in the future
		if (
			!event.target ||
			(ignore && target === ignore) ||
			target.offsetParent?.classList.contains('popup-container')
		) {
			console.log('clickOutside cancelled');

			return;
		}
		if (node && !node.contains(target) && !event.defaultPrevented) {
			node.dispatchEvent(new CustomEvent('clickOutside'));
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
}

/**
 *
 * @param node The element provided by svelte
 * @param targetElementOrSelector The portal anchor, document.querySelector('#popup-container')
 * @returns Function when the parent is destroyed
 */
export function portal(node: HTMLElement, targetElementOrSelector: Element | string | null) {
	const targetElement =
		typeof targetElementOrSelector == 'string'
			? document.querySelector(targetElementOrSelector)
			: targetElementOrSelector;

	if (targetElement == null) throw new Error('Target element not found/undefined.');

	targetElement.append(node);

	return {
		destroy() {
			node.remove();
		}
	};
}

// this function ensures that the select menu
// fits inside the plugin viewport
// if its too big, it will resize it and enable a scrollbar
// if its off screen it will shift the position
export function resizeAndPosition(node: HTMLElement, parent: HTMLElement): void {
	//set the max height of the menu based on plugin/iframe window
	let maxMenuHeight = window.innerHeight - 16;
	let menuHeight = node.offsetHeight;
	let menuResized = false;

	if (menuHeight > maxMenuHeight) {
		node.style.height = maxMenuHeight + 'px';
		menuResized = true;
	}

	//lets adjust the position of the menu if its cut off from viewport
	let bounding = node.getBoundingClientRect();
	let parentBounding = parent.getBoundingClientRect();

	if (bounding.top < 0) {
		node.style.top = -Math.abs(parentBounding.top - 8) + 'px';
	}
	if (bounding.bottom > (window.innerHeight || document.documentElement.clientHeight)) {
		let minTop = -Math.abs(parentBounding.top - (window.innerHeight - menuHeight - 8));
		let newTop = -Math.abs(bounding.bottom - window.innerHeight + 16);
		if (menuResized) {
			node.style.top = -Math.abs(parentBounding.top - 8) + 'px';
		} else if (newTop > minTop) {
			node.style.top = minTop + 'px';
		} else {
			node.style.top = newTop + 'px';
		}
	}
}

export function blinkEffect(node: HTMLElement, doBlink: boolean): void {
	function handleClick(event: MouseEvent): void {
		if (!doBlink) {
			node.dispatchEvent(new CustomEvent('blinkDone'));
			return;
		}
		const x = 2;
		const interval = 70;

		for (let i = 0; i < x; i++) {
			setTimeout(() => {
				node.classList.toggle('blink');
			}, i * interval);
		}

		setTimeout(() => {
			node.classList.remove('blink');
			fireBlinkEvent();
		}, x * interval);
	}

	function fireBlinkEvent() {
		node.dispatchEvent(new CustomEvent('blinkDone'));
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
