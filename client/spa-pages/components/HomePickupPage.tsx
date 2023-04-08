import { Divider, Flex } from "@chakra-ui/react";
import { BasePage } from "layouts/BasePage";
import ItemTabs from "components/home/Pickup/itemTabs";
import ButtonRow from "components/home/Pickup/button";
import Carousel from "components/home/Pickup/carousel";

export const HomePickupPage = () => {
	return (
		<BasePage title="Home Pickup" description="Singapore's first recycling planner">
			<Flex direction="column" align="center" my={23}>
				<Carousel />
				<br />
				<ButtonRow />
				<br />
				<Divider borderColor={"black"} size={"3"} />
				<br />
				<ItemTabs />
			</Flex>
		</BasePage>
	);
};
