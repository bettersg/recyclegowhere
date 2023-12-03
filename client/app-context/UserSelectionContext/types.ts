import { TEmptyItem, TItemSelection } from "app-context/SheetyContext/types";
import { LatLngExpression } from "leaflet";
// =============================================================================
// State types
// =============================================================================
type Coordinates = {
	lat: string;
	long: string;
};
export type AddressOption = {
	value: string;
	label: string;
	coordinates: Coordinates;
};
export type FacilityType = { id: number; distance: number; latlng: LatLngExpression };
export type TResult = { facilities: FacilityType[] };

export type RecyclingLocationResults = {
	results: Record<string, TResult>;
	facilitiesList: number[];
	route: { path: number[]; distance: number; coords: [number, number][]; complete: boolean };
};

export interface UserSelectionContextState {
	userSelection: {
		address: AddressOption;
		items: (TItemSelection | TEmptyItem)[];
		recyclingLocationResults?: RecyclingLocationResults;
	};
}

// =============================================================================
// Action types
// =============================================================================
export enum UserSelectionActionsEnums {
	SET_ADDRESS = "SET_ADDRESS",
	SET_USER_SELECTION = "SET_USER_SELECTION",
	SET_RECYLING_LOCATION_RESULTS = "SET_RECYLING_LOCATION_RESULTS",
}

export type TSetUserSelectionAction = {
	type: UserSelectionActionsEnums.SET_USER_SELECTION;
	payload: (TItemSelection | TEmptyItem)[];
};
export type TSetAddressAction = {
	type: UserSelectionActionsEnums.SET_ADDRESS;
	payload: AddressOption;
};
export type TSetRecyclingLocationResults = {
	type: UserSelectionActionsEnums.SET_RECYLING_LOCATION_RESULTS;
	payload: RecyclingLocationResults;
};
