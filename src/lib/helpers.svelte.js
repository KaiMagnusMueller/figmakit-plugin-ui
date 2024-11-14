export function preventDefault(fn) {
    return function (event) {
        event.preventDefault();
        fn.call(this, event);
    };
}


/** Blurs the node when it is clicked */
/**
 * @type {import("svelte/action").Action}
 * @param {HTMLElement} node 
 * @returns {() => void}
 */
export function blurOnEvent(node) {

    function handleClick(event) {
        node.blur();
    }

    $effect(() => {
        // setup goes here
        node.addEventListener('click', handleClick)

        return () => {
            // teardown goes here
            node.removeEventListener('click', handleClick)
        };
    });
}