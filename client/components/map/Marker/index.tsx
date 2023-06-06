// Marker Component to be dynamically imported
import { Marker } from "react-leaflet";
import useLeafletDivIcon from "hooks/useLeafletDivIcon";
import useMapContext from "hooks/useMapContext";
import MarkerIconWrapper, { CustomMarkerProps } from "./MarkerIconWrapper";

export const CustomMarker: React.FC<{
	position: CustomMarkerProps["position"];
	icon: CustomMarkerProps["icon"];
	color: CustomMarkerProps["color"];
}> = ({ position, icon, color }: CustomMarkerProps) => {
	const { map } = useMapContext();
	const { divIcon } = useLeafletDivIcon();

	const handleMarkerClick = () => map?.panTo(position);

	return (
		<Marker
			position={position}
			icon={divIcon({
				source: <MarkerIconWrapper color={color} icon={icon} />,
				anchor: [26, 26],
			})}
			eventHandlers={{ click: handleMarkerClick }}
		></Marker>
	);
};
