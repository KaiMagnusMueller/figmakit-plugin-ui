export type SelectionMode = 'single' | 'multi' | 'button';

export type MenuGroup = {
	children: MenuOption[] | MenuGroup[]; // Options directly in this group
	label: string;
	mode?: SelectionMode;
	name: string;
	value?: string[];
};

export type MenuOption = SelectableMenuOption | ClickableMenuOption;

export type SelectableMenuOption = {
	disabled?: boolean;
	label: string;
	selected?: boolean | undefined;
	value: string;
};

export type ClickableMenuOption = {
	action: string;
	disabled?: boolean;
	label: string;
	selected: never;
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
