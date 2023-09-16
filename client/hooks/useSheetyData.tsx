import { Categories } from "api/sheety/enums";
import { TStateFacilities } from "app-context/SheetyContext/types";
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
			unrecyclableDetails,
		},
	} = useContext(AppContext);

	const getItemCategory = (itemName: string) =>
		data.find((i) => i.name === itemName)?.category as Categories;

	const getFacility = (facilityID: number) =>
		facilities.find((i) => i.id === facilityID) as TStateFacilities;

	return {
		isLoaded,
		items: data,
		methods,
		categories,
		instructions,
		facilities,
		pickUpServices,
		unrecyclableDetails,
		getItemCategory,
		getFacility,
	};
};
