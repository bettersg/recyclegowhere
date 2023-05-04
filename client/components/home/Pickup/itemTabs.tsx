import { Divider, Flex, Tab, Tabs, TabList, TabPanel, TabPanels, Heading } from "@chakra-ui/react";
import OrgCard from "./card";

const ItemTabs = () => {
	const itemList = ["Laptop", "Battery", "Drink Bottle", "Drink Cans", "Light Bulb"];

	return (
		<Tabs
			variant={"enclosed"}
			colorScheme={"teal"}
			align={"start"}
			overflow={"hidden"}
			isFitted={true}
			size="sm"
			px={4}
		>
			<TabList>
				{itemList.map((item) => (
					<Tab key={item}>{item}</Tab>
				))}
			</TabList>
			<TabPanels>
				{itemList.map((item) => (
					<TabPanel key={item}>
						<Flex my={3} direction="column" align="center">
							<Divider borderColor={"black"} size={"3"} w={"80%"} />
						</Flex>
						<Heading size={"lg"} textAlign={"center"}>
							Pick Up Services Near You
						</Heading>
						<OrgCard />
						<OrgCard />
					</TabPanel>
				))}
			</TabPanels>
		</Tabs>
	);
};

export default ItemTabs;
