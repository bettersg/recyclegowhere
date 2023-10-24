import { Categories } from "api/sheety/enums";
import { TItemSelection, TStateFacilities } from "app-context/SheetyContext/types";
import {
	AddressOption,
	RecyclingLocationResults,
	TResult,
} from "app-context/UserSelectionContext/types";
import { LatLngExpression } from "leaflet";

const EARTH_RADIUS = 6371; // Radius of the earth in km
export const MAX_DISTANCE_KM = 6; // Maximum distance from your location to facility

export const getNearbyFacilities = (
	items: TItemSelection[],
	address: AddressOption,
	facilities: TStateFacilities[],
	getItemCategory: (itemName: string) => Categories,
	maxDistance: number,
): RecyclingLocationResults => {
	const res: Record<string, TResult> = {};
	const allFacilityIds: number[] = [];

	for (const item of items) {
		const { name, method } = item;

		const cat = getItemCategory(name);

		const distances = new Map<number, number>();

		const relevantFacilities = facilities.filter((facility) => {
			const { id, methodsAccepted, categoriesAccepted, latitude, longitude } = facility;
			if (!methodsAccepted.includes(method) || !categoriesAccepted.includes(cat)) return false;
			const distance = calculateDistance(
				Number(address.coordinates.lat),
				Number(address.coordinates.long),
				latitude,
				longitude,
			);

			if (distance >= maxDistance) return false;

			distances.set(id, distance);
			allFacilityIds.push(id);
			return true;
		});

		relevantFacilities.sort((a, b) => {
			const distA = distances.get(a.id) as number;
			const distB = distances.get(b.id) as number;

			return distA - distB;
		});

		res[cat] = {
			facilities: relevantFacilities.map((facility) => ({
				id: facility.id,
				distance: distances.get(facility.id) as number,
				latlng: [facility.latitude, facility.longitude] as LatLngExpression,
			})).slice(0, 5),
		};
	}

	return {
		results: res,
		facilitiesList: allFacilityIds.slice(0, 5),
	};
};

/**
 * returns distance in km
 */
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
