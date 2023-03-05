import { Categories, Methods } from "api/sheety/enums";
import { TSheetyCategories, TSheetyFacilities } from "api/sheety/types";
import { TStateCategories, TStateFacilities } from "./types";

export const transformCategory = ({
	id,
	itemCategories,
	..._methods
}: TSheetyCategories): TStateCategories => {
	const methods = [_methods.method1, _methods.method2, _methods.method3, _methods.method4];
	return {
		id,
		itemCategories,
		methods: methods.filter((m) => !!m) as Methods[],
	};
};

export const transformFacility = (facility: TSheetyFacilities): TStateFacilities => {
	const {
		address,
		categoriesAccepted,
		channelName,
		contact,
		id,
		latitude,
		longitude,
		methodsAccepted,
		operatingHours,
		organisationName,
		postcode,
		remarks,
		type,
		website,
	} = facility;
	return {
		address,
		categoriesAccepted: categoriesAccepted.split(", ") as Categories[],
		channelName,
		contact,
		id,
		latitude,
		longitude,
		methodsAccepted: methodsAccepted.split(", ") as Methods[],
		operatingHours,
		organisationName,
		postcode,
		remarks,
		type,
		website,
		recyclingSubCategory: facility["orgType (recyclingPointsOnly)"],
		otherFormsOfContact: facility["otherFormsOfContact (string)"],
	};
};
