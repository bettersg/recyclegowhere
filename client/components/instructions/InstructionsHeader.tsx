import { Box, Button, Heading, HStack, Spacer } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { Pages } from "spa-pages/pageEnums";

type Props = {
	setPage: Dispatch<SetStateAction<Pages>>;
};

export const InstructionsHeader = ({ setPage }: Props) => {
	return (
		<>
			<Spacer />
			<HStack px={2}>
				<Box>
					<Heading size="lg">Instructions</Heading>
				</Box>
				<Spacer />
				<Box>
					<Button onClick={() => setPage(Pages.HOME)} colorScheme="teal">
						Restart!
					</Button>
				</Box>
			</HStack>
		</>
	);
};
