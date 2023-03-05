import { TItemSelection } from "app-context/types";

// =============================================================================
// Display
// =============================================================================
export const displayTitleCase = (value: string) =>
	`${value.slice(0, 1)}${value.slice(1).toLowerCase()}`;

// =============================================================================
// Validation
// =============================================================================
export const validateSelections = (selection: TItemSelection[]) => {
	if (selection.length === 1) {
		return selection[0].name && selection[0].method;
	}

	return selection.reduce<boolean>((acc, curr) => acc && !!curr.name && !!curr.method, true);
};
