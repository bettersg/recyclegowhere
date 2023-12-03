import { Categories } from "api/sheety/enums";

const capitalizeFirstLetter = (word: string) => {
	return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

export const categoriesProcessor = (categories: Categories[]) => {
	const categorySplit = categories.map((category: Categories) => {
		const words = category.split("_");
		const capitaliseWords = words.map((word: string) => capitalizeFirstLetter(word));
		return capitaliseWords.join(" ");
	});
	return categorySplit.join(", ");
};
