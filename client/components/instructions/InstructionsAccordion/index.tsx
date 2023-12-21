import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Methods } from "api/sheety/enums";
import DisplayAccordion from "./DisplayAccordion";

export type AccordionDisplayProps = {
	items: AccordionProps[];
	recyclable: boolean;
};

export type AccordionProps = {
	title: string;
	method: Methods | undefined;
	contents?: string[];
	reason?: string;
	suggestion?: string;
};

export type AccordionsProps = {
	items: AccordionProps[];
};

export const AccordionComp: React.FC<AccordionsProps> = ({ items }) => {
	const unrecyclableItems = [] as AccordionProps[];
	const recyclableItems = items.filter((item) => {
		if (item.method === Methods.THROW) {
			unrecyclableItems.push(item);
			return false; // Exclude the item from the remainingItems array
		}
		return true; // Keep the item in the remainingItems array
	});

	return (
		<>
			{unrecyclableItems.length > 0 && (
				<Box>
					<Text as={"b"} fontSize={"x-large"} mt={0}>
						Non-Recyclables
					</Text>

					{/* Non-recyclable accordion */}
					<DisplayAccordion items={unrecyclableItems} recyclable={false} />
				</Box>
			)}
			{recyclableItems.length > 0 && (
				<Box>
					<Text as={"b"} fontSize={"x-large"} mt={0}>
						Recyclables
					</Text>

					{/* Recyclable accordion */}
					<DisplayAccordion items={recyclableItems} recyclable={true} />
				</Box>
			)}
		</>
	);
};
