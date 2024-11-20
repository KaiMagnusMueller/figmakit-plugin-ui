// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	declare namespace svelteHTML {
		interface HTMLAttributes<T> {
			onclickOutside?: (event: CustomEvent) => void;
		}

		interface HTMLAttributes<T> {
			onblinkDone?: (event: MouseEvent) => void;
		}
	}
}

declare module '*.svg?raw' {
	const content: string;
	export default content;
}

declare module '*.svg' {
	const content: SVGElement;
	export default content;
}

export {};
