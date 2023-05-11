import { Categories } from "api/sheety/enums";
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

	const getItemCategory = (itemName: string) =>
		data.find((i) => i.name === itemName)?.category as Categories;

	return {
		isLoaded,
		items: data,
		methods,
		categories,
		facilities,
		getItemCategory,
	};
};