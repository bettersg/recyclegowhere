import { Button, Flex, Heading, Spacer, Box, ButtonGroup } from "@chakra-ui/react";
import { ArrowBackIcon, SearchIcon } from "@chakra-ui/icons";
import { Dispatch, SetStateAction } from "react";
import { Pages } from "spa-pages/pageEnums";

type Props = {
	setPage: Dispatch<SetStateAction<Pages>>;
};
const ButtonRow = ({ setPage }: Props) => {
	return (
		<Flex px={4}>
			<Box>
				<Heading size={"lg"}>Your items:</Heading>
			</Box>
			<Spacer />
			<ButtonGroup gap={"1"}>
				<Button
					onClick={() => setPage(Pages.HOME)}
					leftIcon={<ArrowBackIcon />}
					colorScheme={"teal"}
					size={"md"}
				>
					Restart!
				</Button>
				<Button
					onClick={() => setPage(Pages.MAP)}
					leftIcon={<SearchIcon />}
					colorScheme={"teal"}
					size={"md"}
				>
					Map
				</Button>
			</ButtonGroup>
		</Flex>
	);
};

export default ButtonRow;
