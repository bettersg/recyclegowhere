import { getSheetyData } from "api/sheety";
import { Sheets } from "api/sheety/constants";
import {
	Items,
	TSheetyMethods,
	TSheetyCategories,
	TSheetyFacilities,
	TInstructions,
	TSheetyPickupDetails,
	TReasonsForUnrecyclability,
} from "api/sheety/types";
import { createContext, Dispatch, ReactNode, useEffect, useReducer } from "react";
import { AppContextReducer } from "./reducer";
import { AppContextActions, AppContextState } from "./types";
import { initialSheetyState } from "./SheetyContext";
import { initialUserSelectionState } from "./UserSelectionContext";
import { SheetyActions } from "./SheetyContext/actions";

interface IAppContext {
	state: AppContextState;
	dispatch: Dispatch<AppContextActions>;
}

const initialState: AppContextState = {
	...initialSheetyState,
	...initialUserSelectionState,
};

const initialContextState: IAppContext = {
	state: initialState,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	dispatch: () => {},
};

export const AppContext = createContext(initialContextState);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(AppContextReducer, initialState);

	useEffect(() => {
		const fetchItems = async () => {
			const res = await getSheetyData<Items>(Sheets.ITEMS_SHEET_NAME);

			dispatch(SheetyActions.initializeItemsList(res));
		};
		const fetchMethods = async () => {
			const res = await getSheetyData<TSheetyMethods>(Sheets.METHODS_SHEET_NAME);
			dispatch(SheetyActions.initializeMethodsList(res));
		};
		const fetchCategories = async () => {
			const res = await getSheetyData<TSheetyCategories>(Sheets.CATEGORIES_SHEET_NAME);
			dispatch(SheetyActions.initializeCategoriessList(res));
		};
		const fetchInstructions = async () => {
			const res = await getSheetyData<TInstructions>(Sheets.INSTRUCTIONS_SHEET_NAME);
			dispatch(SheetyActions.initializeInstructionsList(res));
		};
		const fetchFacilities = async () => {
			const res = await getSheetyData<TSheetyFacilities>(Sheets.FACILITIES_SHEET_NAME);
			dispatch(SheetyActions.initializeFaciltiesList(res));
		};
		const fetchPickUpDetails = async () => {
			const res = await getSheetyData<TSheetyPickupDetails>(Sheets.PICKUP_SHEET_NAME);
			dispatch(SheetyActions.initializePickupList(res));
		};
		const fetchUnrecyclabilityDetails = async () => {
			const res = await getSheetyData<TReasonsForUnrecyclability>(
				Sheets.UNRECYCLABILITY_SHEET_NAME,
			);
			dispatch(SheetyActions.initializeUnrecyclabilityList(res));
		};

		fetchItems();
		fetchMethods();
		fetchCategories();
		fetchInstructions();
		fetchFacilities();
		fetchPickUpDetails();
		fetchUnrecyclabilityDetails();
	}, []);

	return (
		<AppContext.Provider
			value={{
				state,
				dispatch,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
