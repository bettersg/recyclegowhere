import { Flex, Text, HStack, Button } from "@chakra-ui/react";
import { TStateFacilities } from "app-context/SheetyContext/types";
import Image from "next/image";
import { COLORS } from "theme";
const FacilityCard = ({
	facCardDetails,
	facCardDistance,
	width,
	left,
}: {
	facCardDetails: TStateFacilities;
	facCardDistance: number;
	width: string;
	left: string;
}) => {
	return (
		<Flex
			position={"fixed"}
			height="150px"
			width={width}
			left={left}
			bg="white"
			zIndex={99999}
			bottom={"80px"}
			rounded="xl"
			flexDir={"row"}
		>
			<Image height={"100%"} width="300px" src={"/placeholder.png"} alt="Image not found." />
			<Flex flexDir={"column"} gap={2} padding={3}>
				<Text fontSize={"xs"} as={"b"} noOfLines={[2]}>
					{facCardDetails.channelName}
				</Text>
				<Text fontSize={"xs"} noOfLines={2}>
					<span style={{ fontWeight: 800 }}>Address:</span> {facCardDetails.address}
				</Text>
				<Text fontSize={"xs"} noOfLines={2}>
					<span style={{ fontWeight: 800 }}>Categories Accepted: </span>
					{facCardDetails.categoriesAccepted.map((category) => category + ", ")}
				</Text>
				<HStack mt={"auto"} justify={"space-between"}>
					<Text fontSize={"xs"} color={COLORS.Button.primary}>
						{Math.trunc(facCardDistance * 1000)}m away
					</Text>
					<Button size={"xs"}>More details</Button>
				</HStack>
			</Flex>
		</Flex>
	);
};
