import { Divider, Flex, Container, VStack } from "@chakra-ui/react";
import { BasePage } from "layouts/BasePage";
import ItemTabs from "components/home/Pickup/itemTabs";
import ButtonRow from "components/home/Pickup/button";
import Carousel from "components/home/Pickup/carousel";
import { Dispatch, SetStateAction, useState } from "react";
import { Pages } from "spa-pages/pageEnums";
import { useUserInputs } from "hooks/useUserSelection";


//select the item plox
type Props = {
	setPage: Dispatch<SetStateAction<Pages>>;
};

export const HomePickupPage = ({ setPage }: Props) => {
	const {items: itemList} = useUserInputs();

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
					<ItemTabs _itemList={itemList}/>
				</VStack>
			</Container>
		</BasePage>
	);
};
