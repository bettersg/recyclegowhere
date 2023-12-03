import { Polyline } from "react-leaflet";

export const CustomPolyline: React.FC<{
	lineCoords: [number, number][];
	color: string;
}> = ({ lineCoords, color }) => {
	return <Polyline positions={lineCoords} color={color} />;
};
