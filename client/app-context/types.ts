import { TSheetyCategories, Items, Methods } from "api/sheety/types";

export type TStateCategories = {
	id: number;
	itemCategories: string;
	methods: string[];
};
type UserSelection = any;

export interface AppContextState {
	recyclableItems: {
		isLoaded: boolean;
		data: Items[];
	};
	methods: Methods[];
	categories: TStateCategories[];
	userSelection: UserSelection[];
}

export enum Actions {
	SET_ITEMS_LIST = "SET_ITEMS_LIST",
	SET_METHODS_LIST = "SET_METHODS_LIST",
	SET_CATEGORIES_LIST = "SET_CATEGORIES_LIST",
	SET_USER_SELECTION = "SET_USER_SELECTION",
}

type TInitializeItemsListAction = {
	type: Actions.SET_ITEMS_LIST;
	items: Items[];
};
type TInitializeMethodsAction = {
	type: Actions.SET_METHODS_LIST;
	methods: Methods[];
};
type TInitializeCategoriesAction = {
	type: Actions.SET_CATEGORIES_LIST;
	categories: TSheetyCategories[];
};
type TSetUserSelectionAction = {
	type: Actions.SET_USER_SELECTION;
	selection: UserSelection[];
};

export type AppContextActions =
	| TInitializeItemsListAction
	| TSetUserSelectionAction
	| TInitializeMethodsAction
	| TInitializeCategoriesAction;
