import { Divider, Heading, Center, theme } from "@chakra-ui/react";
import OrgCard from "./OrgCard";
import { useSheetyData } from "hooks/useSheetyData";
import { TSheetyPickupDetails } from "api/sheety/types";
import { TEmptyItem, TItemSelection } from "app-context/SheetyContext/types";

type OrgProps = {
	organisation: TSheetyPickupDetails;
	acceptedItems: (TItemSelection | TEmptyItem)[];
	notAcceptedItems: (TItemSelection | TEmptyItem)[];
}

type Props = {
	items: (TItemSelection | TEmptyItem)[];
};

const OrgList = (props: Props) => {
	const colors = theme.colors;

	const { pickUpServices, getItemCategory } = useSheetyData();
	const possiblePickups = pickUpServices.filter((pickUpService) => {
		let picksUpAtLeastOneItem = false;
		for (const item of props.items) {
			if (pickUpService.categoriesAccepted.includes(getItemCategory(item.name))) {
				picksUpAtLeastOneItem = true;
				break;
			}
		}
		return picksUpAtLeastOneItem;
	});
	const orgPropsList: OrgProps[] = possiblePickups.map((pickup) => {
		return {
			organisation: pickup,
			acceptedItems: props.items.filter((item) => pickup.categoriesAccepted.includes(getItemCategory(item.name))),
			notAcceptedItems: props.items.filter((item) => !pickup.categoriesAccepted.includes(getItemCategory(item.name)))
		};
	});
	const sortedPossiblePickups = orgPropsList.sort((a, b) => a.acceptedItems.length > b.acceptedItems.length ? -1 : 1);

	return (
		<>
			<Center>
				<Divider borderColor={colors.gray[500]} w="85%" />
			</Center>
			<Heading size="lg" textAlign="center">
				Pick Up Services Near You
			</Heading>
			{sortedPossiblePickups.map((pickup) => (
				<OrgCard key={pickup.organisation["s/n"]} orgDetails={pickup.organisation} acceptedItems={pickup.acceptedItems} notAcceptedItems={pickup.notAcceptedItems} />
			))}
		</>
	);
};

export default OrgList;