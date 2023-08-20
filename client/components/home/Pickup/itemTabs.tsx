import { Divider, Flex, Tab, Tabs, TabList, TabPanel, TabPanels, Heading } from "@chakra-ui/react";
import OrgCard from "./OrgCard";
import { useSheetyData } from "hooks/useSheetyData";
import { useUserInputs } from "hooks/useUserSelection";
import { TSheetyPickupDetails } from "api/sheety/types";
import { TEmptyItem, TItemSelection } from "app-context/SheetyContext/types";

export type PickupResult = {
	itemSelected: string;
	itemCategory: string;
	possibleOrganizations: TSheetyPickupDetails[];
};

const ItemTabs = () => {
	const { items } = useUserInputs();
	const { pickUpServices, getItemCategory } = useSheetyData();
	const getPickupData = (item: TItemSelection | TEmptyItem): PickupResult => {
		const cat = getItemCategory(item.name);
		const possiblePickups = pickUpServices.filter((x) => x.categoriesAccepted.includes(cat));
		return {
			itemSelected: item.name,
			itemCategory: cat,
			possibleOrganizations: possiblePickups,
		};
	};

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
						<Flex mt={1} mb={7} direction="column" align="center">
							<Divider borderColor={"gray.500"} borderWidth={"thin"} w={"98%"} />
						</Flex>
						<Heading size={"lg"} textAlign={"center"}>
							Pick Up Services Near You
						</Heading>
						{getPickupData(item).possibleOrganizations.map((pickupDetails) => (
							<OrgCard key={pickupDetails["s/n"]} {...pickupDetails} />
						))}
					</TabPanel>
				))}
			</TabPanels>
		</Tabs>
	);
};

export default ItemTabs;
