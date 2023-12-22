import { Flex, Box, Button, HStack, Text, VStack, Image } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { useState } from "react";
import styles from "components/home/hideScrollbar.module.css";
import { Chip } from "./FilterPanel";
import { useSheetyData } from "hooks/useSheetyData";
import { categoriesProcessor } from "./utils";
import { TItemSelection, TEmptyItem } from "app-context/SheetyContext/types";
import { Methods } from "api/sheety/enums";
import { RecyclingLocationResults } from "app-context/UserSelectionContext/types";
import Link from "next/link";
export const RouteCard = ({
	items,
	route,
	results,
}: {
	items: (TItemSelection | TEmptyItem)[];
	route: RecyclingLocationResults["route"];
	results: RecyclingLocationResults["results"];
}) => {
	const { getFacility, getItemCategory } = useSheetyData();
	const [isExpanded, setIsExpanded] = useState(false);
	const [translateY, setTranslateY] = useState(50);
	const handleMovement = () => {
		isExpanded ? setTranslateY(50) : setTranslateY(0);
		setIsExpanded(!isExpanded);
	};

	const calculateSum = (arr: number[]) => {
		return arr.reduce((accumulator, value) => {
			return accumulator + value;
		}, 0);
	};

	return (
		<Flex
			h={"300px"}
			bg="white"
			paddingBottom={2}
			position={"fixed"}
			transform={`translate(-50%, ${translateY}%)`}
			bottom={0}
			left="50%"
			width={{ base: "86%", sm: "50%", md: "40%", lg: "25%" }}
			zIndex={1000}
			rounded="xl"
			flexDir={"column"}
			transition={"transform 0.3s ease-in-out"}
		>
			{/* Gradient */}
			{!isExpanded && (
				<Box
					position={"fixed"}
					height={"10%"}
					width={"100%"}
					bottom={"50%"}
					zIndex={1001}
					bgGradient={"linear(transparent 0%, white 60%)"}
				/>
			)}
			<Button height={"10%"} padding={1} bg={"white"} onClick={handleMovement}>
				{!isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
			</Button>
			<Flex
				flexDir={"column"}
				paddingInline={3}
				overflowY={"scroll"}
				className={styles.hideScrollbar}
			>
				{/* Header */}
				<HStack mb={2} justifyContent={"space-between"}>
					<Text as="b">
						{route.path.length - 1} stop
						{route.path.length > 2 && "s"}
					</Text>
					<Text as="b">
						Total {(calculateSum(route.distanceBtwFacilities) * 1000).toFixed(0)}m
					</Text>
				</HStack>
				{/* Routes */}
				{route.path.slice(1).map((facID: number, idx) => {
					const facility = getFacility(facID);
					const itemsAccepted = items.filter((item) => {
						return (
							facility.categoriesAccepted.includes(getItemCategory(item.name)) &&
							facility.methodsAccepted.includes(item.method as Methods)
						);
					});
					return (
						<HStack key={facID} w={"100%"} mb={5}>
							<Box height="full" w={"5%"} alignSelf={"start"}>
								<Box w="full" h="full">
									<Image
										h="6%"
										ml={0}
										src={"/blueCircle.png"}
										alt="blue circle"
									/>
									<Image
										ml={1}
										h="90%"
										justifySelf={"center"}
										src={"/blueLine.png"}
										alt="blue line"
									/>
								</Box>
							</Box>
							<VStack alignSelf={"start"} w={"95%"} gap={1}>
								<Flex
									w={"full"}
									flexDirection={"row"}
									justifyContent={"space-between"}
									mb={0}
								>
									<Text as="b" fontSize={"sm"} w={"70%"}>
										{facility.channelName}
									</Text>
									<Flex gap={5} w={"30%"}>
										<Text fontSize={"xs"} w={"50%"}>
											{itemsAccepted.length} item
											{itemsAccepted.length > 1 && "s"}
										</Text>
										<Text fontSize={"xs"} w={"50%"}>
											{(route.distanceBtwFacilities[idx] * 1000).toFixed(0)}m
										</Text>
									</Flex>
								</Flex>
								<Text w={"full"} fontSize={"xs"}>
									{facility.address}
								</Text>
								<Flex
									mt={2}
									flex={1}
									gap={2}
									flexWrap="wrap"
									maxH="70px"
									overflow="auto"
									alignItems="center"
									justifyContent={"start"}
									w={"full"}
								>
									{itemsAccepted &&
										itemsAccepted.map((item, idx) => (
											<Chip isChecked={true} key={idx}>
												{item.name}
											</Chip>
										))}
								</Flex>
								<Box w="full">
									<Text fontSize={"xs"} as="b">
										They also accept:
									</Text>
									<Text fontSize={"xs"}>
										{categoriesProcessor(facility.categoriesAccepted)}
									</Text>
									<Box w={"full"} mt={5}>
										{facility.website ? (
											<Text fontSize={"xs"}>
												Please check{" "}
												<Link href={facility.website}>
													<Text
														as="span"
														color="blue.500"
														_hover={{ cursor: "pointer" }}
														textDecoration={"underline"}
													>
														here
													</Text>
												</Link>{" "}
												for more information.
											</Text>
										) : (
											<Text fontSize={"xs"}>
												No website available for this facility. :(
											</Text>
										)}
									</Box>
								</Box>
							</VStack>
						</HStack>
					);
				})}
				<Button isDisabled={true} w="full" p={5} gap={2} bgColor={"teal"} color="white">
					<ExternalLinkIcon />
					<Text>Get Directions</Text>
				</Button>
			</Flex>
		</Flex>
	);
};
