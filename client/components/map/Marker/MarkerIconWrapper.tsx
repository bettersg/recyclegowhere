// General component that controls the display of the markers
// If clustered, "label" is passed in as an argument
// If not clustered, "label" is not passed in as an argument
import { LatLngExpression } from "leaflet";
import { Box, Text, Image } from "@chakra-ui/react";
import { IconProps } from "@chakra-ui/icons";

export interface CustomMarkerProps {
	position: LatLngExpression;
	icon?: React.ComponentType<IconProps>; // Update the type here
	color: string;
	label?: number;
	category: string;
	isSelected?: boolean;
}

const MarkerIconWrapper = ({
	icon: IconFC,
	color,
	label,
	category,
	isSelected = false,
}: Partial<CustomMarkerProps>) => {
	return (
		<Box className={`marker-icon-wrapper ${isSelected ? "selected" : ""}`}>
			{IconFC &&
				(label ? (
					<IconFC className="cluster-marker-size" />
				) : (
					<IconFC className="marker-size" />
				))}

			{label && (
				<Text
					className="marker-text"
					style={{
						transform:
							label < 10
								? "translateX(200%)"
								: label < 100
								? "translateX(70%)"
								: "translateX(35%)",
					}}
				>
					{label}
				</Text>
			)}

			{category && (
				<>
					<Image
						className="marker-circle"
						src={"/icons/blueicons/icon_circle.png"}
						alt="Circle behind category icon"
					/>
					<Image
						className="marker-image"
						src={`/icons/blueicons/${category}.png`}
						alt={`${category} icon`}
					/>
				</>
			)}
		</Box>
	);
};

export default MarkerIconWrapper;
