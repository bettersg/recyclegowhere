import { Box, Button, Heading, HStack, Spacer } from "@chakra-ui/react";

export const InstructionsHeader = () => {
	return (
		<>
			<Spacer />
			<HStack>
				<Box>
					<Heading size="lg">Instructions</Heading>
				</Box>
				<Spacer />
				<Box>
					<Button colorScheme="teal">Restart!</Button>
				</Box>
			</HStack>
		</>
	);
};
