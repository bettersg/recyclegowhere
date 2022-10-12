import { Reducer } from "react";
import { Actions, AppContextActions, AppContextState } from "./types";

export const AppContextReducer: Reducer<AppContextState, AppContextActions> = (state, action) => {
	switch (action.type) {
		case Actions.SET_ITEMS_LIST:
			return {
				...state,
				recyclableItems: action.items,
			};
		case Actions.SET_USER_SELECTION:
			return {
				...state,
				recyclableItems: action.selection,
			};
	}
};
