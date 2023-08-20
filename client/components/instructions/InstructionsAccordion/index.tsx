import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Badge,
	Box,
	Text,
	Image,
	HStack,
	VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import Carousel from "./InstructionsCarousel";
import { Methods } from "api/sheety/enums";
import { useSheetyData } from "hooks/useSheetyData";
import { METHODS } from "http";

export type AccordionProps = {
	items: {
		title: string;
		method: Methods | undefined;
		contents?: string[];
		reason?: string;
		suggestion?: string;
	}[];
};

export const AccordionComp = ({ items }: AccordionProps) => {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	const handleAccordionClick = (index: number) => {
		setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
	};

	const { getItemCategory } = useSheetyData();

	const unrecyclableItems = [] as {
		title: string;
		method: Methods | undefined;
		contents?: string[];
		reason?: string;
		suggestion?: string;
	}[];
	const recyclableItems = items.filter((item) => {
		if (item.method === Methods.THROW) {
			unrecyclableItems.push(item);
			return false; // Exclude the item from the remainingItems array
		}
		return true; // Keep the item in the remainingItems array
	});
	const lastIndexUnrecyclable = unrecyclableItems.length - 1;
	const lastIndexRecyclable = recyclableItems.length - 1;

	return (
		<>
			{unrecyclableItems.length > 0 && (
				<Box>
					<Text as={"b"} fontSize={"x-large"} mt={0}>
						Non-Recyclables
					</Text>

					<Accordion allowMultiple allowToggle mt={1}>
						{unrecyclableItems.map((item, index) => {
							const category = getItemCategory(item.title);
							return (
								<AccordionItem key={index} border={"0px"}>
									<h2>
										<AccordionButton
											// boxShadow={"0 0 2px rgba(0, 0, 0, 1)"}
											roundedTop={index === 0 ? "lg" : "none"}
											roundedBottom={
												index === lastIndexUnrecyclable ? "lg" : "none"
											}
											border={"1px"}
											borderTop={index !== 0 ? "0px" : "1px"}
											borderColor={"gray.400"}
											_expanded={{ bg: "teal", color: "white" }}
											onClick={() => handleAccordionClick(index)}
											_hover={{ bg: "teal", color: "white" }}
										>
											<HStack as="span" flex="1" textAlign="left">
												<Image src={`/icons/${category}.png`} w={5} />
												<Text>{item.title}</Text>
											</HStack>
											<Badge
												size="lg"
												colorScheme="green"
												borderRadius="full"
												py={1}
												px={2}
											>
												<Text>{item.method}</Text>
											</Badge>
											<AccordionIcon />
										</AccordionButton>
									</h2>
									<AccordionPanel
										border="1px"
										borderColor={"gray.400"}
										borderTop="0px"
										roundedBottom={
											index === lastIndexUnrecyclable ? "lg" : "none"
										}
									>
										<Box p={4}>
											<Text as={"b"}>Why cannot recycle?</Text>
											<Text mb={5}>{item.reason}</Text>
											<Text as={"b"}>How to dispose properly?</Text>
											<Text>{item.suggestion}</Text>
										</Box>
									</AccordionPanel>
								</AccordionItem>
							);
						})}
					</Accordion>
				</Box>
			)}
			{recyclableItems.length > 0 && (
				<Box>
					<Text as={"b"} fontSize={"x-large"} mt={0}>
						Recyclables
					</Text>

					<Accordion allowMultiple allowToggle mt={1}>
						{recyclableItems.map((item, index) => {
							const category = getItemCategory(item.title);
							return (
								<AccordionItem key={index} border={"0px"}>
									<h2>
										<AccordionButton
											roundedTop={index === 0 ? "lg" : "none"}
											roundedBottom={
												index === lastIndexRecyclable ? "lg" : "none"
											}
											border={"1px"}
											borderTop={index !== 0 ? "0px" : "1px"}
											borderColor={"gray.400"}
											_expanded={{ bg: "teal", color: "white" }}
											onClick={() => handleAccordionClick(index)}
											_hover={{ bg: "teal", color: "white" }}
										>
											<HStack as="span" flex="1" textAlign="left">
												<Image src={`/icons/${category}.png`} w={5} />
												<Text>{item.title}</Text>
											</HStack>
											<Badge
												size="lg"
												colorScheme="green"
												borderRadius="full"
												py={1}
												px={2}
											>
												<Text>{item.method}</Text>
											</Badge>
											<AccordionIcon />
										</AccordionButton>
									</h2>
									<AccordionPanel
										border="1px"
										borderColor={"gray.400"}
										borderTop="0px"
										roundedBottom={
											index === lastIndexRecyclable ? "lg" : "none"
										}
									>
										<Box p={4}>
											<Carousel items={item.contents} />
										</Box>
									</AccordionPanel>
								</AccordionItem>
							);
						})}
					</Accordion>
				</Box>
			)}
		</>
	);
};
