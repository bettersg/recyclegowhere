import { Container, VStack } from "@chakra-ui/react";
import { BasePage } from "layouts/BasePage";
import OrgList from "components/pickup/OrgList";
import ButtonRow from "components/pickup/ButtonRow";
import Carousel from "components/pickup/PickupCarousel";
import { Dispatch, SetStateAction, useState } from "react";
import { Pages } from "spa-pages/pageEnums";
import ItemsAndFilterRow from "components/pickup/ItemsAndFilterRow";
import { useUserInputs } from "hooks/useUserSelection";

type Props = {
	setPage: Dispatch<SetStateAction<Pages>>;
};

export const PickupPage = ({ setPage }: Props) => {
	const { items } = useUserInputs();

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
					<ItemsAndFilterRow items={items} />
					<OrgList items={items} />
				</VStack>
			</Container>
		</BasePage>
	);
};
