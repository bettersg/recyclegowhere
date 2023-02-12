import { getSheetyData } from "api/sheety";
import { Sheets } from "api/sheety/constants";
import { TSheetyCategories, Items, Methods } from "api/sheety/types";
import { createContext, Dispatch, ReactNode, useEffect, useReducer } from "react";
import { AppContextReducer } from "./reducer";
import { Actions, AppContextActions, AppContextState } from "./types";

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
	userSelection: {
		addressCoordinates: {
			lat: "",
			long: "",
		},
		items: [],
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
			dispatch({ type: Actions.SET_ITEMS_LIST, items: res });
		};
		const fetchMethods = async () => {
			const res = await getSheetyData<Methods>(Sheets.METHODS_SHEET_NAME);
			dispatch({ type: Actions.SET_METHODS_LIST, methods: res });
		};
		const fetchCategories = async () => {
			const res = await getSheetyData<TSheetyCategories>(Sheets.CATEGORIES_SHEET_NAME);
			dispatch({ type: Actions.SET_CATEGORIES_LIST, categories: res });
		};

		fetchItems();
		fetchMethods();
		fetchCategories();
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
