import { Categories } from "api/sheety/enums";
import { AppContext } from "app-context/index";
import { useContext } from "react";

export const useSheetyData = () => {
	const {
		state: {
			recyclableItems: { isLoaded, data },
			methods,
			categories,
			instructions,
			facilities,
			pickUpServices,
		},
	} = useContext(AppContext);

	const getItemCategory = (itemName: string) =>
		data.find((i) => i.name === itemName)?.category as Categories;

	const processCategory = (str: string) => {
		return str
			.replace(/_/g, " ") // Replace underscores with spaces
			.replace(
				/\b\w+/g,
				(word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
			);
	};

	return {
		isLoaded,
		items: data,
		methods,
		categories,
		instructions,
		facilities,
		pickUpServices,
		getItemCategory,
		processCategory,
	};
};
