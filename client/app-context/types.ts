import { TSheetyCategories, Items, Methods } from "api/sheety/types";

// =============================================================================
// State types
// =============================================================================
export type TStateCategories = {
	id: number;
	itemCategories: string;
	methods: string[];
};
export type TItemSelection = {
	name: string;
	method: string;
};
export type Coordinates = {
	lat: string;
	long: string;
};

export interface AppContextState {
	recyclableItems: {
		isLoaded: boolean;
		data: Items[];
	};
	methods: Methods[];
	categories: TStateCategories[];
	userSelection: {
		addressCoordinates: Coordinates;
		items: TItemSelection[];
	};
}

// =============================================================================
// Action types
// =============================================================================
export enum Actions {
	SET_ITEMS_LIST = "SET_ITEMS_LIST",
	SET_METHODS_LIST = "SET_METHODS_LIST",
	SET_CATEGORIES_LIST = "SET_CATEGORIES_LIST",
	SET_ADDRESS = "SET_ADDRESS",
	SET_USER_SELECTION = "SET_USER_SELECTION",
}

export type TInitializeItemsListAction = {
	type: Actions.SET_ITEMS_LIST;
	items: Items[];
};
export type TInitializeMethodsAction = {
	type: Actions.SET_METHODS_LIST;
	methods: Methods[];
};
export type TInitializeCategoriesAction = {
	type: Actions.SET_CATEGORIES_LIST;
	categories: TSheetyCategories[];
};
export type TSetUserSelectionAction = {
	type: Actions.SET_USER_SELECTION;
	selection: TItemSelection[];
};
export type TSetAddressAction = {
	type: Actions.SET_ADDRESS;
	coordinates: Coordinates;
};

// =============================================================================
// Export
// =============================================================================
export type AppContextActions =
	| TInitializeItemsListAction
	| TSetUserSelectionAction
	| TInitializeMethodsAction
	| TInitializeCategoriesAction
	| TSetAddressAction;
