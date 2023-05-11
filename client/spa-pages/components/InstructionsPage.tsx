import { Flex, Text } from "@chakra-ui/react";
import { BasePage } from "layouts/BasePage";

export const InstructionsPage = () => {
	return (
		<BasePage title="Instructions" description="Singapore's first recycling planner">
			<Flex direction="column" align="center" my={23}>
				<Text>Instructions</Text>
			</Flex>
		</BasePage>
	);
};
