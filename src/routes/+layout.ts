export const prerender = true;

import type { LayoutLoad } from './$types';

export const load = (async () => {
	return {};
}) satisfies LayoutLoad;
