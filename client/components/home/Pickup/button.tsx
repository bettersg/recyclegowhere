import { Button, Flex, Heading, Spacer, Box, ButtonGroup } from "@chakra-ui/react";
import { ArrowBackIcon, SearchIcon, UpDownIcon } from "@chakra-ui/icons";
import { Dispatch, SetStateAction, useState} from "react";
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
				<FilterButton />
			</ButtonGroup>
		</Flex>
	);
};

export default ButtonRow;
