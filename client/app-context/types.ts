import { Item } from "./sheety/types";

type UserSelection = any;

export interface AppContextState {
	recyclableItems: {
		isLoaded: boolean;
		data: Item[];
	};
	userSelection: UserSelection[];
}

export enum Actions {
	SET_ITEMS_LIST = "SET_ITEMS_LIST",
	SET_USER_SELECTION = "SET_USER_SELECTION",
}

type TInitializeItemsListAction = {
	type: Actions.SET_ITEMS_LIST;
	items: Item[];
};
type TSetUserSelectionAction = {
	type: Actions.SET_USER_SELECTION;
	selection: UserSelection[];
};

export type AppContextActions = TInitializeItemsListAction | TSetUserSelectionAction;
