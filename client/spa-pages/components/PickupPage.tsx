import { Container, VStack } from "@chakra-ui/react";
import { BasePage } from "layouts/BasePage";
import ItemTabs from "components/pickup/ItemTabs";
import ButtonRow from "components/pickup/ButtonRow";
import Carousel from "components/pickup/PickupCarousel";
import { Dispatch, SetStateAction, useState } from "react";
import { Pages } from "spa-pages/pageEnums";

type Props = {
	setPage: Dispatch<SetStateAction<Pages>>;
};

export const PickupPage = ({ setPage }: Props) => {

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
