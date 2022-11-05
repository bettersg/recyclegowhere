import { AppContext } from "app-context/index";
import { useContext } from "react";

export const useRecyclableItemList = () => {
	const {
		state: {
			recyclableItems: { isLoaded, data },
		},
	} = useContext(AppContext);

	return {
		isLoaded,
		items: data,
	};
};
