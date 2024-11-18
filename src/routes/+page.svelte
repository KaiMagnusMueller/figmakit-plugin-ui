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
		Checkbox,
		Switch,
		Radio,
		Input,
		Textarea,
		SelectMenu,
		Disclosure,
		DisclosureItem,
		OnboardingTip,
		Label,
		Type,
		Icon
	} from '$lib/index.js';

	import {
		IconAdjust,
		IconAlert,
		IconAlignHorizontalCenters,
		IconAlignLeft,
		IconAlignRight,
		IconAlignTop,
		IconAlignVerticalCenters,
		IconAngle,
		IconArrowLeftRight,
		IconAutoLayoutHorizontal,
		IconAutoLayoutVertical,
		IconBack,
		IconBlend,
		IconBlendEmpty,
		IconBreak,
		IconCaretDown,
		IconCaretLeft,
		IconCaretRight,
		IconCaretUp,
		IconCheck,
		IconClose,
		IconComponent,
		IconCornerRadius,
		IconCorners,
		IconDistributeHorizontalSpacing,
		IconDistributeVerticalSpacing,
		IconDraft,
		IconEffects,
		IconEllipses,
		IconEyedropper,
		IconForward,
		IconFrame,
		IconGroup,
		IconHidden,
		IconHorizontalPadding,
		IconHyperlink,
		IconImage,
		IconInstance,
		IconKey,
		IconLayoutAlignBottom,
		IconLayoutGridColumns,
		IconLayoutGridRows,
		IconLayoutGridUniform,
		IconLibrary,
		IconLinkBroken,
		IconLinkConnected,
		IconList,
		IconListDetailed,
		IconListTile,
		IconLockOff,
		IconLockOn,
		IconMinus,
		IconPlay,
		IconPlus,
		IconRandom,
		IconRecent,
		IconResizeToFit,
		IconResolve,
		IconResolveFilled,
		IconReverse,
		IconSearch,
		IconSearchLarge,
		IconSettings,
		IconShare,
		IconSmiley,
		IconSortAlphaAsc,
		IconSortAlphaDsc,
		IconSortTopBottom,
		IconSpacing,
		IconSpinner,
		IconStarOff,
		IconStarOn,
		IconStrokeWeight,
		IconStyles,
		IconSwap,
		IconTheme,
		IconTidyUpGrid,
		IconTidyUpListHorizontal,
		IconTidyUpListVertical,
		IconTimer,
		IconTrash,
		IconUpDown,
		IconVerticalPadding,
		IconVisible,
		IconWarning,
		IconWarningLarge,
		IconNodeBooleanOperation,
		IconNodeComponent,
		IconNodeConnector,
		IconNodeEllipse,
		IconNodeFrame,
		IconNodeGroup,
		IconNodeImage,
		IconNodeInstance,
		IconNodePage,
		IconNodeSection,
		IconNodeSlice,
		IconNodeStar,
		IconNodeText
	} from '$lib/index.js';

	let icons = [
		IconAdjust,
		IconAlert,
		IconAlignHorizontalCenters,
		IconAlignLeft,
		IconAlignRight,
		IconAlignTop,
		IconAlignVerticalCenters,
		IconAngle,
		IconArrowLeftRight,
		IconAutoLayoutHorizontal,
		IconAutoLayoutVertical,
		IconBack,
		IconBlend,
		IconBlendEmpty,
		IconBreak,
		IconCaretDown,
		IconCaretLeft,
		IconCaretRight,
		IconCaretUp,
		IconCheck,
		IconClose,
		IconComponent,
		IconCornerRadius,
		IconCorners,
		IconDistributeHorizontalSpacing,
		IconDistributeVerticalSpacing,
		IconDraft,
		IconEffects,
		IconEllipses,
		IconEyedropper,
		IconForward,
		IconFrame,
		IconGroup,
		IconHidden,
		IconHorizontalPadding,
		IconHyperlink,
		IconImage,
		IconInstance,
		IconKey,
		IconLayoutAlignBottom,
		IconLayoutGridColumns,
		IconLayoutGridRows,
		IconLayoutGridUniform,
		IconLibrary,
		IconLinkBroken,
		IconLinkConnected,
		IconList,
		IconListDetailed,
		IconListTile,
		IconLockOff,
		IconLockOn,
		IconMinus,
		IconPlay,
		IconPlus,
		IconRandom,
		IconRecent,
		IconResizeToFit,
		IconResolve,
		IconResolveFilled,
		IconReverse,
		IconSearch,
		IconSearchLarge,
		IconSettings,
		IconShare,
		IconSmiley,
		IconSortAlphaAsc,
		IconSortAlphaDsc,
		IconSortTopBottom,
		IconSpacing,
		IconSpinner,
		IconStarOff,
		IconStarOn,
		IconStrokeWeight,
		IconStyles,
		IconSwap,
		IconTheme,
		IconTidyUpGrid,
		IconTidyUpListHorizontal,
		IconTidyUpListVertical,
		IconTimer,
		IconTrash,
		IconUpDown,
		IconVerticalPadding,
		IconVisible,
		IconWarning,
		IconWarningLarge
	];

	let nodeIcons = [
		IconNodeBooleanOperation,
		IconNodeComponent,
		IconNodeConnector,
		IconNodeEllipse,
		IconNodeFrame,
		IconNodeGroup,
		IconNodeImage,
		IconNodeInstance,
		IconNodePage,
		IconNodeSection,
		IconNodeSlice,
		IconNodeStar,
		IconNodeText
	];

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

	<Section title="Icons">
		<div style="display: inherit; flex-wrap: inherit; gap: .5rem;">
			{#each icons as icon}
				<Icon {icon}></Icon>
			{/each}
		</div>
		<div style="display: inherit; flex-wrap: inherit; gap: .5rem;">
			{#each nodeIcons as icon}
				<Icon {icon}></Icon>
			{/each}
		</div>
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
			showGroupLabels
			onchange={(e) => {
				selectedOpt2 = e;
				// console.log('Options selected:', e.map((o) => o.label).join(', '));
			}}
		></SelectMenu>
		<p>Selected options: {selectedOpt2.map((o) => o.label).join(', ')}</p>

		<SelectMenu
			icon={IconNodeBooleanOperation}
			{optGroups}
			bind:value={selectedOpt1}
			placeholder="Single select menu"
		></SelectMenu>

		<SelectMenu {optGroups} blink placeholder="Blinking select menu"></SelectMenu>
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
		<OnboardingTip icon={IconNodeBooleanOperation}
			>This is an onboarding tip, like you can sometimes see in the sidebar.</OnboardingTip
		>
		<Label>This is a label</Label>

		<Type>This is a somple text component.</Type>
		<div style="padding: 2rem; background-color: var(--figma-color-bg-inverse)">
			<Type inverse>It supports inverse styling.</Type>
		</div>
	</Section>
</LayoutContainer>

<style>
	.prose h1 {
		margin-block: 2rem;
	}

	.prose p {
		margin-block: 1rem;
		background-color: var();
		font-size: 1rem;
	}
</style>
