import axios from "axios";
import { Sheets } from "./constants";
import { getSheetyUrl } from "./utils";

export const getSheetyData = async <T>(sheet: Sheets): Promise<T[]> => {
	try {
		const sheetPath = getSheetyUrl(sheet);
		const res = await axios.get<Record<Sheets, T[]>>(sheetPath, {
			headers: {
				Accept: "application/json",
			},
		});

		return res.data[sheet];
	} catch (error) {
		return [];
		//TODO: handle errors

		// if (axios.isAxiosError(error)) {
		// 	return error.message;
		// } else {
		// 	return "An unexpected error has occured";
		// }
	}
};
