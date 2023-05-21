import { Categories, Methods } from "api/sheety/enums";
import { TSheetyCategories, Items, TSheetyFacilities, TSheetyMethods } from "api/sheety/types";

// =============================================================================
// State types
// =============================================================================
export interface SheetyContextState {
	recyclableItems: {
		isLoaded: boolean;
		data: Items[];
	};
	methods: Methods[];
	categories: TStateCategories[];
	facilities: TStateFacilities[];
}
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
export type TEmptyItem = {
	name: string;
	method: undefined;
};
export type TItemSelection = {
	name: string;
	method: Methods;
};

// =============================================================================
// Action types
// =============================================================================
export enum SheetyActionsEnums {
	SET_ITEMS_LIST = "SET_ITEMS_LIST",
	SET_METHODS_LIST = "SET_METHODS_LIST",
	SET_CATEGORIES_LIST = "SET_CATEGORIES_LIST",
	SET_FACILITIES_LIST = "SET_FACILITIES_LIST",
}

export type TInitializeItemsListAction = {
	type: SheetyActionsEnums.SET_ITEMS_LIST;
	payload: Items[];
};
export type TInitializeMethodsAction = {
	type: SheetyActionsEnums.SET_METHODS_LIST;
	payload: TSheetyMethods[];
};
export type TInitializeCategoriesAction = {
	type: SheetyActionsEnums.SET_CATEGORIES_LIST;
	payload: TSheetyCategories[];
};
export type TInitializeFacilitiesAction = {
	type: SheetyActionsEnums.SET_FACILITIES_LIST;
	payload: TSheetyFacilities[];
};
