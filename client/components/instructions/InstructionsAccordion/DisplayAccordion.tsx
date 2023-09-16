import { Badge, Box, Text, Image, HStack } from "@chakra-ui/react";
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

const DisplayAccordion = ({ items, handleAccordionClick, recyclable }: AccordionDisplayProps) => {
	const { getItemCategory } = useSheetyData();
	const lastIndex = items.length - 1;

	return (
		<Accordion allowMultiple allowToggle mt={1}>
			{items.map((item, index) => {
				const category = getItemCategory(item.title);
				return (
					<AccordionItem key={index} border={"0px"}>
						<h2>
							<AccordionButton
								roundedTop={index === 0 ? "lg" : "none"}
								roundedBottom={index === lastIndex ? "lg" : "none"}
								border={"1px"}
								borderTop={index !== 0 ? "0px" : "1px"}
								borderColor={"gray.400"}
								_expanded={{ bg: "teal", color: "white" }}
								onClick={() => handleAccordionClick(index)}
								_hover={{ bg: "teal", color: "white" }}
							>
								<HStack as="span" flex="1" textAlign="left">
									<Image
										src={`/icons/${category}.png`}
										w={5}
										alt={`Icon for ${category}`}
									/>
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
							roundedBottom={index === lastIndex ? "lg" : "none"}
						>
							{recyclable ? (
								item.contents && (
									<Box p={4}>
										<InstructionsCarousel items={item.contents} />
									</Box>
								)
							) : (
								<Box p={4}>
									<Text as={"b"}>Why cannot recycle?</Text>
									<Text mb={5}>{item.reason}</Text>
									<Text as={"b"}>How to dispose properly?</Text>
									<Text>{item.suggestion}</Text>
								</Box>
							)}
						</AccordionPanel>
					</AccordionItem>
				);
			})}
		</Accordion>
	);
};

export default DisplayAccordion;
