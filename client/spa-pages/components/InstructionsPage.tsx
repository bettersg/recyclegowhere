import { Flex, Text, Container, VStack } from "@chakra-ui/react";
import { BasePage } from "layouts/BasePage";
import { AccordionComp, InstructionsHeader } from "components/instructions";
import { Dispatch, SetStateAction } from "react";
import { Pages } from "spa-pages/pageEnums";

type Props = {
	setPage: Dispatch<SetStateAction<Pages>>;
};

const items = [
	{ title: "Title", method: "Method", imgURL: "imgUrl", contents: ["1", "2"] },
	{ title: "Title 2", method: "Method 2", imgURL: "imgUrl 2", contents: ["3", "4"] },
];

export const InstructionsPage = ({ setPage }: Props) => {
	return (
		<BasePage title="Instructions" description="Singapore's first recycling planner">
			<Container
				maxW={{
					base: "full",
					sm: "container.md",
				}}
			>
				<VStack spacing={30} align="stretch">
					<InstructionsHeader setPage={setPage} />
					<AccordionComp items={items} />
				</VStack>
			</Container>
		</BasePage>
	);
};
