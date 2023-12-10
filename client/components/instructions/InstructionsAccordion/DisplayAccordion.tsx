import { Box, Text, Image, HStack, VStack } from "@chakra-ui/react";
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
} from "@chakra-ui/accordion";
import { useSheetyData } from "hooks/useSheetyData";
import { AccordionDisplayProps } from ".";
import InstructionsCarousel from "./InstructionsCarousel";
import { InstructionsTag } from "./InstructionsTag";
import { useState } from "react";

const DisplayAccordion = ({ items, recyclable }: AccordionDisplayProps) => {
	const { getItemCategory } = useSheetyData();
	const lastIndex = items.length - 1;

	// Use an array of state variables to track hover and expanded state for each accordion
	const [accordionStates, setAccordionStates] = useState(
		items.map(() => ({ isHovered: false, isExpanded: false })),
	);
	// Function to handle accordion hover
	const handleAccordionHover = (index: number, isHovered: boolean, isExpanded: boolean) => {
		setAccordionStates((prevState) =>
			prevState.map((state, i) => ({
				...state,
				isHovered: i === index ? isHovered : state.isHovered,
				isExpanded: i === index ? isExpanded : state.isExpanded,
			})),
		);
	};

	return (
		<Accordion allowMultiple mt={1}>
			{items.map((item, index) => {
				const category = getItemCategory(item.title);
				const { isHovered, isExpanded } = accordionStates[index];
				return (
					<AccordionItem key={index} border={"0px"}>
						<h2>
							<AccordionButton
								roundedTop={index === 0 ? "md" : "none"}
								roundedBottom={
									!isExpanded ? (index === lastIndex ? "md" : "none") : "none"
								}
								// borderTop={index !== 0 ? "1px" : "0px"}
								borderColor={"gray.400"}
								_expanded={{ bg: "teal", color: "white" }}
								onClick={() => {
									handleAccordionHover(index, true, !isExpanded);
								}}
								_hover={{ bg: "teal", color: "white" }}
								onMouseEnter={() => handleAccordionHover(index, true, isExpanded)}
								onMouseLeave={() => handleAccordionHover(index, false, isExpanded)}
								style={{
									boxShadow:
										index === 0 && index !== lastIndex
											? "0px -5px 6px -6px rgba(0, 0, 0, 0.25), -5px 0px 6px -6px rgba(0, 0, 0, 0.25), 5px 0px 6px -6px rgba(0, 0, 0, 0.25)"
											: "1px 2px 6px 0px rgb(0,0,0, 0.25)",
								}}
							>
								<VStack as="span" flex="1" alignItems="flex-start">
									<HStack textAlign="left">
										<Image
											src={
												isHovered || isExpanded
													? `/whiteicons/${category}.png`
													: `/icons/${category}.png`
											}
											w={5}
											alt={`Icon for ${category}`}
										/>
										<Text>{item.title}</Text>
									</HStack>
									<InstructionsTag method={item.method} />
								</VStack>
								<AccordionIcon />
							</AccordionButton>
						</h2>
						<AccordionPanel
							borderInline="1px"
							borderColor={"teal"}
							borderTop="0px"
							borderBottom="1px"
							roundedBottom="md"
							bgColor={"#E0F0EF"}
							px={4}
							pt={4}
							pb={0}
						>
							<Box>
								{recyclable ? (
									item.contents && <InstructionsCarousel items={item.contents} />
								) : (
									<Box pb={5}>
										<Text as={"b"}>Why cannot recycle?</Text>
										<Text mb={5}>{item.reason}</Text>
										<Text as={"b"}>How to dispose properly?</Text>
										<Text>{item.suggestion}</Text>
									</Box>
								)}
							</Box>
						</AccordionPanel>
					</AccordionItem>
				);
			})}
		</Accordion>
	);
};

export default DisplayAccordion;
