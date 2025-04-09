export type SelectionMode = 'single' | 'multi' | 'button';

export type MenuGroup = {
	children: (MenuOption | MenuGroup)[];
	label: string;
	mode?: SelectionMode;
	name: string;
	disabled?: boolean;
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
	parameters?: any;
};
