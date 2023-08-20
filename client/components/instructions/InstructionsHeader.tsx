import { Box, Button, Heading, HStack, Spacer } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { Pages } from "spa-pages/pageEnums";

type Props = {
	setPage: Dispatch<SetStateAction<Pages>>;
};

export const InstructionsHeader = ({ setPage }: Props) => {
	return (
		<Box my={5}>
			<HStack px={2} justifyContent={"space-between"}>
				<Button onClick={() => setPage(Pages.HOME)} colorScheme="gray">
					Edit
				</Button>
				<Button onClick={() => setPage(Pages.HOME)} colorScheme="teal">
					Restart
				</Button>
			</HStack>
		</Box>
	);
};
