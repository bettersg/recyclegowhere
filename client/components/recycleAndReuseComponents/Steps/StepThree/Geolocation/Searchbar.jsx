import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { MapControl, withLeaflet } from "react-leaflet";

class SearchBox extends MapControl {
	constructor(props) {
		super(props);
		props.leaflet.map.on("geosearch/showlocation", (e) =>
			props.updateMarker(e),
		);
	}

	createLeafletElement() {
		const searchEl = GeoSearchControl({
			provider: new OpenStreetMapProvider(),
			style: "bar",
			showMarker: true,
			showPopup: false,
			autoClose: true,
			retainZoomLevel: false,
			animateZoom: true,
			keepResult: false,
			searchLabel: "search",
		});
		return searchEl;
	}
}

export const SearchBar = withLeaflet(SearchBox);
