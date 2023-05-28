import { TEmptyItem, TItemSelection } from "app-context/SheetyContext/types";
import { SelectionActions } from "app-context/UserSelectionContext/actions";
import { AddressOption, RecyclingLocationResults } from "app-context/UserSelectionContext/types";
import { AppContext } from "app-context/index";
import { useContext } from "react";

export const useUserInputs = () => {
	const {
		state: {
			userSelection: { items, address, recyclingLocationResults },
		},
		dispatch,
	} = useContext(AppContext);

	const setAddress = (address: AddressOption) => {
		dispatch(SelectionActions.setAddress(address));
	};

	const setUserSelection = (selection: (TItemSelection | TEmptyItem)[]) => {
		dispatch(SelectionActions.setUserSelection(selection));
	};

	const setRecyclingLocationResults = (results: RecyclingLocationResults) => {
		dispatch(SelectionActions.setRecyclingLocationResults(results));
	};

	return {
		items,
		address,
		recyclingLocationResults,
		setAddress,
		setUserSelection,
		setRecyclingLocationResults,
	};
};
