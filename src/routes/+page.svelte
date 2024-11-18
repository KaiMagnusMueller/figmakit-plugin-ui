<script lang="ts">
	// Imports for showcase
	import Section from './components/Section.svelte';
	import LayoutContainer from './components/LayoutContainer.svelte';

	// Global styles
	import '$lib/css/global.css';
	import '$lib/css/resets.css';

	// Imports for demo components
	import {
		Button,
		IconButton,
		IconNodeBooleanOperation,
		IconInstance,
		Checkbox,
		Switch,
		Radio,
		Input,
		Textarea,
		SelectMenu
	} from '$lib/index.js';

	import type { Option, Group } from '$lib/components/SelectMenu/index.svelte';

	let buttonCounter = $state(0);
	let checked = $state(true);
	let radioValue = $state('a');
	let optGroups: Group[] = [
		{
			label: 'Group 1',
			items: [
				{ value: 'a', label: 'Option A' },
				{ value: 'b', label: 'Option B' },
				{ value: 'c', label: 'Option C' },
				{ value: 'd', label: 'Option D' }
			]
		},
		{
			label: 'Group 2',
			items: [
				{ value: 'e', label: 'Option E' },
				{ value: 'f', label: 'Option F' },
				{ value: 'g', label: 'Option G' },
				{ value: 'h', label: 'Option H' }
			]
		}
	];

	let selectedOpt1: Option[] = $state([]);
	let selectedOpt2: Option[] = $state([]);
</script>

<svelte:head>
	<title>FigmaKit</title>
</svelte:head>

<div class="prose">
	<h1>Welcome to FigmaKit Plugin UI Svelte</h1>

	<p>A component library for Svelte based Figma plugins.</p>
</div>

<LayoutContainer>
	<Section title="Buttons">
		<Button
			onclick={(e) => {
				console.log('Button 1 clicked'), buttonCounter++;
			}}>Button 1 clicked {buttonCounter} times</Button
		>
		<Button variant="secondary" onclick={() => console.log('Button 2 clicked')}>Button 2</Button
		>
		<Button variant="tertiary" onclick={() => console.log('Button 3 clicked')}>Button 3</Button>
		<Button destructive onclick={() => console.log('Button 4 clicked')}>Button 4</Button>
		<Button disabled onclick={() => console.log('Button 5 clicked')}>Button 5</Button>
		<Button disabled destructive onclick={() => console.log('Button 6 clicked')}
			>Button 6</Button
		>
		<Button icon={IconNodeBooleanOperation} onclick={() => console.log('Button 7 clicked')}
			>Button 7</Button
		>
		<Button
			icon={IconNodeBooleanOperation}
			variant="secondary"
			onclick={() => console.log('Button 8 clicked')}>Button 8</Button
		>

		<Button rounded onclick={() => console.log('Button 9 clicked')}>Button 9</Button>
	</Section>

	<Section title="Icon Buttons">
		<IconButton
			icon={IconNodeBooleanOperation}
			onclick={() => console.log('Icon Button 1 clicked')}
		/>
		<IconButton icon={IconInstance} onclick={() => console.log('Icon Button 2 clicked')} />
	</Section>

	<Section title="Checkbox">
		<Checkbox
			onchange={(e) => console.log('Checkbox 1 clicked', e.currentTarget as HTMLInputElement)}
			>Checkbox 1</Checkbox
		>
		<Checkbox onchange={() => console.log('Checkbox 2 clicked')} disabled>Checkbox 2</Checkbox>
		<Checkbox
			onchange={(e) => {
				checked = (e.currentTarget as HTMLInputElement).checked;
				console.log('Checkbox 3 clicked', (e.currentTarget as HTMLInputElement).checked);
			}}
			{checked}>Checkbox 3 is {checked}</Checkbox
		>
		<Checkbox onchange={() => console.log('Checkbox 4 clicked')} checked disabled
			>Checkbox 4</Checkbox
		>
	</Section>
	<Section title="Switch">
		<Switch
			onchange={(e) => {
				console.log('Switch 1 clicked', e.currentTarget as HTMLInputElement);
			}}>Switch 1</Switch
		><Switch
			disabled
			onchange={() => {
				console.log('Switch 2 clicked');
			}}>Switch 2</Switch
		>
		<Switch
			checked
			onchange={() => {
				console.log('Switch 3 clicked');
			}}>Switch 3</Switch
		>
		<Switch
			checked
			disabled
			onchange={() => {
				console.log('Switch 4 clicked');
			}}>Switch 4</Switch
		>
	</Section>

	<Section title="Radio">
		<Radio
			bind:group={radioValue}
			value="a"
			onchange={(e) => {
				console.log('Radio 1 clicked', e.currentTarget as HTMLInputElement);
			}}>Radio 1</Radio
		>
		<Radio
			bind:group={radioValue}
			value="b"
			disabled
			onchange={(e) => {
				console.log('Radio 2 clicked', e.currentTarget as HTMLInputElement);
			}}>Radio 2</Radio
		>
		<Radio
			bind:group={radioValue}
			value="c"
			checked
			onchange={(e) => {
				console.log('Radio 3 clicked', e.currentTarget as HTMLInputElement);
			}}>Radio 3</Radio
		>
		<Radio
			bind:group={radioValue}
			value="d"
			disabled
			onchange={(e) => {
				console.log('Radio 3 clicked', e.currentTarget as HTMLInputElement);
			}}>Radio 4</Radio
		>
		<p>Selected value: {radioValue}</p>
	</Section>

	<Section title="Input">
		<Input value="Input with value"></Input>
		<Input placeholder="Custom placeholder…"></Input>
		<Input value="Disabled with value" disabled />
		<Input placeholder="Input with icon" icon={IconNodeBooleanOperation} />

		<Input borders={false} value="No border"></Input>
		<Input borders={false} placeholder="No border"></Input>
	</Section>

	<Section title="Textarea">
		<Textarea value="Textarea with value"></Textarea>
		<Textarea placeholder="Custom placeholder…"></Textarea>
		<Textarea value="Disabled with value" disabled></Textarea>

		<Textarea value="Tall textarea with more rows for longer descriptions" rows={5}></Textarea>
		<Textarea disabled placeholder="This textarea is disabled"></Textarea>
	</Section>

	<Section title="Select Menu">
		<SelectMenu
			{optGroups}
			bind:value={selectedOpt1}
			onchange={(e) => {
				// console.log('Option selected;', e[0].label);
			}}
			placeholder="Single select menu"
		></SelectMenu>

		<p>Selected options: {selectedOpt1.map((o) => o.label).join(', ')}</p>

		<SelectMenu
			placeholder="Multi select menu"
			{optGroups}
			multiselect
			onchange={(e) => {
				selectedOpt2 = e;
				// console.log('Options selected:', e.map((o) => o.label).join(', '));
			}}
		></SelectMenu>
		<p>Selected options: {selectedOpt2.map((o) => o.label).join(', ')}</p>

		<SelectMenu {optGroups} blink placeholder="Blinking select menu"></SelectMenu>
	</Section>
</LayoutContainer>

<style>
	.prose h1 {
		margin-block: 2rem;
	}

	.prose p {
		margin-block: 1rem;
		font-size: 1rem;
	}
</style>
