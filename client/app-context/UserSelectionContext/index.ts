import { UserSelectionContextState } from "./types";

export const initialUserSelectionState: UserSelectionContextState = {
	userSelection: {
		address: {
			value: "",
			label: "",
			coordinates: {
				lat: "",
				long: "",
			},
		},
		items: [
			{
				name: "",
				method: undefined,
			},
		],
	},
};
