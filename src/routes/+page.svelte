<script>
	import { Button } from '$lib/index.js';
</script>

<svelte:head>
	<title>FigmaKit</title>
</svelte:head>

<h1>Welcome to FigmaKit – Plugin UI Svelte</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<section>
	<h2>Button</h2>
	<Button onclick={() => console.log('Button 1 clicked')}>Button 1</Button>
	<Button variant="secondary" onclick={() => console.log('Button 1 clicked')}>Button 1</Button>
	<Button onclick={() => console.log('Button 1 clicked')}>Button 1</Button>
	<Button onclick={() => console.log('Button 1 clicked')}>Button 1</Button>
</section>
