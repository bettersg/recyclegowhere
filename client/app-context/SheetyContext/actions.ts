import {
	Items,
	TSheetyMethods,
	TSheetyCategories,
	TSheetyFacilities,
	TInstructions,
	TSheetyPickupDetails,
	TReasonsForUnrecyclability,
} from "api/sheety/types";
import {
	TInitializeItemsListAction,
	SheetyActionsEnums,
	TInitializeMethodsAction,
	TInitializeCategoriesAction,
	TInitializeFacilitiesAction,
	TInitializeInstructionsAction,
	TinitializePickupDetailsAction,
	TInitializeUnrecyclabilityList,
} from "./types";

const initializeItemsList = (items: Items[]): TInitializeItemsListAction => ({
	type: SheetyActionsEnums.SET_ITEMS_LIST,
	payload: items,
});

const initializeMethodsList = (methods: TSheetyMethods[]): TInitializeMethodsAction => ({
	type: SheetyActionsEnums.SET_METHODS_LIST,
	payload: methods,
});

const initializeCategoriessList = (
	categories: TSheetyCategories[],
): TInitializeCategoriesAction => ({
	type: SheetyActionsEnums.SET_CATEGORIES_LIST,
	payload: categories,
});

const initializeFaciltiesList = (facilities: TSheetyFacilities[]): TInitializeFacilitiesAction => ({
	type: SheetyActionsEnums.SET_FACILITIES_LIST,
	payload: facilities,
});

const initializeInstructionsList = (
	instructions: TInstructions[],
): TInitializeInstructionsAction => ({
	type: SheetyActionsEnums.SET_INSTRUCTIONS_LIST,
	payload: instructions,
});

const initializePickupList = (
	pickUpDetails: TSheetyPickupDetails[],
): TinitializePickupDetailsAction => ({
	type: SheetyActionsEnums.SET_PICKUP_LIST,
	payload: pickUpDetails,
});

const initializeUnrecyclabilityList = (
	unrecyclableDetails: TReasonsForUnrecyclability[],
): TInitializeUnrecyclabilityList => ({
	type: SheetyActionsEnums.SET_UNRECYCLABILITY_LIST,
	payload: unrecyclableDetails,
});

export const SheetyActions = {
	initializeItemsList,
	initializeCategoriessList,
	initializeMethodsList,
	initializeFaciltiesList,
	initializeInstructionsList,
	initializePickupList,
	initializeUnrecyclabilityList,
};
