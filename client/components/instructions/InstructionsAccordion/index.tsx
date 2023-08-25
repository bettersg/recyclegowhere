import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Badge,
	Box
} from "@chakra-ui/react";
import { useState } from "react";
import Carousel from "./InstructionsCarousel";
import { Methods } from "api/sheety/enums";
export type AccordionProps = {
	items: {
		title: string;
		method: Methods | undefined;
		contents: string[];
	}[];
};

export const AccordionComp = ({ items }: AccordionProps) => {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	const handleAccordionClick = (index: number) => {
		setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
	};

	return (
		<Accordion allowMultiple allowToggle>
			{items.map((item, index) => (
				<AccordionItem key={index}>
					<h2>
						<AccordionButton
							_expanded={{ bg: "teal", color: "white" }}
							onClick={() => handleAccordionClick(index)}
							_hover={{ bg: "teal", color: "white" }}
						>
							<Box as="span" flex="1" textAlign="left">
								{item.title}
							</Box>
							<Badge size="lg" colorScheme="green" borderRadius="full">
								{item.method}
							</Badge>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel>
						<Box p={4}>
							<Carousel items={item.contents} />
						</Box>
					</AccordionPanel>
				</AccordionItem>
			))}
		</Accordion>
	);
};
