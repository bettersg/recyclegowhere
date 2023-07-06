import { Flex, Text } from "@chakra-ui/react";
import { TStateFacilities } from "app-context/SheetyContext/types";
import Image from "next/image";

const FacilityCard = ({
	facCardDetails,
	width,
	left,
}: {
	facCardDetails: TStateFacilities;
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
			<Image height={"100%"} width={"50%"} src={"/placeholder.png"} alt="Image not found." />
			<Flex flexDir={"column"} gap={3} padding={2}>
				<Text fontSize={"sm"} as={"b"}>
					{facCardDetails.channelName}
				</Text>
				<Text fontSize={"xs"}>
					<b>Address:</b> {facCardDetails.address}
				</Text>
				<Text fontSize={"xs"}>
					<b>Categories Accepted: </b>
					{facCardDetails.categoriesAccepted.map((category) => category + ", ")}
				</Text>
			</Flex>
		</Flex>
	);
};

export default FacilityCard;
