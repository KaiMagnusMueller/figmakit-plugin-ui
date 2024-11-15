<script lang="ts">
	// Imports for showcase
	import Section from './components/Section.svelte';
	import LayoutContainer from './components/LayoutContainer.svelte';

	// Global styles
	import '$lib/css/global.css';
	import '$lib/css/resets.css';

	// Imports for demo components
	import { Button, IconButton, IconNodeBooleanOperation, IconInstance } from '$lib/index.js';
</script>

<svelte:head>
	<title>FigmaKit</title>
</svelte:head>

<h1>Welcome to FigmaKit Plugin UI Svelte</h1>

<p>A component library for Svelte based Figma plugins.</p>

<LayoutContainer>
	<Section title="Buttons">
		<Button onclick={() => console.log('Button 1 clicked')}>Button 1</Button>
		<Button variant="secondary" onclick={() => console.log('Button 2 clicked')}>Button 2</Button
		>
		<Button variant="tertiary" onclick={() => console.log('Button 3 clicked')}>Button 3</Button>
		<Button destructive onclick={() => console.log('Button 4 clicked')}>Button 4</Button>
		<Button disabled onclick={() => console.log('Button 5 clicked')}>Button 5</Button>
		<Button disabled destructive onclick={() => console.log('Button 5 clicked')}
			>Button 5</Button
		>
		<Button icon={IconNodeBooleanOperation} onclick={() => console.log('Button 1 clicked')}
			>Button 1</Button
		>
		<Button
			icon={IconNodeBooleanOperation}
			variant="secondary"
			onclick={() => console.log('Button 2 clicked')}>Button 2</Button
		>

		<Button rounded onclick={() => console.log('Button 6 clicked')}>Button 6</Button>
	</Section>

	<Section title="Icon Buttons">
		<IconButton
			icon={IconNodeBooleanOperation}
			onclick={() => console.log('Icon Button 1 clicked')}
		/>
		<IconButton icon={IconInstance} onclick={() => console.log('Icon Button 2 clicked')} />
	</Section>
</LayoutContainer>

<style>
	h1 {
		margin-block: 2rem;
	}

	p {
		margin-block: 1rem;
	}
</style>
