import { Button, Flex, Heading, Spacer, Box, ButtonGroup, Icon } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { FiMap } from "react-icons/fi";
import { TbReload } from "react-icons/tb";
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
					leftIcon={<TbReload />}
					colorScheme={"teal"}
					size={"xs"}
				>
					Restart
				</Button>
				<Button
					onClick={() => setPage(Pages.MAP)}
					leftIcon={<Icon as={FiMap} />}
					colorScheme={"teal"}
					size={"xs"}
				>
					Map
				</Button>
			</ButtonGroup>
		</Flex>
	);
};

export default ButtonRow;
