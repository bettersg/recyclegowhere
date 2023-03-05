import { getSheetyData } from "api/sheety";
import { Sheets } from "api/sheety/constants";
import { Items, TSheetyMethods, TSheetyCategories, TSheetyFacilities } from "api/sheety/types";
import { createContext, Dispatch, ReactNode, useEffect, useReducer } from "react";
import { SheetyActions } from "./actions";
import { AppContextReducer } from "./reducer";
import { AppContextActions, AppContextState } from "./types";

interface IAppContext {
	state: AppContextState;
	dispatch: Dispatch<AppContextActions>;
}

const initialState: AppContextState = {
	recyclableItems: {
		isLoaded: false,
		data: [],
	},
	methods: [],
	categories: [],
	facilities: [],
	userSelection: {
		address: {
			value: "",
			label: "",
			coordinates: {
				lat: "",
				long: "",
			},
		},
		items: [
			{
				name: "",
				method: undefined,
			},
		],
	},
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
		const fetchFacilities = async () => {
			const res = await getSheetyData<TSheetyFacilities>(Sheets.FACILITIES_SHEET_NAME);
			dispatch(SheetyActions.initializeFaciltiesList(res));
		};

		fetchItems();
		fetchMethods();
		fetchCategories();
		fetchFacilities();
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
