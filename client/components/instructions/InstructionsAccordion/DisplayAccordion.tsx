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

const DisplayAccordion = ({ items, handleAccordionClick, recyclable }: AccordionDisplayProps) => {
	const { getItemCategory } = useSheetyData();
	const lastIndex = items.length - 1;
	const [isExpanded, setIsExpanded] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	return (
		<Accordion allowMultiple mt={1}>
			{items.map((item, index) => {
				const category = getItemCategory(item.title);
				return (
					<AccordionItem key={index} border={"0px"}>
						<h2>
							<AccordionButton
								roundedTop={index === 0 ? "lg" : "none"}
								roundedBottom={
									!isExpanded ? (index === lastIndex ? "lg" : "none") : "none"
								}
								border={"1px"}
								borderTop={index !== 0 ? "0px" : "1px"}
								borderColor={"gray.400"}
								_expanded={{ bg: "teal", color: "white" }}
								onClick={() => {
									handleAccordionClick(index);
									setIsExpanded(!isExpanded);
								}}
								_hover={{ bg: "teal", color: "white" }}
								onMouseEnter={() => setIsHovered(true)}
								onMouseLeave={() => setIsHovered(false)}
							>
								<VStack as="span" flex="1" alignItems="flex-start">
									<HStack textAlign="left">
										<Image
											src={
												isExpanded || isHovered
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
							border="1px"
							borderColor={"gray.400"}
							borderTop="0px"
							roundedBottom={index === lastIndex ? "lg" : "none"}
							bgColor={"#E0F0EF"}
							px={4}
							pt={4}
							pb={0}
						>
							<Box>
								{recyclable ? (
									item.contents && <InstructionsCarousel items={item.contents} />
								) : (
									<>
										<Text as={"b"}>Why cannot recycle?</Text>
										<Text mb={5}>{item.reason}</Text>
										<Text as={"b"}>How to dispose properly?</Text>
										<Text>{item.suggestion}</Text>
									</>
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
