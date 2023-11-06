import { Flex, Text, HStack, Button, Box, VStack, Divider } from "@chakra-ui/react";
import { TStateFacilities } from "app-context/SheetyContext/types";
import { Image } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { COLORS } from "theme";
import React, { ReactNode, useState } from "react";
import styles from "components/home/hideScrollbar.module.css";
import Link from "next/link";

export const FacilityCard = ({
	facCardDetails,
	facCardDistance,
}: {
	facCardDetails: TStateFacilities;
	facCardDistance: number;
}) => {
	const TRANSLATION_DIST = -50;
	const [translateY, setTranslateY] = useState(0);
	const handleMovement = () => {
		translateY === TRANSLATION_DIST ? setTranslateY(0) : setTranslateY(TRANSLATION_DIST);
	};
	const widths = ["86%", "50%", "40%", "25%"];
	const lefts = ["7%", "25%", "30%", "37.5%"];
	return (
		<Flex
			paddingBottom={2}
			position={"fixed"}
			height={"55%"}
			width={widths}
			left={lefts}
			bg="white"
			zIndex={1000}
			bottom={["-27%", "-27%", "-27%", "-27%", "-25%"]}
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
						<Text fontSize={"md"} noOfLines={2}>
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
						They accept X of {facCardDetails.categoriesAccepted.length} items:
					</Text>
					<Flex gap={2} fontSize={"xs"} width={"100%"} wrap={"wrap"}>
						{facCardDetails.categoriesAccepted.map((category, idx) => (
							<ItemTab key={idx}>{category}</ItemTab>
						))}
					</Flex>
					<Text fontSize={"sm"} as={"b"}>
						They also accept these items:
					</Text>
					<Flex gap={2} fontSize={"xs"} width={"100%"} wrap={"wrap"}>
						{facCardDetails.categoriesAccepted.map((category, idx) => (
							<ItemTab key={idx}>{category}</ItemTab>
						))}
					</Flex>
					<Text mt={5} fontSize={"sm"}>
						Please check <Link href="#">here</Link> for more information.
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
					>
						See where to recycle the rest
					</Button>
				</Flex>
			</Flex>
		</Flex>
	);
};

const ItemTab: React.FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<Box
			bg={"#E0F0EF"}
			borderRadius={"42px"}
			minWidth={"fit-content"}
			padding={"5px 10px"}
			borderColor={COLORS.Button.primary}
			border={"1px"}
		>
			{children}
		</Box>
	);
};
