import { TItemSelection, TEmptyItem } from "app-context/SheetyContext/types";
import {
	AddressOption,
	RecyclingLocationResults,
	TSetAddressAction,
	TSetRecyclingLocationResults,
	TSetUserSelectionAction,
	UserSelectionActionsEnums,
} from "./types";

// =============================================================================
// Actions
// =============================================================================
const setUserSelection = (selection: (TItemSelection | TEmptyItem)[]): TSetUserSelectionAction => ({
	type: UserSelectionActionsEnums.SET_USER_SELECTION,
	payload: selection,
});

const setAddress = (address: AddressOption): TSetAddressAction => ({
	type: UserSelectionActionsEnums.SET_ADDRESS,
	payload: address,
});

const setRecyclingLocationResults = (
	results: RecyclingLocationResults,
): TSetRecyclingLocationResults => ({
	type: UserSelectionActionsEnums.SET_RECYLING_LOCATION_RESULTS,
	payload: results,
});

export const SelectionActions = {
	setUserSelection,
	setAddress,
	setRecyclingLocationResults,
};
