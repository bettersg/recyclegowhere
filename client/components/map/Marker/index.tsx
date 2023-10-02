// Marker Component to be dynamically imported
import { Marker } from "react-leaflet";
import useLeafletDivIcon from "hooks/useLeafletDivIcon";
import MarkerIconWrapper, { CustomMarkerProps } from "./MarkerIconWrapper";

export const CustomMarker: React.FC<{
	position: CustomMarkerProps["position"];
	icon: CustomMarkerProps["icon"];
	color: CustomMarkerProps["color"];
	handleOnClick: () => void;
	category?: string;
  isSelected?: boolean;
}> = ({ position, icon, color, handleOnClick, category, isSelected }) => {
	const { divIcon } = useLeafletDivIcon();

	return (
		<Marker
			position={position}
			icon={divIcon({
				source: <MarkerIconWrapper color={color} icon={icon} category={category} isSelected={isSelected} />,
			})}
			eventHandlers={{ click: handleOnClick }}
		/>
	);
};
