import { SelectionActions } from "app-context/actions";
import { AppContext } from "app-context/index";
import { AddressOption, TEmptyItem, TItemSelection } from "app-context/types";
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
