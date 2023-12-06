import { ArrowBackIcon, ArrowLeftIcon } from "@chakra-ui/icons";
import { Button, Flex, Heading, Spacer, Box, ButtonGroup, Icon } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { BiLeftArrow } from "react-icons/bi";
import { Pages } from "spa-pages/pageEnums";

type Props = {
	setPage: Dispatch<SetStateAction<Pages>>;
};

const ButtonRow = ({ setPage }: Props) => {
	return (
		<Flex px={6}>
			<Box>
				<Heading size={"md"}>Your items:</Heading>
			</Box>
			<Spacer />
			<ButtonGroup gap={"1"}>
				<Button
					onClick={() => setPage(Pages.HOME)}
					leftIcon={<ArrowBackIcon />}
					colorScheme={"teal"}
					size={"sm"}
				>
					Back
				</Button>
			</ButtonGroup>
		</Flex>
	);
};

export default ButtonRow;
