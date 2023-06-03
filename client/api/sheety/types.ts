import { Categories, Methods } from "./enums";

export type Items = {
	"s/n": number;
	name: string;
	category: string;
};
export type TSheetyMethods = {
	"s/n": number;
	name: Methods;
};
export type TSheetyCategories = {
	id: number;
	itemCategories: Categories;
	method1: string;
	method2?: string;
	method3?: string;
	method4?: string;
};

export type TInstructions = {
	"s/n": number;
	name: string;
	category: string;
	step1: string;
	step2?: string;
	step3?: string;
};

export type TSheetyFacilities = {
	id: number;
	address: string;
	categoriesAccepted: string;
	channelName: string;
	contact: string;
	latitude: number;
	longitude: number;
	methodsAccepted: string;
	operatingHours: string;
	["orgType (recyclingPointsOnly)"]: string;
	organisationName: string;
	["otherFormsOfContact (string)"]: string;
	postcode: number;
	remarks: string;
	type: string;
	website: string;
};

export type TSheetyPickupDetails = {
	"s/n": number;
	organisationName: string;
	website: string;
	categoriesAccepted: string;
	time: string;
	minimumWeightInKg: string;
	pricingTermsInSgd: string;
	contactMethod: string;
	contactDetail: string;
	lastUpdated: string;
}