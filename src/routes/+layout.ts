export const prerender = true;

import type { LayoutLoad } from './$types.ts';

export const load = (async () => {
	return {};
}) satisfies LayoutLoad;
