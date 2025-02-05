export type SelectionMode = 'single' | 'multi' | 'button';

export type MenuGroup = {
	children: MenuOption[] | MenuGroup[]; // Options directly in this group
	label: string;
	mode?: SelectionMode;
	name: string;
};

export type MenuOption = SelectableMenuOption | ClickableMenuOption;

export type SelectableMenuOption = {
	value: string;
	label: string;
	selected?: boolean | undefined;
	disabled?: boolean;
};

export type ClickableMenuOption = {
	action: string;
	label: string;
	selected?: never;
	disabled?: boolean;
};

export type MenuChangeEvent = {
	groupId: string;
	path: string[]; // Array of group IDs representing the path to the changed group
	value: string[];
};

export type MenuClickEvent = {
	optionId: string;
	path: string[]; // Array of group IDs representing the path to the clicked option
	value: string;
};
