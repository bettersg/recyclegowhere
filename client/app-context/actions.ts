import { Items, Methods, TSheetyCategories } from "api/sheety/types";
import {
	Actions,
	AddressOption,
	TInitializeCategoriesAction,
	TInitializeItemsListAction,
	TInitializeMethodsAction,
	TItemSelection,
	TSetAddressAction,
	TSetUserSelectionAction,
} from "./types";

const initializeItemsList = (items: Items[]): TInitializeItemsListAction => ({
	type: Actions.SET_ITEMS_LIST,
	payload: items,
});

const initializeMethodsList = (methods: Methods[]): TInitializeMethodsAction => ({
	type: Actions.SET_METHODS_LIST,
	payload: methods,
});

const initializeCategoriessList = (
	categories: TSheetyCategories[],
): TInitializeCategoriesAction => ({
	type: Actions.SET_CATEGORIES_LIST,
	payload: categories,
});

const setUserSelection = (selection: TItemSelection[]): TSetUserSelectionAction => ({
	type: Actions.SET_USER_SELECTION,
	payload: selection,
});

const setAddress = (address: AddressOption): TSetAddressAction => ({
	type: Actions.SET_ADDRESS,
	payload: address,
});

export const SheetyActions = {
	initializeItemsList,
	initializeCategoriessList,
	initializeMethodsList,
};

export const SelectionActions = {
	setUserSelection,
	setAddress,
};