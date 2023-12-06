import { SHEETY_BASE_URL, Sheets } from "api/sheety/constants";
import { http, HttpResponse } from "msw";
import { methodsSuccessResponse } from "./responses/methods";
import { categoriesSuccessResponse } from "./responses/categories";
import { instructionsSuccessResponse } from "./responses/instructions";
import { facilitiesSuccessResponse } from "./responses/facilities";
import { pickupSuccessResponse } from "./responses/pickup";
import { itemsSuccessResponse } from "./responses/items";
import { unrecyclabilitySuccessResponse } from "./responses/unrecyclability";
import { onemapSuccessResponse } from "./responses/onemap";

export const handlers = [
	http.get(getUrlFromSheetName(Sheets.ITEMS_SHEET_NAME), () => {
		return HttpResponse.json(itemsSuccessResponse);
	}),
	http.get(getUrlFromSheetName(Sheets.METHODS_SHEET_NAME), () => {
		return HttpResponse.json(methodsSuccessResponse);
	}),
	http.get(getUrlFromSheetName(Sheets.CATEGORIES_SHEET_NAME), () => {
		return HttpResponse.json(categoriesSuccessResponse);
	}),
	http.get(getUrlFromSheetName(Sheets.INSTRUCTIONS_SHEET_NAME), () => {
		return HttpResponse.json(instructionsSuccessResponse);
	}),
	http.get(getUrlFromSheetName(Sheets.FACILITIES_SHEET_NAME), () => {
		return HttpResponse.json(facilitiesSuccessResponse);
	}),
	http.get(getUrlFromSheetName(Sheets.PICKUP_SHEET_NAME), () => {
		return HttpResponse.json(pickupSuccessResponse);
	}),
	http.get(getUrlFromSheetName(Sheets.UNRECYCLABILITY_SHEET_NAME), () => {
		return HttpResponse.json(unrecyclabilitySuccessResponse);
	}),
	http.get("https://developers.onemap.sg/commonapi/search*", () => {
		return HttpResponse.json(onemapSuccessResponse);
	}),
];

function getUrlFromSheetName(sheetName: string) {
	return SHEETY_BASE_URL + sheetName.split(" ")[0] + "*";
}
