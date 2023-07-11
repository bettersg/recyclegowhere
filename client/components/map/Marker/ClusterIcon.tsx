import { Icon } from "@chakra-ui/react";
import { IconProps } from "@chakra-ui/icons";

// Map Icon (placeholder for testing)
const ClusterIcon = (props: IconProps) => (
	<Icon viewBox="0 0 200 200" {...props}>
		<path
			d="M29 77.8903C12.3318 61.8834 4 50.6184 4 39.414C4 32.4086 6.63392 25.6901 11.3223 20.7365C16.0107 15.7829 22.3696 13 29 13C35.6304 13 41.9893 15.7829 46.6777 20.7365C51.3661 25.6901 54 32.4086 54 39.414C54 50.6184 45.6682 61.8834 29 77.8903Z"
			fill="#004BBB"
		/>
		<ellipse cx="29" cy="37.9586" rx="18.75" ry="18.7184" fill="white" />
		<circle cx="29" cy="81" r="3" fill="#004BBB" />
		<path
			d="M53 27.875C59.8812 27.875 65.5 22.3777 65.5 15.5469C65.5 8.71606 59.8812 3.21875 53 3.21875C46.1188 3.21875 40.5 8.71606 40.5 15.5469C40.5 22.3777 46.1188 27.875 53 27.875Z"
			fill="#004BBB"
			stroke="#004BBB"
			stroke-width="3"
		/>
	</Icon>
);

export default ClusterIcon;
