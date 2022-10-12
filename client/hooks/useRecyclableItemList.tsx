import { useContext } from "react";
import { AppContext } from "app-context/index";
import { Actions, Item } from "app-context/types";

export const useRecyclableItemList = () => {
	const { state, dispatch } = useContext(AppContext);

	return {
		items: state.recyclableItems,
		setItems: (items: Item[]) => {
			const updatedList = [...state.recyclableItems, ...items];
			dispatch({ type: Actions.SET_ITEMS_LIST, items: updatedList });
		},
	};
};
