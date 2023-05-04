import { Divider, Flex, Container, VStack } from "@chakra-ui/react";
import { BasePage } from "layouts/BasePage";
import ItemTabs from "components/home/Pickup/itemTabs";
import ButtonRow from "components/home/Pickup/button";
import Carousel from "components/home/Pickup/carousel";
import { Dispatch, SetStateAction } from "react";
import { Pages } from "spa-pages/pageEnums";

type Props = {
	setPage: Dispatch<SetStateAction<Pages>>;
};

export const HomePickupPage = ({ setPage }: Props) => {
	return (
		<BasePage title="Home Pickup" description="Singapore's first recycling planner">
			<Container
				maxW={{
					base: "full",
					sm: "container.md",
				}}
				p={0}
				pb={5}
			>
				<VStack align="stretch" my={23} spacing={4}>
					<Carousel />
					<ButtonRow setPage={setPage} />
					<ItemTabs />
				</VStack>
			</Container>
		</BasePage>
	);
};
