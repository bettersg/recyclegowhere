import { createContext, Dispatch, ReactNode, useReducer } from "react";
import { AppContextReducer } from "./reducer";
import { AppContextActions, AppContextState } from "./types";
import axios from "axios";

type Item = {
	"s/n": number;
	name: string;
	category: string;
};

type SheetyResponse = {
	"itemsList (final)": Item[];
};

interface IAppContext {
	state: AppContextState;
	dispatch: Dispatch<AppContextActions>;
}

const initialState: AppContextState = {
	recyclableItems: [],
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

async function GetSheetData() {
	try {
		const data = await axios.get<SheetyResponse> (
			"https://api.sheety.co/5a6beb2bb1b380b2c7619d503dbaa632/recycleGoWhereBackend [v2]/itemsList (final)",
			{
				headers: {
					Accept: "application/json",
				},
			},
		);

		const Items = [];

		for (let i = 0; i < data["itemsList (final)"].lenght; i++) {
			Items.push(data["itemsList (final)"][i])
		};
		console.log(Items);
		return Items;
		
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return error.message;
		} else {
			return "An unexpected error has occured";
		}
	}
}
