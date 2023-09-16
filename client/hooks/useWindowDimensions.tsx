import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

export const useWindowDimensions = () => {
	const [windowDimensions, setWindowDimensions] = useState<{
		width: number;
		height: number;
	}>({
		width: 0,
		height: 0,
	});
	const updateSize = () =>
		setWindowDimensions({
			width: window.innerWidth,
			height: window.innerHeight,
		});

	useEffect(() => (window.onresize = updateSize), []);

	return windowDimensions;
};
