import oneMapRecyclingBin from "../../../../../jsonfiles/One-Map-Recycling-Bin.json";
import physicalChannels from "../../../../../jsonfiles/Physical-Channel.json";

function toRadians(Value) {
	return (Value * Math.PI) / 180;
}

const kmInR = 6371;

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
			distance:
				Math.round(
					calcCrow(lat, lng, bin.latitude, bin.longitude) * 100,
				) / 100,
			latitude: bin.latitude,
			longitude: bin.longitude,
			block_number: bin.block_number,
		});
	}
	sortByDistance(result);
	result[0].items = items;

	return result[0];
};

const setNearestLocation = (place) => {
	let obj = {};

	obj.id = place.id;
	obj.postal = place.postcode;
	obj.latitude = place.latitude;
	obj.longitude = place.longitude;
	obj.address = place.address;
	obj.channel_name = place.channel_name;
	obj.operating_hours = place.operating_hours;
	obj.contact = place.contact;
	obj.website = place.website;
	obj.categories_accepted = place.categories_accepted;
	obj.organisation_name = place.organisation_name;
	obj.type = place.type;

	return obj;
};

export const getNearestNonBlueBinFacilities = (items, { lat, lng }) => {
	if (!items.length) {
		return null;
	}

	const results = [];

	for (const item of items) {
		let distance = null;
		let nearestLocation = null;

		for (const place of physicalChannels) {
			if (
				place.categories_accepted.includes(item.category) &&
				place.type.includes(item.condition)
			) {
				let calcDist = Math.round(
					calcCrow(
						lat,
						lng,
						place.latitude,
						place.longitude,
					) * 100,
				) / 100;
				if (!distance || (distance && distance > calcDist)) {
					distance = calcDist;
					nearestLocation = setNearestLocation(place);
					nearestLocation.distance = calcDist;
				}
			}
		}
		const itemNames = [];
		itemNames.push(item.description);
		if (nearestLocation) {
			nearestLocation.items = itemNames;
			results.push(nearestLocation);
		} else {
			//For handling items which do not have a valid location
		}
	}

	const final = [];

	for (const result of results) {
		if (final.length == 0) {
			final.push(result);
		} else {
			let found = false;
			for (const item of final) {
				if (item.id == result.id) {
					found = true;
					item.items.push(result.items[0]);
					break;
				}
			}
			if (!found) {
				final.push(result);
			}
		}
	}

	return final.length ? final : null;
};
