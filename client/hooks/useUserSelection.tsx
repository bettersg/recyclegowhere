import { TEmptyItem, TItemSelection } from "app-context/SheetyContext/types";
import { SelectionActions } from "app-context/UserSelectionContext/actions";
import { AddressOption } from "app-context/UserSelectionContext/types";
import { AppContext } from "app-context/index";
import { useContext } from "react";

export const useUserInputs = () => {
	const {
		state: {
			userSelection: { items, address },
		},
		dispatch,
	} = useContext(AppContext);

	const setAddress = (address: AddressOption) => {
		dispatch(SelectionActions.setAddress(address));
	};

	const setUserSelection = (selection: (TItemSelection | TEmptyItem)[]) => {
		dispatch(SelectionActions.setUserSelection(selection));
	};

	return { items, address, setAddress, setUserSelection };
};
