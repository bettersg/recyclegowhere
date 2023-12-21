import Leaflet, { DivIcon } from "leaflet";
import { renderToString } from "react-dom/server";

interface divIconValues {
	source: JSX.Element;
	className?: string;
}

const useLeafletDivIcon = () => {
	const divIcon = ({ source, className }: divIconValues) =>
		Leaflet?.divIcon({
			html: renderToString(source),
			className,
		}) as DivIcon;
	return { divIcon };
};

export default useLeafletDivIcon;
