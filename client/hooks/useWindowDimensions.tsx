import { useLayoutEffect, useState } from "react";

export const useWindowDimensions = () => {
	const [windowDimensions, setWindowDimensions] = useState<{
		width: number;
		height: number;
	}>({
		width: 0,
		height: 0,
	});

	useLayoutEffect(() => {
		const updateSize = () => {
			setWindowDimensions({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		// Initial update after the first render
		updateSize();

		// Add the resize event listener
		window.addEventListener("resize", updateSize);

		// Clean up the event listener on component unmount
		return () => {
			window.removeEventListener("resize", updateSize);
		};
	}, []); // Empty dependency array to run the effect only once after the first render

	return windowDimensions;
};
