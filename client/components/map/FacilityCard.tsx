import { Flex, Text, HStack, Button, Box, VStack, Divider } from "@chakra-ui/react";
import { TEmptyItem, TItemSelection, TStateFacilities } from "app-context/SheetyContext/types";
import { Image } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { COLORS } from "theme";
import React, { ReactNode, useState } from "react";
import styles from "components/home/hideScrollbar.module.css";
import Link from "next/link";
import { useSheetyData } from "hooks/useSheetyData";
import { CheckIcon } from "@chakra-ui/icons";
import { categoriesProcessor } from "./utils";
export const FacilityCard = ({
	items,
	facCardDetails,
	facCardDistance,
}: {
	items: (TItemSelection | TEmptyItem)[];
	facCardDetails: TStateFacilities;
	facCardDistance: number;
}) => {
	const { getItemCategory } = useSheetyData();

	const [isExpanded, setIsExpanded] = useState(false);
	const [translateY, setTranslateY] = useState(50);
	const handleMovement = () => {
		isExpanded ? setTranslateY(50) : setTranslateY(0);
		setIsExpanded(!isExpanded);
	};

	const itemsAccepted = items.filter((item) => {
		return facCardDetails.categoriesAccepted.includes(getItemCategory(item.name));
	});

	const itemsNotAccepted = items.filter((item) => {
		return !facCardDetails.categoriesAccepted.includes(getItemCategory(item.name));
	});

	return (
		<Flex
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
			<Button height={"1%"} padding={1} bg={"white"} onClick={handleMovement}>
				{!isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
			</Button>
			<Flex
				flexDir={"column"}
				paddingInline={3}
				overflowY={"scroll"}
				className={styles.hideScrollbar}
			>
				<HStack gap={2}>
					<Flex justify={"start"} width={"40%"} height={"auto"}>
						<Image
							height={"100%"}
							width={"100%"}
							src={"/placeholder.png"}
							alt="Image not found."
							zIndex={1002}
						/>
					</Flex>
					<VStack width={"60%"} height={"100%"} maxHeight={"100%"} alignItems={"start"}>
						<Text fontSize={"md"} color={COLORS.Button.primary}>
							{Math.trunc(facCardDistance * 1000)}m
						</Text>
						<Text fontSize={"lg"} as={"b"} noOfLines={[2]}>
							{facCardDetails.channelName}
						</Text>
						<Text fontSize={"sm"} noOfLines={3}>
							{/* <span style={{ fontWeight: 800 }}>Address:</span>{" "} */}
							{facCardDetails.address}
						</Text>
						<Button
							bg={COLORS.Button.primary}
							textColor={"white"}
							mt={"auto"}
							size={"md"}
							width={"100%"}
							gap={3}
							padding={3}
							zIndex={1002}
						>
							<ExternalLinkIcon />
							<Text>Get directions</Text>
						</Button>
					</VStack>
				</HStack>
				<Flex p={2} gap={2} flexDir={"column"}>
					<Text fontSize={"sm"} as={"b"}>
						They accept {itemsAccepted.length} of {items.length} item(s):
					</Text>
					<Flex gap={2} fontSize={"xs"} width={"100%"} wrap={"wrap"}>
						{itemsAccepted.map((item, idx) => (
							<AcceptedTab key={idx}>{item.name}</AcceptedTab>
						))}
						{itemsNotAccepted.map((item, idx) => (
							<UnacceptedTab key={idx}>{item.name}</UnacceptedTab>
						))}
					</Flex>
					<Text fontSize={"sm"} as={"b"}>
						They also accept these items:
					</Text>
					<Flex gap={2} fontSize={"xs"} fontWeight={500} width={"100%"} wrap={"wrap"}>
						{categoriesProcessor(facCardDetails.categoriesAccepted)}
					</Flex>
					<Text mt={5} fontSize={"sm"}>
						{facCardDetails.website ? (
							<>
								Please check{" "}
								<Link href={facCardDetails.website}>
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
							</>
						) : (
							<>No website available for this facility. :(</>
						)}
					</Text>
					<Divider />
					<Text fontSize={"sm"} as={"b"} textAlign={"center"}>
						Still got things to recycle?
						<br />
						Uncle sem help you find a place for them:
					</Text>
					<Button
						bg={COLORS.Button.primary}
						textColor={"white"}
						mt={"auto"}
						size={"md"}
						width={"100%"}
						gap={3}
						padding={3}
						isDisabled={true}
					>
						See where to recycle the rest
					</Button>
				</Flex>
			</Flex>
		</Flex>
	);
};

const AcceptedTab: React.FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<Box
			bg={"#CCECD5"}
			borderRadius={"42px"}
			minWidth={"fit-content"}
			padding={"5px 10px"}
			borderColor={COLORS.Button.primary}
			border={"1px"}
		>
			<CheckIcon color="teal.500" mr={1} />
			{children}
		</Box>
	);
};

const UnacceptedTab: React.FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<Box bg={"#E0F0EF"} borderRadius={"42px"} minWidth={"fit-content"} padding={"5px 10px"}>
			{children}
		</Box>
	);
};
