import type { MenuGroup } from '$lib/components/MultiMenu/types.js';

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
	// {
	// 	name: 'ASD',
	// 	label: 'ASD',

	// 	children: [
	// 		{
	// 			name: 'ASDF',
	// 			label: 'ASDF',
	// 			mode: 'multi',
	// 			children: [
	// 				{
	// 					label: '123',
	// 					value: '123',
	// 					selected: false
	// 				},
	// 				{
	// 					label: '456',
	// 					value: '456',
	// 					selected: false
	// 				},
	// 				{
	// 					label: '789',
	// 					value: '789',
	// 					selected: false
	// 				}
	// 			]
	// 		}
	// 	]
	// },
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

export const fileList: MenuGroup[] = [
	{
		name: 'file',
		label: 'File',
		mode: 'single',
		children: [
			{
				value: 'a1b2c3d4e5',
				label: 'Document1.pdf',
				selected: true
			},
			{
				value: 'f6g7h8i9j0',
				label: 'Presentation.pptx'
			},
			{
				value: 'k1l2m3n4o5',
				label: 'Spreadsheet.xlsx'
			},
			{
				value: 'p6q7r8s9t0',
				label: 'Photo.jpg'
			},
			{
				value: 'u1v2w3x4y5',
				label: 'Archive.zip'
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
		children: []
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

export const teamList: MenuGroup[] = [
	{
		label: 'Select Team',
		name: 'team',
		mode: 'single',
		children: [
			{
				value: '1fhvdup1b41b135',
				label: 'sdgfsdfgfdg',
				selected: true
			},
			{
				value: 'ub064yx7du02hr3',
				label: 'DB Down Test',
				selected: false
			},
			{
				value: 'u4iw3113ch04380',
				label: 'Intersections Team',
				selected: false
			}
		]
	}
];
