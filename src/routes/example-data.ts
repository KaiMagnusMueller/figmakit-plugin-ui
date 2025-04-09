import type { MenuGroup } from '$lib/components/MultiMenu/types.js';
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

export let icons = [
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

export let nodeIcons = [
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

export const menuGroups: MenuGroup[] = [
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
		name: 'text',
		label: 'Text',
		children: [
			{
				label: 'Bold',
				action: 'bold'
			},
			{
				label: 'Italic',
				action: 'italic'
			},
			{
				label: 'Underline',
				action: 'underline'
			},
			{
				name: 'alignment',
				label: 'Alignment',
				children: [
					{
						label: 'Left',
						action: 'align-left'
					},
					{
						label: 'Center',
						action: 'align-center'
					},
					{
						label: 'Right',
						action: 'align-right'
					},
					{
						label: 'Justify',
						action: 'align-justify'
					}
				]
			},
			{
				name: 'case',
				label: 'Case',
				children: [
					{
						label: 'Uppercase',
						action: 'uppercase'
					},
					{
						label: 'Lowercase',
						action: 'lowercase'
					},
					{
						label: 'Title case',
						action: 'titlecase'
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
];

// Also add these smaller menu configurations that are used in other examples
export const singleMenuGroup: MenuGroup[] = [
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
	}
];

export const emptyMenuGroups: MenuGroup[] = [
	{
		name: 'file',
		label: 'File',
		children: []
	},
	{
		name: 'text',
		label: 'Text',
		children: [
			{
				label: 'Bold',
				action: 'bold'
			},
			{
				label: 'Italic',
				action: 'italic'
			},
			{
				label: 'Underline',
				action: 'underline'
			},
			{
				name: 'alignment',
				label: 'Alignment',
				children: []
			},
			{
				name: 'case',
				label: 'Case',
				children: [
					{
						label: 'Uppercase',
						action: 'uppercase'
					},
					{
						label: 'Lowercase',
						action: 'lowercase'
					},
					{
						label: 'Title case',
						action: 'titlecase'
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
				children: []
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
];

export const emptyMenuGroupsMini: MenuGroup[] = [
	{
		name: 'file',
		label: 'File',
		children: []
	}
];
