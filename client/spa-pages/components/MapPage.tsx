import { BasePage } from "layouts/BasePage";
import { Container, Flex, VStack, IconButton } from "@chakra-ui/react";
import { HeaderButtons } from "components/map";
import { Dispatch, SetStateAction, useState, MouseEventHandler } from "react";
import { Pages } from "spa-pages/pageEnums";
import { Location } from "components/home/UserInput/Location";
import { COLORS } from "theme";
import { HamburgerIcon } from "@chakra-ui/icons";

type Props = {
	setPage: Dispatch<SetStateAction<Pages>>;
};

interface ButtonProps {
	onClick: MouseEventHandler<HTMLButtonElement>;
}

const FilterButton = ({ onClick }: ButtonProps) => (
	<IconButton
		variant="solid"
		color={COLORS.gray[700]}
		background={COLORS.gray[100]}
		aria-label="add line"
		icon={<HamburgerIcon />}
		onClick={onClick}
	/>
);

export const MapPage = ({ setPage }: Props) => {
	const [addressBlur, setAddressBlur] = useState(false);
	const [filterShow, setFilterShow] = useState(false);

	const showFilter = () => {
		setFilterShow(true);
	};

	return (
		<BasePage title="Instructions" description="Singapore's first recycling planner">
			<Container
				maxW={{
					base: "full",
					sm: "container.md",
				}}
			>
				<VStack spacing={30} align="stretch">
					<HeaderButtons setPage={setPage} />
					<Flex w="100%" direction={"row"} gap={"0.3rem"}>
						<Location showText={false} handleBlur={() => setAddressBlur(true)} />
						<FilterButton onClick={showFilter} />
					</Flex>
				</VStack>
			</Container>
		</BasePage>
	);
};
