import axios from "axios";
import { SHEETY_BASE_URL, SHEET_NAME } from "./constants";
import { SheetyResponse } from "./types";

export async function GetSheetData() {
	try {
		const sheetPath = `${SHEETY_BASE_URL}/${SHEET_NAME}`;
		const res = await axios.get<SheetyResponse>(sheetPath, {
			headers: {
				Accept: "application/json",
			},
		});
		const Items = res.data["itemsList (final)"];

		return Items;
	} catch (error) {
		return [];
		//TODO: handle errors

		// if (axios.isAxiosError(error)) {
		// 	return error.message;
		// } else {
		// 	return "An unexpected error has occured";
		// }
	}
}
