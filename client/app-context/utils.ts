import { TSheetyCategories } from "api/sheety/types";
import { TStateCategories } from "./types";

export const transformCategory = ({
	id,
	itemCategories,
	..._methods
}: TSheetyCategories): TStateCategories => {
	const methods = [_methods.method1, _methods.method2, _methods.method3, _methods.method4];
	return {
		id,
		itemCategories,
		methods: methods.filter((m) => !!m) as string[],
	};
};
