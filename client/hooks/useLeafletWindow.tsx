import { useEffect, useState } from "react";

const useLeafletWindow = () => {
	const [leafletWindow, setLeafletWindow] = useState(
		typeof window === "undefined" ? undefined : window.L,
	);
	console.log("window is ", window.L);

	useEffect(() => {
		const interval = setInterval(() => {
			if (window.L) {
				setLeafletWindow(window);
				clearInterval(interval);
			}
		}, 100);
		return () => clearInterval(interval);
	}, []);

	return leafletWindow;
};

export default useLeafletWindow;
