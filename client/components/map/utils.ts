import { useState } from "react";
export const useForceUpdate = () => {
	const [, setState] = useState(0);
	const forceUpdate = () => setState((prevState) => prevState + 1);
	return forceUpdate;
};
