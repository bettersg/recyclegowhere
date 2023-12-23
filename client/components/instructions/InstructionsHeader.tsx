import { Box, Button, HStack } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { Pages } from "spa-pages/pageEnums";
import { ArrowBackIcon } from "@chakra-ui/icons";
type Props = {
	setPage: Dispatch<SetStateAction<Pages>>;
};

export const InstructionsHeader = ({ setPage }: Props) => {
	return (
		<Box my={5}>
			<HStack px={2} justifyContent={"space-between"} gap={5}>
				<Button
					w={"20%"}
					leftIcon={<ArrowBackIcon />}
					onClick={() => setPage(Pages.HOME)}
					colorScheme="teal"
				>
					Back
				</Button>
			</HStack>
		</Box>
	);
};
