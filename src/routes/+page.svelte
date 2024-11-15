<script>
	import '$lib/css/global.css';
	import '$lib/css/resets.css';
	import Button from '$lib/components/Button/index.svelte';
	import Section from './components/Section.svelte';
</script>

<svelte:head>
	<title>FigmaKit</title>
</svelte:head>

<h1>Welcome to FigmaKit Plugin UI Svelte</h1>

<p>A component library for Svelte based Figma plugins.</p>

<Section title="Buttons">
	<Button onclick={() => console.log('Button 1 clicked')}>Button 1</Button>
	<Button variant="secondary" onclick={() => console.log('Button 2 clicked')}>Button 2</Button>
	<Button variant="tertiary" onclick={() => console.log('Button 3 clicked')}>Button 3</Button>
	<Button destructive onclick={() => console.log('Button 4 clicked')}>Button 4</Button>
	<Button disabled onclick={() => console.log('Button 5 clicked')}>Button 5</Button>
	<Button theme="ui3" onclick={() => console.log('Button 6 clicked')}>Button 6</Button>
</Section>

<style>
	h1 {
		margin-block: 2rem;
	}

	p {
		margin-block: 1rem;
	}
</style>
