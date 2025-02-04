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
		SelectMenu,
		Disclosure,
		DisclosureItem,
		OnboardingTip,
		Label,
		Type,
		Icon,
		DropdownMenu,
		MultiMenu
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
		IconAutoLayoutAdd,
		IconAutoLayoutHorizontal,
		IconAutoLayoutIgnore,
		IconAutoLayoutRemove,
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
		IconChevronDown,
		IconChevronRight,
		IconClose,
		IconCode,
		IconComponentMultiple,
		IconCornerRadius,
		IconCorners,
		IconDistributeHorizontalSpacing,
		IconDistributeVerticalSpacing,
		IconDraft,
		IconEffects,
		IconEllipses,
		IconEyedropper,
		IconFlatten,
		IconFlipHorizontal,
		IconFlipVertical,
		IconFolder,
		IconForward,
		IconGapHorizontal,
		IconGapVertical,
		IconGradient,
		IconHidden,
		IconHyperlink,
		IconImage,
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
		IconMaskAdd,
		IconMaskExclude,
		IconMaskIntersect,
		IconMaskSubtract,
		IconMaskUnion,
		IconMinus,
		IconNodeArrow,
		IconNodeBooleanOperation,
		IconNodeComponent,
		IconNodeComponentSet,
		IconNodeConnector,
		IconNodeEllipse,
		IconNodeFrame,
		IconNodeGroup,
		IconNodeImage,
		IconNodeInstance,
		IconNodeLine,
		IconNodePage,
		IconNodePolygon,
		IconNodeRectangle,
		IconNodeSection,
		IconNodeSlice,
		IconNodeStar,
		IconNodeText,
		IconPathEdit,
		IconPlay,
		IconPlus,
		IconRandom,
		IconRecent,
		IconResizeToFit,
		IconResolve,
		IconResolveFilled,
		IconReverse,
		IconRotateRight,
		IconSearch,
		IconSelectMatching,
		IconSelectMatchingAlt,
		IconSettings,
		IconShare,
		IconSidebarToggle,
		IconSmiley,
		IconSolid,
		IconSortAlphaAsc,
		IconSortAlphaDsc,
		IconSortTopBottom,
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
		IconVideo,
		IconVisible,
		IconWarning,
		IconWarningLarge,
		IconLinkDetach
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
		IconAutoLayoutAdd,
		IconAutoLayoutHorizontal,
		IconAutoLayoutIgnore,
		IconAutoLayoutRemove,
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
		IconChevronDown,
		IconChevronRight,
		IconClose,
		IconCode,
		IconComponentMultiple,
		IconCornerRadius,
		IconCorners,
		IconDistributeHorizontalSpacing,
		IconDistributeVerticalSpacing,
		IconDraft,
		IconEffects,
		IconEllipses,
		IconEyedropper,
		IconFlatten,
		IconFlipHorizontal,
		IconFlipVertical,
		IconFolder,
		IconForward,
		IconGapHorizontal,
		IconGapVertical,
		IconGradient,
		IconHidden,
		IconHyperlink,
		IconImage,
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
		IconMaskAdd,
		IconMaskExclude,
		IconMaskIntersect,
		IconMaskSubtract,
		IconMaskUnion,
		IconMinus,
		IconPathEdit,
		IconPlay,
		IconPlus,
		IconRandom,
		IconRecent,
		IconResizeToFit,
		IconResolve,
		IconResolveFilled,
		IconReverse,
		IconRotateRight,
		IconSearch,
		IconSelectMatching,
		IconSelectMatchingAlt,
		IconSettings,
		IconShare,
		IconSidebarToggle,
		IconSmiley,
		IconSolid,
		IconSortAlphaAsc,
		IconSortAlphaDsc,
		IconSortTopBottom,
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
		IconVideo,
		IconVisible,
		IconWarning,
		IconWarningLarge,
		IconLinkDetach
	];

	let nodeIcons = [
		IconNodeArrow,
		IconNodeBooleanOperation,
		IconNodeComponent,
		IconNodeComponentSet,
		IconNodeConnector,
		IconNodeEllipse,
		IconNodeFrame,
		IconNodeGroup,
		IconNodeImage,
		IconNodeInstance,
		IconNodeLine,
		IconNodePage,
		IconNodePolygon,
		IconNodeRectangle,
		IconNodeSection,
		IconNodeSlice,
		IconNodeStar,
		IconNodeText
	];

	import type { Option, Group } from '$lib/components/MenuFlyout/index.svelte';

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
				<Button
					icon={IconNodeBooleanOperation}
					onclick={() => console.log('Button 7 clicked')}>Button 7</Button
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
				<IconButton
					icon={IconNodeInstance}
					onclick={() => console.log('Icon Button 2 clicked')}
				/>
			</Section>
			<Section title="Icons" style="grid-column: 1/-1">
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
				<Textarea value="Tall textarea with more rows for longer descriptions" rows={5}
				></Textarea>
				<Textarea disabled placeholder="This textarea is disabled"></Textarea>
			</Section>
			<Section title="Select Menu">
				<SelectMenu
					{optGroups}
					bind:value={selectedOpt1}
					onchange={(e) => {
						e.map((o) => o.label).join(', ');
						// console.log('Option selected;', e[0].label);
					}}
					placeholder="Single select menu"
				></SelectMenu>
				<p>Selected options: {selectedOpt1.map((o) => o.label).join(', ')}</p>
				<SelectMenu placeholder="Multi select menu" {optGroups} multiselect showGroupLabels
				></SelectMenu>
				<p>Selected options: {selectedOpt2.map((o) => o.label).join(', ')}</p>
				<SelectMenu
					icon={IconNodeBooleanOperation}
					{optGroups}
					placeholder="Single select menu"
				></SelectMenu>
				<SelectMenu {optGroups} blink placeholder="Blinking select menu"></SelectMenu>
			</Section>
			<Section title="Dropdown Menu">
				<!-- <DropdownMenu {optGroups} onchange={(value) => console.log(value)}
					>Menu</DropdownMenu
				> -->

				<MultiMenu
					groups={[
						{
							name: 'file',
							label: 'File',
							children: [
								{
									label: 'New',
									action: 'new-file'
								},
								{
									label: 'Open',
									action: 'open-file'
								},
								{
									label: 'Save',
									action: 'save-file'
								}
							]
						},
						{
							name: "text",
							label: "Text",
							children: [
								
								{
									label: "Bold",
									action: "bold"
								},
								{
									label: "Italic",
									action: "italic"
								},
								{
									label: "Underline",
									action: "underline"
								},
								{
									name: "alignment",
									label: "Alignment",
									children: [
										{
											label: "Left",
											action: "align-left"
										},
										{
											label: "Center",
											action: "align-center"
										},
										{
											label: "Right",
											action: "align-right"
										},
										{
											label: "Justify",
											action: "align-justify"
										}
									]
								},
								{
									name: "case",
									label: "Case",
									children: [
										{
											label: "Uppercase",
											action: "uppercase"
										},
										{
											label: "Lowercase",
											action: "lowercase"
										},
										{
											label: "Title case",
											action: "titlecase"
										}
									]
								}
							
							]
						},
					
						{
							name: 'edit',
							label: 'Edit',
							children: [
								{
									label: 'Undo',
									action: 'undo'
								},
								{
									label: 'Redo',
									action: 'redo'
								},
								{
									label: 'Cut',
									action: 'cut'
								},
								{
									label: 'Copy',
									action: 'copy'
								},
								{
									label: 'Paste',
									action: 'paste'
								}
							]
						},
						{
							name: 'view',
							label: 'View',
							children: [
								{
									name: 'View options',
									label: 'View options',
									mode: 'single',
									children: [
										{
											label: 'Wireframe',
											value: 'wireframe',
											selected: false
										},
										{
											label: 'Shaded',
											value: 'shaded',
											selected: false
										},
										{
											label: 'Textured',
											value: 'textured',
											selected: false
										}
									]
								}
							]
						},

						{
							name: 'ui-elements',
							label: 'UI Elements',
							mode: 'multi',
							children: [
								{
									label: 'Grid',
									value: 'grid',
									selected: false
								},
								{
									label: 'Guides',
									value: 'guides',
									selected: false
								},
								{
									label: 'Rulers',
									value: 'rulers',
									selected: false
								},
								{
									label: 'Layers',
									value: 'layers',
									selected: false
								}
							]
						}
					]}
				></MultiMenu>
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
