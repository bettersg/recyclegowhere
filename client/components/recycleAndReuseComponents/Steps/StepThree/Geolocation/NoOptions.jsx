import { components } from "react-select";

export const NoOptions = (props) => {
	return (
		<components.NoOptionsMessage {...props}>
			<span>Please enter your address to find your location.</span>
		</components.NoOptionsMessage>
	);
};
