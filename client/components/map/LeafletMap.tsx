// Map Component for Leaflet.js
import { MapContainer, TileLayer } from "react-leaflet";
import { LatLngExpression, MapOptions } from "leaflet";
import { useState, useEffect } from "react";
import useMapContext from "../../hooks/useMapContext";

import "leaflet/dist/leaflet.css";

export const LeafletMap: React.FC<
	{
		center: LatLngExpression;
		children: JSX.Element | JSX.Element[];
		zoom: number;
	} & MapOptions
> = ({ ...options }) => {
	const { setMap } = useMapContext();
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	return (
		<>
			{isClient && (
				<MapContainer
					style={{ height: "60vh", width: "100%" }}
					ref={(e) => setMap && setMap(e || undefined)}
					className="w-full h-screen absolute outline-0 text-white"
					{...options}
				>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
						url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
					/>
					{options.children}
				</MapContainer>
			)}
		</>
	);
};
