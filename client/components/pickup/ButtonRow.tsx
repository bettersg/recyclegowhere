import { Button, Flex, Heading, Spacer, Box, ButtonGroup, Icon } from "@chakra-ui/react";
import { ArrowBackIcon, SearchIcon, UpDownIcon } from "@chakra-ui/icons";
import { Dispatch, SetStateAction, useState } from "react";
import { FiMap } from "react-icons/fi";
import { TbReload } from "react-icons/tb";
import { Pages } from "spa-pages/pageEnums";
import FilterButton from "./filterPopover";

type Props = {
	setPage: Dispatch<SetStateAction<Pages>>;
};

// const [showPopup, setShowPopup] = useState(false);

// const handleButtonClick = () => {
//     setShowPopup(true);
// };

// const handlePopupClose = () => {
//     setShowPopup(false);
// };

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
				<FilterButton />
			</ButtonGroup>
		</Flex>
	);
};

export default ButtonRow;
