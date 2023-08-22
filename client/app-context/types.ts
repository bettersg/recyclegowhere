import {
	SheetyContextState,
	TInitializeCategoriesAction,
	TInitializeFacilitiesAction,
	TInitializeItemsListAction,
	TInitializeMethodsAction,
	TInitializeInstructionsAction,
	TinitializePickupDetailsAction,
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
	| TInitializeInstructionsAction
	| TInitializeFacilitiesAction
	| TinitializePickupDetailsAction
	| TSetUserSelectionAction
	| TSetAddressAction
	| TSetRecyclingLocationResults;
