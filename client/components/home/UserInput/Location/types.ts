type OneMapResponseResults = {
	SEARCHVAL: string;
	BLK_NO: string;
	ROAD_NAME: string;
	BUILDING: string;
	ADDRESS: string;
	POSTAL: string;
	X: string;
	Y: string;
	LATITUDE: string;
	LONGITUDE: string;
	LONGTITUDE: string;
};
export type OneMapResponse = {
	found: number;
	totalNumPages: number;
	pageNum: number;
	results: OneMapResponseResults[];
};
