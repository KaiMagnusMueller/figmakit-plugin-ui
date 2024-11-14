<script>
	import '$lib/css/global.css';
	import Button from '$lib/components/Button/index.svelte';
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
	<Button variant="secondary" onclick={() => console.log('Button 2 clicked')}>Button 2</Button>
	<Button variant="tertiary" onclick={() => console.log('Button 3 clicked')}>Button 3</Button>
	<Button destructive onclick={() => console.log('Button 4 clicked')}>Button 4</Button>
	<Button disabled onclick={() => console.log('Button 5 clicked')}>Button 5</Button>
	<Button rounded onclick={() => console.log('Button 6 clicked')}>Button 6</Button>
</section>
