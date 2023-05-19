export type Items = {
	"s/n": number;
	name: string;
	category: string;
};
export type Methods = {
	"s/n": number;
	name: string;
};
export type TSheetyCategories = {
	id: number;
	itemCategories: string;
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
