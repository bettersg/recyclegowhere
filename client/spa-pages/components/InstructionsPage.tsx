import { Flex, Text, Container } from "@chakra-ui/react";
import { BasePage } from "layouts/BasePage";
import { AccordionComp, InstructionsHeader } from "components/instructions";

const items = [
	{ title: "Title", method: "Method", imgURL: "imgUrl", contents: ["1", "2"] },
	{ title: "Title 2", method: "Method 2", imgURL: "imgUrl 2", contents: ["3", "4"] },
];

export const InstructionsPage = () => {
	return (
		<BasePage title="Instructions" description="Singapore's first recycling planner">
			<Container
				maxW={{
					base: "full",
					sm: "container.md",
				}}
			>
				<InstructionsHeader />
				<AccordionComp items={items} />
			</Container>
		</BasePage>
	);
};
