import Leaflet from "leaflet";
import { renderToString } from "react-dom/server";

interface divIconValues {
	source: JSX.Element;
}

const useLeafletDivIcon = () => {
	const divIcon = ({ source }: divIconValues) =>
		Leaflet?.divIcon({
			html: renderToString(source),
		});
	return { divIcon };
};

export default useLeafletDivIcon;
