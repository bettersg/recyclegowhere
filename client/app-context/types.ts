import { TSheetyCategories, Items, Methods, TInstructions } from "api/sheety/types";

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
type Coordinates = {
	lat: string;
	long: string;
};
export type AddressOption = {
	value: string;
	label: string;
	coordinates: Coordinates;
};
export interface AppContextState {
	recyclableItems: {
		isLoaded: boolean;
		data: Items[];
	};
	methods: Methods[];
	categories: TStateCategories[];
	instructions: TInstructions[];
	userSelection: {
		address: AddressOption;
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
	SET_INSTRUCTIONS_LIST = "SET_INSTRUCTIONS_LIST",
	SET_ADDRESS = "SET_ADDRESS",
	SET_USER_SELECTION = "SET_USER_SELECTION",
}

export type TInitializeItemsListAction = {
	type: Actions.SET_ITEMS_LIST;
	payload: Items[];
};
export type TInitializeMethodsAction = {
	type: Actions.SET_METHODS_LIST;
	payload: Methods[];
};
export type TInitializeCategoriesAction = {
	type: Actions.SET_CATEGORIES_LIST;
	payload: TSheetyCategories[];
};
export type TInitializeInstructionsAction = {
	type: Actions.SET_INSTRUCTIONS_LIST;
	payload: TInstructions[];
};
export type TSetUserSelectionAction = {
	type: Actions.SET_USER_SELECTION;
	payload: TItemSelection[];
};
export type TSetAddressAction = {
	type: Actions.SET_ADDRESS;
	payload: AddressOption;
};

// =============================================================================
// Export
// =============================================================================
export type AppContextActions =
	| TInitializeItemsListAction
	| TInitializeMethodsAction
	| TInitializeCategoriesAction
	| TInitializeInstructionsAction
	| TSetUserSelectionAction
	| TSetAddressAction;
