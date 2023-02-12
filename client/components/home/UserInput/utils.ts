import { TItemSelection } from "../types";

export const validateSelections = (selection: TItemSelection[]) => {
	if (selection.length === 1) {
		return selection[0].name && selection[0].method;
	}

	return selection.reduce<boolean>((acc, curr) => acc && !!curr.name && !!curr.method, true);
};
