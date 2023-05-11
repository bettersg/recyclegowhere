import { TItemSelection, TEmptyItem } from "app-context/SheetyContext/types";
import {
	AddressOption,
	TSetAddressAction,
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

export const SelectionActions = {
	setUserSelection,
	setAddress,
};
