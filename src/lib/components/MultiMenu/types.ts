export type SelectionMode = 'single' | 'multi' | 'button';

export type MenuGroup = {
	name: string;
	label: string;
	mode?: SelectionMode;
	value?: string[];
	children: MenuOption[] | MenuGroup[]; // Options directly in this group
};

export type MenuOption = SelectableMenuOption | ClickableMenuOption;

export type SelectableMenuOption = BaseMenuOption & {
	id?: string;
	selected: boolean | undefined;
	value: string;
};

export type ClickableMenuOption = BaseMenuOption & {
	action: string;
};

export type BaseMenuOption = {
	label: string;
	disabled?: boolean;
};

export type MenuChangeEvent = {
	groupId: string;
	value: string[];
	path: string[]; // Array of group IDs representing the path to the changed group
};

export type MenuClickEvent = {
	optionId: string;
	value: string;
	path: string[]; // Array of group IDs representing the path to the clicked option
};
