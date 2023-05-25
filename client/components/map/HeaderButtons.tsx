import { Flex, Button, Spacer } from "@chakra-ui/react";
import { COLORS } from "theme";
import { Dispatch, SetStateAction } from "react";
import { Pages } from "spa-pages/pageEnums";
import { ArrowBackIcon, HamburgerIcon } from "@chakra-ui/icons";
type Props = {
	setPage: Dispatch<SetStateAction<Pages>>;
};

export const HeaderButtons = ({ setPage }: Props) => {
	return (
		<>
			<Spacer />
			<Flex gap={5} direction={"row"}>
				<Button
					leftIcon={<ArrowBackIcon />}
					onClick={() => setPage(Pages.HOME)}
					bg={COLORS["gray"][100]}
					color={COLORS.black}
					flex="1"
					py="3"
				>
					Edit
				</Button>
				<Button
					leftIcon={<HamburgerIcon />}
					bg={COLORS.Button.primary}
					color={COLORS.white}
					flex="1"
					py="3"
				>
					View Results
				</Button>
			</Flex>
		</>
	);
};
