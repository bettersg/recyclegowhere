import { Reducer } from "react";
import { AppContextActions, AppContextState } from "./types";
import { transformCategory, transformFacility } from "./utils";
import { SheetyActionsEnums } from "./SheetyContext/types";
import { UserSelectionActionsEnums } from "./UserSelectionContext/types";

export const AppContextReducer: Reducer<AppContextState, AppContextActions> = (state, action) => {
	switch (action.type) {
		// =====================================================================
		// Sheety actions
		// =====================================================================
		case SheetyActionsEnums.SET_ITEMS_LIST:
			return {
				...state,
				recyclableItems: {
					isLoaded: true,
					data: action.payload,
				},
			};
		case SheetyActionsEnums.SET_METHODS_LIST:
			return {
				...state,
				methods: action.payload.map((method) => method.name),
			};
		case SheetyActionsEnums.SET_CATEGORIES_LIST:
			return {
				...state,
				categories: action.payload.map((category) => transformCategory(category)),
			};
		case SheetyActionsEnums.SET_FACILITIES_LIST:
			return {
				...state,
				facilities: action.payload.map((facility) => transformFacility(facility)),
			};
		case SheetyActionsEnums.SET_INSTRUCTIONS_LIST:
			return {
				...state,
				instructions: action.payload,
			};
		case SheetyActionsEnums.SET_PICKUP_LIST: //list on the cards and tabs
			return {
				...state,
				pickUpServices: action.payload,
			};
		case SheetyActionsEnums.SET_UNRECYCLABILITY_LIST:
			return {
				...state,
				unrecyclableDetails: action.payload,
			};
		// =================================================================
		// User selection actions
		// =================================================================
		case UserSelectionActionsEnums.SET_USER_SELECTION:
			return {
				...state,
				userSelection: {
					address: { ...state.userSelection.address },
					items: action.payload,
				},
			};
		case UserSelectionActionsEnums.SET_ADDRESS:
			return {
				...state,
				userSelection: {
					address: action.payload,
					items: [...state.userSelection.items],
				},
			};
		case UserSelectionActionsEnums.SET_RECYLING_LOCATION_RESULTS:
			return {
				...state,
				userSelection: {
					...state.userSelection,
					recyclingLocationResults: action.payload,
				},
			};
	}
};
