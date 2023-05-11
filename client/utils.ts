import { Categories } from "api/sheety/enums";
import { TItemSelection, TStateFacilities } from "app-context/SheetyContext/types";
import { AddressOption } from "app-context/UserSelectionContext/types";

const EARTH_RADIUS = 6371; // Radius of the earth in km

export const getNearbyFacilities = (
	items: TItemSelection[],
	address: AddressOption,
	facilities: TStateFacilities[],
	getItemCategory: (itemName: string) => Categories,
) => {
	// TODO: get distance for multiple items

	console.time();
	const { name, method } = items[0];
	const cat = getItemCategory(name);
	const distances = new Map(
		facilities.map((facility) => [
			facility.id,
			calculateDistance(
				Number(address.coordinates.lat),
				Number(address.coordinates.long),
				facility.latitude,
				facility.longitude,
			),
		]),
	);

	const temp = facilities.filter(
		(facility) =>
			facility.methodsAccepted.includes(method) && facility.categoriesAccepted.includes(cat),
	);
	temp.sort((a, b) => {
		const distA = distances.get(a.id) as number;
		const distB = distances.get(b.id) as number;

		return distA - distB;
	});

	const slice20 = temp.slice(0, 20);
	console.log(slice20);
	console.log(slice20.map((s) => distances.get(s.id)));
	console.timeEnd();
};

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
	/* thank you ChatGPT */
	/* using Haversine formula */
	const dLat = toRad(lat2 - lat1);
	const dLon = toRad(lon2 - lon1);

	/* square of the half the chord length between the points */
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

	/* angular distance between the points in radians */
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	/* distance in km */
	return EARTH_RADIUS * c;
}

function toRad(degrees: number) {
	return (degrees * Math.PI) / 180;
}
