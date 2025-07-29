<script lang="ts">
	// Imports for showcase
	import Section from './components/Section.svelte';
	import LayoutContainer from './components/LayoutContainer.svelte';

	// Global styles
	import '$lib/css/global.css';
	import '$lib/css/resets.css';
	import '$lib/css/figma-styles-for-testing.css';

	// Imports for demo components
	import {
		Button,
		IconButton,
		Checkbox,
		Switch,
		Radio,
		Input,
		Textarea,
		Disclosure,
		DisclosureItem,
		OnboardingTip,
		Label,
		Type,
		Icon,
		MultiMenu,
		ToggleButton,
		Dialog,
		IconAdjust
	} from '$lib/index.js';

	import {
		menuGroups,
		singleMenuGroup,
		emptyMenuGroups,
		emptyMenuGroupsMini,
		fileList,
		teamList
	} from './example-data.js';

	let buttonCounter = $state(0);
	let checked = $state(true);
	let radioValue = $state('a');
	let toggleBtnChecked = $state(false);
	let toggleBtnCheckedCounter = $state(0);
	let exampleDialog: HTMLDialogElement | undefined = $state();
</script>

<svelte:head>
	<title>FigmaKit</title>
</svelte:head>

<section class="hero wrapper prose">
	<div class="content">
		<div class="inner-wrapper">
			<h1>Welcome to FigmaKit Plugin UI Svelte</h1>
			<p>A component library for Svelte based Figma plugins.</p>
		</div>
	</div>
</section>

<section class="components wrapper">
	<div class="content">
		<LayoutContainer>
			<Section title="Buttons">
				<Button size="large" onclick={() => console.log('Button 2 clicked')}
					>Primary Large</Button
				>
				<Button
					variant="secondary"
					size="large"
					onclick={() => console.log('Button 2 clicked')}>Secondary Large</Button
				>

				<Button
					onclick={(e) => {
						console.log('Button 1 clicked'), buttonCounter++;
					}}>Button 1 clicked {buttonCounter} times</Button
				>
				<Button variant="secondary" onclick={() => console.log('Button 2 clicked')}
					>Button 2</Button
				>
				<Button variant="tertiary" onclick={() => console.log('Button 3 clicked')}
					>Button 3</Button
				>
				<Button destructive onclick={() => console.log('Button 4 clicked')}
					>Danger button</Button
				>
				<Button disabled onclick={() => console.log('Button 5 clicked')}>Button 5</Button>
				<Button disabled destructive onclick={() => console.log('Button 6 clicked')}
					>Button 6</Button
				>
				<Button onclick={() => console.log('Button 7 clicked')}>Button 7</Button>
				<Button variant="secondary" onclick={() => console.log('Button 8 clicked')}
					>Button 8</Button
				>
				<Button onclick={() => console.log('Button 9 clicked')}>Button 9</Button>
			</Section>
			<Section title="Icon Buttons">
				<IconButton
					icon={IconAdjust}
					onclick={() => console.log('Icon Button 1 clicked')}
				/>
				<IconButton
					icon={IconAdjust}
					onclick={() => console.log('Icon Button 2 clicked')}
				/>
			</Section>

			<Section title="Checkbox">
				<Checkbox
					onchange={(e) =>
						console.log('Checkbox 1 clicked', e.currentTarget as HTMLInputElement)}
					>Checkbox 1</Checkbox
				>
				<Checkbox onchange={() => console.log('Checkbox 2 clicked')} disabled
					>Checkbox 2</Checkbox
				>
				<Checkbox
					onchange={(e) => {
						checked = (e.currentTarget as HTMLInputElement).checked;
						console.log(
							'Checkbox 3 clicked',
							(e.currentTarget as HTMLInputElement).checked
						);
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
			<Section title="Input" style="grid-column: 1/-1">
				<Input label="Input" value="Input with value"></Input>
				<Input label="Input" placeholder="Custom placeholder…" autofocus={true}></Input>
				<Input label="Input label hidden" showLabel={false} placeholder="Label hidden…"
				></Input>
				<Input label="Input" value="Disabled with value" disabled />
				<Input label="Input" placeholder="Input with icon" icon={IconAdjust} />
				<Input label="Input without border" borders={false} value="No border"></Input>
				<Input label="Input without border" borders={false} placeholder="No border"></Input>
				<h2>
					<Input label="Input" placeholder="Custom font…" responsiveFont></Input>
				</h2>
				<span style="font-family: 'Comic Sans MS'">
					<Input label="Input" placeholder="Custom font…" responsiveFont></Input>
				</span>
				<Input label="Input" value="Invalid input" invalid errorMessage="Invalid input"
				></Input>

				<span>There is a hidden input here:</span>
				<Input label="Hidden input" hidden></Input>
			</Section>
			<Section title="Textarea" style="grid-column: 1/-1">
				<Textarea label="Textarea" value="Textarea with value"></Textarea>
				<Textarea label="Textarea" placeholder="Custom placeholder…"></Textarea>
				<Textarea
					label="Textarea hidden label"
					showLabel={false}
					placeholder="Hidden label…"
				></Textarea>
				<Textarea label="Textarea" value="Disabled with value" disabled></Textarea>
				<Textarea
					label="Textarea"
					value="Tall textarea with more rows for longer descriptions"
					rows={5}
				></Textarea>
				<Textarea label="Textarea" disabled placeholder="This textarea is disabled"
				></Textarea>
			</Section>
			<Section title="Dialog">
				<Dialog bind:dialog={exampleDialog} title="Dialog title">
					{#snippet headerControls()}
						<IconButton
							onclick={() => console.log('Custom header control clicked')}
							icon={IconAdjust}
							aria-label="Custom header control"
						></IconButton>
					{/snippet}
					<p>This is a dialog component.</p>
					<Button onclick={() => exampleDialog?.close()}>Close</Button>
				</Dialog>
			</Section>
			<Section title="Dropdown Menu">
				<MultiMenu groups={menuGroups} ontoggle={(e) => console.log(e.newState)}
				></MultiMenu>
				<MultiMenu groups={singleMenuGroup}></MultiMenu>
				<MultiMenu
					groups={fileList}
					icon={IconAdjust}
					triggerType="select"
					showSelectedValues
				></MultiMenu>
				<MultiMenu
					name="team"
					required
					groups={teamList}
					triggerType="select"
					showSelectedValues
				></MultiMenu>
				<MultiMenu
					icon={IconAdjust}
					style={'flex-grow: 1;'}
					groups={[
						{
							label: 'Assign to property',
							name: 'assignToProperty',
							children: []
						},
						{
							label: 'Assign',
							name: 'assign',
							children: [
								{
									label: 'Remove assignments',
									name: 'removeAssignment',
									children: []
								}
							]
						},
						{
							label: 'Selection',
							name: 'select',
							children: [
								{
									label: 'Select nodes',
									name: 'select',
									children: []
								}
							]
						},
						{
							label: 'Column Menu',
							name: 'columnMenu',
							children: [
								{
									label: 'Add column left',
									name: 'addColumnLeft',
									action: 'addColumnLeft'
								},
								{
									label: 'Add column right',
									name: 'addColumnRight',
									action: 'addColumnRight'
								},
								{
									label: 'Delete column',
									name: 'deleteColumn',
									action: 'deleteColumn'
								},
								{
									label: 'Rename column',
									name: 'renameColumn',
									action: 'renameColumn'
								}
							]
						}
					]}>Select File</MultiMenu
				>
				<MultiMenu triggerType="select" showSelectedValues groups={menuGroups}
					>Select File</MultiMenu
				>
				<MultiMenu triggerType="button" showSelectedValues groups={menuGroups}
					>Select File</MultiMenu
				>
				<MultiMenu groups={menuGroups} icon={IconAdjust}></MultiMenu>
				<MultiMenu groups={emptyMenuGroups} icon={IconAdjust}></MultiMenu>
				<MultiMenu groups={emptyMenuGroupsMini} icon={IconAdjust}></MultiMenu>
				<MultiMenu triggerType="select" showSelectedValues groups={emptyMenuGroupsMini}
					>Select File</MultiMenu
				>

				<form
					onsubmit={(e) => {
						e.preventDefault();
						const formData = new FormData(e.currentTarget);

						for (const [key, value] of formData) {
							console.log(`${key}: ${value}`);
						}
					}}
				>
					<MultiMenu
						name="menu"
						groups={menuGroups}
						icon={IconAdjust}
						style={'flex-grow: 1;'}
						triggerType="select"
						showSelectedValues>Select File</MultiMenu
					>
					<Input
						name="input"
						label="Input"
						placeholder="Custom placeholder…"
						style="margin-block: 1rem;"
					></Input>
					<Button type="submit">Submit</Button>
				</form>
			</Section>
			<Section title="Toggle Button">
				<ToggleButton
					onchange={(checked) => {
						checked ? toggleBtnCheckedCounter++ : null;
					}}>Toggled on {toggleBtnCheckedCounter} times</ToggleButton
				>
				<Button onclick={() => (toggleBtnChecked = !toggleBtnChecked)}
					>Manually toggle button 2</Button
				>
				<ToggleButton
					checked={toggleBtnChecked}
					onchange={() => console.log('Toggle Button 2 clicked')}
					>Toggle Button 2</ToggleButton
				>
				<ToggleButton checked onchange={() => console.log('Toggle Button 3 clicked')}
					><Icon icon={IconAdjust}></Icon></ToggleButton
				>
				<ToggleButton
					disabled
					icon={IconAdjust}
					onchange={() => console.log('Toggle Button 4 clicked')}
					>Toggle Button 4</ToggleButton
				>
			</Section>
			<Section title="Disclosure">
				<Disclosure>
					<DisclosureItem title="Item 1" expanded>
						Automatically closes other items.</DisclosureItem
					>
					<DisclosureItem title="Item 2">Content here</DisclosureItem>
					<DisclosureItem title="Item 3">Content here</DisclosureItem>
				</Disclosure>
				<Disclosure multiple>
					<DisclosureItem title="Item 1" expanded>Open all at once here</DisclosureItem>
					<DisclosureItem title="Item 2">Content here</DisclosureItem>
					<DisclosureItem title="Item 3">Content here</DisclosureItem>
				</Disclosure>
			</Section>
			<Section title="Misc">
				<OnboardingTip icon={IconAdjust}
					>This is an onboarding tip, like you can sometimes see in the sidebar.</OnboardingTip
				>
				<Label>This is a label</Label>
				<Type>This is a text component.</Type>
				<div style="padding: 2rem; background-color: var(--figma-color-bg-inverse)">
					<Type inverse>It supports inverse styling.</Type>
				</div>
			</Section>
		</LayoutContainer>
	</div>
</section>

<style>
	.prose h1 {
		margin-block: 2rem 1rem;
	}

	.prose p {
		margin-block: 1rem;
		background-color: var();
		font-size: 1rem;
	}

	section.hero {
		/* display: flex;
		flex-direction: column;
		align-items: start; */
		background: linear-gradient(var(--figma-color-bg), var(--figma-color-bg-brand-tertiary));
		padding-block: 8rem 2rem;
	}

	.hero .inner-wrapper {
		margin-inline: 1rem;
	}

	section.components {
		background-color: var(--figma-color-bg-brand-tertiary);
		padding-block-end: 8rem;
	}

	.content {
		margin-inline: auto;
		padding-inline: 6vw;
		max-width: calc(1280px + 8rem);
	}

	@media (max-width: 960px) {
		.content {
			padding-inline: 1rem;
		}
	}
</style>
