import oneMapRecyclingBin from "../../../../../jsonfiles/One-Map-Recycling-Bin.json";
import physicalChannels from "../../../../../jsonfiles/Physical-Channel.json";

function toRadians(Value) {
	return (Value * Math.PI) / 180;
}

const kmInR = 6371;

// only exported for OldGeolocation; can be removed once that file is removed
export const calcCrow = (lat1, lon1, lat2, lon2) => {
	const dLat = toRadians(lat2 - lat1);
	const dLon = toRadians(lon2 - lon1);
	const _lat1 = toRadians(lat1);
	const _lat2 = toRadians(lat2);

	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.sin(dLon / 2) *
			Math.sin(dLon / 2) *
			Math.cos(_lat1) *
			Math.cos(_lat2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const d = kmInR * c;
	return d;
};

const getDistance = (lat1, lon1, lat2, lon2) =>
	Math.round(calcCrow(lat1, lon1, lat2, lon2) * 100) / 100;

const filterBlueBinByPostcode = (postcode) => {
	if (postcode) {
		/* get nearby blue bins by postcode if user entered address */
		const substring = postcode.substring(0, 2);
		const lowerLimit = Number(substring) * 10000;
		const upperLimit = lowerLimit + 10000;

		const nearby = oneMapRecyclingBin.filter(
			(d) => d.postcode > lowerLimit && d.postcode < upperLimit,
		);

		return nearby.length ? nearby : oneMapRecyclingBin;
	}

	/* return all blue bins if user uses 'My Location' */
	return oneMapRecyclingBin;
};

export const sortByDistance = (list) => {
	list.sort(function (a, b) {
		return a.distance - b.distance;
	});
};

export const fetchOneMapSuggestions = async (inputText, callback) => {
	const response = await fetch(
		`https://developers.onemap.sg/commonapi/search?searchVal=${inputText}&returnGeom=Y&getAddrDetails=Y&pageNum=1`,
	);
	const json = await response.json();
	callback(
		json.results.map((i) => ({
			label: i.ADDRESS,
			value: i.POSTAL,
			lat: i.LATITUDE,
			long: i.LONGITUDE,
		})),
	);
};

export const getNearestBlueBin = (items, { lat, lng }, postcode) => {
	if (!items.length) {
		return null;
	}

	const filteredBlueBins = filterBlueBinByPostcode(postcode);
	const result = [];

	for (const bin of filteredBlueBins) {
		result.push({
			postal: bin.postcode,
			distance: getDistance(lat, lng, bin.latitude, bin.longitude),
			latitude: bin.latitude,
			longitude: bin.longitude,
			block_number: bin.block_number,
		});
	}
	sortByDistance(result);
	result[0].items = items;

	return result[0];
};

export const getNearestNonBlueBinFacilities = (items, { lat, lng }) => {
	if (!items.length) {
		return null;
	}

	const allNonBlueBinFacilitiesPerItem = [];

	for (const item of items) {
		const validLocations = [];

		for (const place of physicalChannels) {
			if (
				place.categories_accepted.includes(item.category) &&
				place.type.includes(item.condition)
			) {
				validLocations.push({
					id: place.id,
					postal: place.postcode,
					distance: getDistance(
						lat,
						lng,
						place.latitude,
						place.longitude,
					),
					latitude: place.latitude,
					longitude: place.longitude,
					address: place.address,
					channel_name: place.channel_name,
					operating_hours: place.operating_hours,
					contact: place.contact,
					website: place.website,
					categories_accepted: place.categories_accepted,
					organisation_name: place.organisation_name,
					type: place.type,
				});
			}
		}

		sortByDistance(validLocations);
		if (validLocations.length > 0) {
			const nearestLocation = validLocations[0];
			const itemNames = [];
			itemNames.push(item.description);
			nearestLocation.items = itemNames;
			allNonBlueBinFacilitiesPerItem.push(nearestLocation);
		}
	}

	const results = [];

	for (const facility of allNonBlueBinFacilitiesPerItem) {
		if (results.length == 0) {
			results.push(facility);
		} else {
			let found = false;
			for (const result of results) {
				if (facility.id == result.id) {
					found = true;
					result.items.push(facility.items[0]);
					break;
				}
			}
			if (!found) {
				results.push(facility);
			}
		}
	}

	return results.length ? results : null;
};
