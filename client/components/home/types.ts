/* TODO: move to a common folder once this is confirmed and used elsewhere */
export type TItems = {
	id: number;
	name: string;
	condition: string;
};

export type AddressOption = {
	value: string;
	label: string;
};
export interface ItemObject {
    "s/n": number
    name: string
    category: string
}

export interface CategoriesObject {
	itemCategories: string
	method1: string
	method2: string
	method3: string
	method4: string
	id: number
}
