// Marker Component to be dynamically imported
import { Marker } from "react-leaflet";
import useLeafletDivIcon from "hooks/useLeafletDivIcon";
import useMapContext from "hooks/useMapContext";
import MarkerIconWrapper, { CustomMarkerProps } from "./MarkerIconWrapper";

export const CustomMarker: React.FC<{
	position: CustomMarkerProps["position"];
	icon: CustomMarkerProps["icon"];
	color: CustomMarkerProps["color"];
	handleOnClick: () => void;
}> = ({ position, icon, color, handleOnClick }) => {
	const { map } = useMapContext();
	const { divIcon } = useLeafletDivIcon();

	const handleMarkerClick = () => {
		map?.panTo(position);
		handleOnClick();
	};

	return (
		<Marker
			position={position}
			icon={divIcon({
				source: <MarkerIconWrapper color={color} icon={icon} />,
				anchor: [0, 0],
			})}
			eventHandlers={{ click: handleMarkerClick }}
		/>
	);
};
