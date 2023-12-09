import axios from "axios";
import { OneMapResponse } from "./types";

export const fetchAddresses = async (searchValue: string): Promise<OneMapResponse> => {
	try {
		const url = `https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${searchValue}&returnGeom=Y&getAddrDetails=Y&pageNum=1`;
		const res = await axios.get<OneMapResponse>(url, {
			headers: {
				Accept: "application/json",
			},
		});

		return res.data;
	} catch (error) {
		return {
			found: 0,
			totalNumPages: 1,
			pageNum: 1,
			results: [],
		};
		//TODO: handle errors

		// if (axios.isAxiosError(error)) {
		// 	return error.message;
		// } else {
		// 	return "An unexpected error has occured";
		// }
	}
};
