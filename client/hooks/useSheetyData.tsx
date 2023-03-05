import { AppContext } from "app-context/index";
import { useContext } from "react";

export const useSheetyData = () => {
	const {
		state: {
			recyclableItems: { isLoaded, data },
			methods,
			categories,
			facilities,
		},
	} = useContext(AppContext);

	return {
		isLoaded,
		items: data,
		methods,
		categories,
		facilities,
	};
};
