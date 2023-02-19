import { Reducer } from "react";
import { Actions, AppContextActions, AppContextState } from "./types";
import { transformCategory } from "./utils";

export const AppContextReducer: Reducer<AppContextState, AppContextActions> = (state, action) => {
	switch (action.type) {
		case Actions.SET_ITEMS_LIST:
			return {
				...state,
				recyclableItems: {
					isLoaded: true,
					data: action.payload,
				},
			};
		case Actions.SET_METHODS_LIST:
			return {
				...state,
				methods: action.payload,
			};
		case Actions.SET_CATEGORIES_LIST:
			return {
				...state,
				categories: action.payload.map((category) => transformCategory(category)),
			};
		case Actions.SET_USER_SELECTION:
			return {
				...state,
				userSelection: {
					address: { ...state.userSelection.address },
					items: action.payload,
				},
			};
		case Actions.SET_ADDRESS:
			return {
				...state,
				userSelection: {
					address: action.payload,
					items: [...state.userSelection.items],
				},
			};
	}
};
