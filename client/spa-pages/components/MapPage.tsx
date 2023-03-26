import { Flex, Text } from "@chakra-ui/react";
import { BasePage } from "layouts/BasePage";

export const MapPage = () => {
	return (
		<BasePage title="Map" description="Singapore's first recycling planner">
			<Flex direction="column" align="center" my={23}>
				<Text>Map Page</Text>
			</Flex>
		</BasePage>
	);
};
