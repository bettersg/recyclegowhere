import { Categories, Methods } from "api/sheety/enums";
import { TSheetyCategories, Items, TSheetyFacilities, TSheetyMethods } from "api/sheety/types";

// =============================================================================
// State types
// =============================================================================
export type TStateCategories = {
	id: number;
	itemCategories: Categories;
	methods: Methods[];
};
export type TStateFacilities = {
	id: number;
	address: string;
	categoriesAccepted: Categories[];
	channelName: string;
	contact: string;
	latitude: number;
	longitude: number;
	methodsAccepted: Methods[];
	operatingHours: string;
	recyclingSubCategory: string; // TODO: to set to enum when confirmed
	organisationName: string;
	otherFormsOfContact: string;
	postcode: number;
	remarks: string;
	type: string;
	website: string;
};
export type TItemSelection = {
	name: string;
	method: Methods | undefined;
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
	facilities: TStateFacilities[];
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
	SET_FACILITIES_LIST = "SET_FACILITIES_LIST",
	SET_ADDRESS = "SET_ADDRESS",
	SET_USER_SELECTION = "SET_USER_SELECTION",
}

export type TInitializeItemsListAction = {
	type: Actions.SET_ITEMS_LIST;
	payload: Items[];
};
export type TInitializeMethodsAction = {
	type: Actions.SET_METHODS_LIST;
	payload: TSheetyMethods[];
};
export type TInitializeCategoriesAction = {
	type: Actions.SET_CATEGORIES_LIST;
	payload: TSheetyCategories[];
};
export type TInitializeFacilitiesAction = {
	type: Actions.SET_FACILITIES_LIST;
	payload: TSheetyFacilities[];
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
	| TInitializeFacilitiesAction
	| TSetUserSelectionAction
	| TSetAddressAction;
