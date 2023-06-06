// General component that controls the display of the markers
// If clustered, "label" is passed in as an argument
// If not clustered, "label" is not passed in as an argument
import { LatLngExpression } from "leaflet";
import { useMemo } from "react";
import { Box, Text } from "@chakra-ui/react";
import { IconProps } from "@chakra-ui/icons";

export interface CustomMarkerProps {
	position: LatLngExpression;
	icon?: (props: IconProps) => JSX.Element;
	color: string;
	label?: string;
}

const MarkerIconWrapper = ({ icon, color, label }: Partial<CustomMarkerProps>) => {
	const IconFC = useMemo(() => icon ?? null, [icon]);

	return (
		<Box position={"relative"} padding={0} margin={0} className=" inline-flex ">
			{label && (
				<Box
					position={"absolute"}
					rounded={"full"}
					className="-inset-2 opacity-40"
					style={{ backgroundColor: "#000000" }}
				/>
			)}
			<Box
				padding={2}
				rounded={"full"}
				backgroundColor={"81C784"}
				position={"relative"}
				className="inline-block"
				style={{ backgroundColor: color }}
			>
				{IconFC && <IconFC viewBox="-5 0 60 75" boxSize={20} />}
				{label && (
					<Box
						// flex flex-col bg-error
						position={"absolute"}
						top={2}
						// right={-2}
						border={-2}
						borderColor={"white"}
						rounded={"full"}
						height={8}
						width={8}
						alignItems={"center"}
						justifyContent={"end"}
						paddingTop={1}
						backgroundColor={color}
					>
						<Text fontSize={"xs"} textAlign={"end"} textColor={"white"}>
							{label}
						</Text>
					</Box>
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
