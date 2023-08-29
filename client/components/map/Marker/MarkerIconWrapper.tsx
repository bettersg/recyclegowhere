// General component that controls the display of the markers
// If clustered, "label" is passed in as an argument
// If not clustered, "label" is not passed in as an argument
import { LatLngExpression } from "leaflet";
import { useMemo } from "react";
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
		<Box position={"relative"} padding={0} margin={0} className="inline-flex ">
			{label && (
				<Box
					position={"absolute"}
					rounded={"full"}
					className="-inset-2 opacity-40"
					style={{ background: "rgba(0,0,0,0)" }}
				/>
			)}

			<Box
				padding={2}
				rounded={"full"}
				position={"relative"}
				className="inline-block"
				style={{ background: "rgba(0,0,0,0)" }}
			>
				{IconFC &&
					(label ? (
						<IconFC className="cluster-marker-size" viewBox="0 0 60 83" />
					) : (
						<IconFC className="marker-size" viewBox="0 0 50 70" />
					))}
				{label && (
					<Box
						position={"relative"}
						top={2}
						// right={-2}
						border={-2}
						borderColor={"white"}
						rounded={"full"}
						height={8}
						width={20}
						alignItems={"center"}
						justifyContent={"end"}
						paddingTop={1}
						backgroundColor={color}
					>
						<Text className="marker-text">{label}</Text>
					</Box>
				)}

				{category && (
					<Image
						className="marker-image"
						src={`/icons/${category}.png`}
						alt={`${category} icon`}
					/>
				)}
			</Box>
			<Box
				position={"absolute"}
				rounded={"full"}
				boxShadow={"md"}
				className={`${label ? "-inset-2" : "-inset-1"}`}
			/>
		</Box>
	);
};

export default MarkerIconWrapper;
