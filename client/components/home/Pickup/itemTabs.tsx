import { Divider, Flex, Tab, Tabs, TabList, TabPanel, TabPanels, Heading } from "@chakra-ui/react";
import OrgCard from "./card";
import { useSheetyData } from "hooks/useSheetyData";
import { useUserInputs } from "hooks/useUserSelection";
import { TSheetyPickupDetails } from "api/sheety/types";
import { useState } from "react";
import { TEmptyItem, TItemSelection } from "app-context/SheetyContext/types";

export type PickupResult = {
	itemSelected: string;
	itemCategory: string;
	possibleOrganizations: TSheetyPickupDetails[]
}
//TODO: store pickup data into context
//Display relevant data in itemtabs
//modify cards data

const ItemTabs = () => {
	//const itemList = ["Laptop", "Battery", "Drink Bottle", "Drink Cans", "Light Bulb"];
	const { items } = useUserInputs();
	const { pickUpServices, getItemCategory } = useSheetyData();
	const [pickUpEntries, setPickUpEntries] = useState([{
		itemSelected: "",
		itemCategory: "",
		possibleOrganizations: []
	}] as PickupResult[]);

	const getPickupData = (item: (TItemSelection|TEmptyItem)): PickupResult => {
		const cat = getItemCategory(item.name);
		const possiblePickups = pickUpServices.filter((x)=>x.categoriesAccepted.includes(cat));
		return {itemSelected: item.name, itemCategory: cat, possibleOrganizations: possiblePickups};};

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
				{items.map((item) => (
					<Tab key={item.name}>{item.name}</Tab>
				))}
			</TabList>
			<TabPanels>
				{items.map((item) => (
					<TabPanel key={item.name}>
						<Flex my={3} direction="column" align="center">
							<Divider borderColor={"black"} size={"3"} w={"80%"} />
						</Flex>
						<Heading size={"lg"} textAlign={"center"}>
							Pick Up Services Near You
						</Heading>
						{getPickupData(item).possibleOrganizations.map((x)=>(
							<OrgCard key={x["s/n"]} {...x}/>
						))}
					</TabPanel>
				))}
			</TabPanels>
		</Tabs>
	);
};

export default ItemTabs;