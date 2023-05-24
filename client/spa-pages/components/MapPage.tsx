import { Flex, Text, Button, Spacer } from "@chakra-ui/react";
import { BasePage } from "layouts/BasePage";
import { Container, VStack } from "@chakra-ui/react";
import { COLORS } from "theme";

export const MapPage = () => {
	return (
		<BasePage title="Instructions" description="Singapore's first recycling planner">
			<Container
				maxW={{
					base: "full",
					sm: "container.md",
				}}
			>
				<VStack spacing={30} align="stretch">
					<Spacer />
					<Flex gap={5} direction={"row"}>
						<Button bg={COLORS["gray"][700]} color={COLORS.white} flex="1" py="3">
							Edit
						</Button>
						<Button bg={COLORS.Button.primary} color={COLORS.white} flex="1" py="3">
							View Results
						</Button>
					</Flex>
				</VStack>
			</Container>
		</BasePage>
	);
};
