import {
	SheetyContextState,
	TInitializeCategoriesAction,
	TInitializeFacilitiesAction,
	TInitializeItemsListAction,
	TInitializeMethodsAction,
} from "./SheetyContext/types";
import {
	TSetAddressAction,
	TSetRecyclingLocationResults,
	TSetUserSelectionAction,
	UserSelectionContextState,
} from "./UserSelectionContext/types";

// =============================================================================
// State types
// =============================================================================
export interface AppContextState extends SheetyContextState, UserSelectionContextState {}

// =============================================================================
// Export
// =============================================================================
export type AppContextActions =
	| TInitializeItemsListAction
	| TInitializeMethodsAction
	| TInitializeCategoriesAction
	| TInitializeFacilitiesAction
	| TSetUserSelectionAction
	| TSetAddressAction
	| TSetRecyclingLocationResults;
