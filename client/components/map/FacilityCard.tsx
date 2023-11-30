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
import { Categories } from "api/sheety/enums";
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

	const TRANSLATION_DIST = -50;
	const [translateY, setTranslateY] = useState(0);
	const handleMovement = () => {
		translateY === TRANSLATION_DIST ? setTranslateY(0) : setTranslateY(TRANSLATION_DIST);
	};
	const widths = ["86%", "50%", "40%", "25%"];
	const lefts = ["7%", "25%", "30%", "37.5%"];
	const bottoms = ["-27%", "-27%", "-27%", "-27%", "-25%"];

	const itemsAccepted = items.filter((item) => {
		return facCardDetails.categoriesAccepted.includes(getItemCategory(item.name));
	});

	const itemsNotAccepted = items.filter((item) => {
		return !facCardDetails.categoriesAccepted.includes(getItemCategory(item.name));
	});

	const capitalizeFirstLetter = (word: string) => {
		return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
	};

	const categoriesProcessor = (categories: Categories[]) => {
		const categorySplit = categories.map((category: Categories) => {
			const words = category.split("_");
			const capitaliseWords = words.map((word: string) => capitalizeFirstLetter(word));
			return capitaliseWords.join(" ");
		});
		return categorySplit.join(", ");
	};

	return (
		<Flex
			paddingBottom={2}
			position={"fixed"}
			height={"55%"}
			width={widths}
			left={lefts}
			bg="white"
			zIndex={1000}
			bottom={bottoms}
			rounded="xl"
			flexDir={"column"}
			transform={`translateY(${translateY}%)`}
			transition={"transform 0.3s ease-in-out"}
		>
			{/* Gradient */}
			{translateY === 0 && (
				<Box
					position={"fixed"}
					height={["20%", "10%"]}
					width={"100%"}
					bottom={["45%", "48%", "48%", "50%", "45%"]}
					zIndex={1001}
					bgGradient={"linear(transparent 0%, white 60%)"}
					// transition={translateY === 0 ? "0.5s ease-in-out" : "0s"}
				/>
			)}
			{/*  */}
			<Button maxHeight={"2%"} padding={2.5} bg={"white"} onClick={handleMovement}>
				{translateY === 0 ? <ChevronUpIcon /> : <ChevronDownIcon />}
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
