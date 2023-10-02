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
	label?: string;
	category: string;
}

const MarkerIconWrapper = ({
	icon: IconFC,
	color,
	label,
	category,
}: Partial<CustomMarkerProps>) => {
	return (
		<Box>
      {IconFC &&
        (label ? (
          <IconFC className="cluster-marker-size" />
        ) : (
          <IconFC className="marker-size" />
        ))}
      {label && (
        <Text className="marker-text">{label}</Text>
      )}

      {category && (
        <Image
          className="marker-image"
          src={`/icons/${category}.png`}
          alt={`${category} icon`}
        />
      )}
		</Box>
	);
};

export default MarkerIconWrapper;
