import { Items, Methods, TSheetyCategories } from "api/sheety/types";
import {
	Actions,
	Coordinates,
	TInitializeCategoriesAction,
	TInitializeItemsListAction,
	TInitializeMethodsAction,
	TItemSelection,
	TSetAddressAction,
	TSetUserSelectionAction,
} from "./types";

const initializeItemsList = (items: Items[]): TInitializeItemsListAction => ({
	type: Actions.SET_ITEMS_LIST,
	items,
});

const initializeMethodsList = (methods: Methods[]): TInitializeMethodsAction => ({
	type: Actions.SET_METHODS_LIST,
	methods,
});

const initializeCategoriessList = (
	categories: TSheetyCategories[],
): TInitializeCategoriesAction => ({
	type: Actions.SET_CATEGORIES_LIST,
	categories,
});

const setUserSelection = (selection: TItemSelection[]): TSetUserSelectionAction => ({
	type: Actions.SET_USER_SELECTION,
	selection,
});

const setAddress = (coordinates: Coordinates): TSetAddressAction => ({
	type: Actions.SET_ADDRESS,
	coordinates,
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
