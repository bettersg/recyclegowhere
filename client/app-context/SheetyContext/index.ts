import { SheetyContextState } from "./types";

export const initialSheetyState: SheetyContextState = {
	recyclableItems: {
		isLoaded: false,
		data: [],
	},
	instructions: [],
	methods: [],
	categories: [],
	facilities: [],
};
