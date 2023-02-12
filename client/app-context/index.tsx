import { createContext, Dispatch, ReactNode, useEffect, useReducer } from "react";
import { AppContextReducer } from "./reducer";
import { GetSheetData } from "./sheety";
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
	userSelection: [],
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
		const fetchSheetyData = async () => {
			const sheetdata = await GetSheetData();
			dispatch({ type: Actions.SET_ITEMS_LIST, items: sheetdata });
		};
		fetchSheetyData();
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
