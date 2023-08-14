import { Divider, Flex, Tab, Tabs, TabList, TabPanel, TabPanels, Heading, Center } from "@chakra-ui/react";
import OrgCard from "./OrgCard";
import { useSheetyData } from "hooks/useSheetyData";
import { useUserInputs } from "hooks/useUserSelection";
import { TSheetyPickupDetails } from "api/sheety/types";
import { TEmptyItem, TItemSelection } from "app-context/SheetyContext/types";

export type PickupResult = {
	itemSelected: string;
	itemCategory: string;
	possibleOrganizations: TSheetyPickupDetails[]
}

type Props = {
	items: (TItemSelection | TEmptyItem)[];
};

const OrgList = (props: Props) => {
	// TODO: #148: Sort facilities based on number of inputted-items it collects
	const { pickUpServices, getItemCategory } = useSheetyData();
	const getPickupData = (item: (TItemSelection | TEmptyItem)): PickupResult => {
		const cat = getItemCategory(item.name);
		const possiblePickups = pickUpServices.filter((x) => x.categoriesAccepted.includes(cat));
		return { itemSelected: item.name, itemCategory: cat, possibleOrganizations: possiblePickups };
	};

	return (
		<>
			<Center>
				<Divider borderColor="gray" w="85%" />
			</Center>
			<Heading size="lg" textAlign="center">
				Pick Up Services Near You
			</Heading>
			{getPickupData(props.items[0]).possibleOrganizations.map((x) => (
				<OrgCard key={x["s/n"]} {...x} />
			))}
		</>
	);
};

export default OrgList;