import { Flex, Text } from "@chakra-ui/react";
import { BasePage } from "layouts/BasePage";

export const HomePickupPage = () => {
	return (
		<BasePage title="Home Pickup" description="Singapore's first recycling planner">
			<Flex direction="column" align="center" my={23}>
				<Text>Home Pickup Page</Text>
			</Flex>
		</BasePage>
	);
};
