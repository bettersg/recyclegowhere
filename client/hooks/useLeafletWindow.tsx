import { useEffect, useState } from "react";

const useLeafletWindow = () => {
	const [leafletWindow, setLeafletWindow] = useState(
		// Honestly not sure what type window.L should be - defined it as any in leaflet.d.ts
		typeof window === "undefined" ? undefined : window.L,
	);

	useEffect(() => {
		const interval = setInterval(() => {
			if (window.L) {
				setLeafletWindow(window.L);
				clearInterval(interval);
			}
		}, 100);
		return () => clearInterval(interval);
	}, []);

	return leafletWindow;
};

export default useLeafletWindow;
