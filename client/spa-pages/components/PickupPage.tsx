import { Container, VStack } from "@chakra-ui/react";
import { BasePage } from "layouts/BasePage";
import OrgList from "components/pickup/OrgList";
import ButtonRow from "components/pickup/ButtonRow";
import PickupCarousel from "components/pickup/PickupCarousel";
import { Dispatch, SetStateAction } from "react";
import { Pages } from "spa-pages/pageEnums";
import ItemsAndFilterRow from "components/pickup/ItemsAndFilterRow";
import { useUserInputs } from "hooks/useUserSelection";
import { useSheetyData } from "hooks/useSheetyData";
import { TSheetyPickupDetails } from "api/sheety/types";
import { TEmptyItem, TItemSelection } from "app-context/SheetyContext/types";
import NonRecyclableModal from "components/common/NonRecyclableModal";
import { useState } from "react";

type Props = {
	setPage: Dispatch<SetStateAction<Pages>>;
};

export type OrgProps = {
	organisation: TSheetyPickupDetails;
	acceptedItems: (TItemSelection | TEmptyItem)[];
	notAcceptedItems: (TItemSelection | TEmptyItem)[];
};

export const PickupPage = ({ setPage }: Props) => {
	const { items, recyclingLocationResults } = useUserInputs();
	const results = recyclingLocationResults ? recyclingLocationResults.results : {};
	// Find shortest distance to facility
	let minDistance = 100;
	if (Object.keys(results).length > 0) {
		for (const category in results) {
			if (results[category].facilities) {
				for (const facility of results[category].facilities) {
					if (facility.distance < minDistance) {
						minDistance = facility.distance;
					}
				}
			}
		}
	}

	// Pick up services
	const { pickUpServices, getItemCategory } = useSheetyData();
	console.log(pickUpServices);
	const sortPickups = (itemEntry: (TItemSelection | TEmptyItem)[]): OrgProps[] => {
		const possiblePickups = pickUpServices.filter((pickUpService) => {
			let picksUpAtLeastOneItem = false;
			for (const item of itemEntry) {
				console.log("pickUpService.categoriesAccepted:", pickUpService.categoriesAccepted);
				console.log("getItemCategory(item.name):", getItemCategory(item.name));

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
				acceptedItems: itemEntry.filter((item) =>
					pickup.categoriesAccepted.includes(getItemCategory(item.name)),
				),
				notAcceptedItems: itemEntry.filter(
					(item) => !pickup.categoriesAccepted.includes(getItemCategory(item.name)),
				),
			};
		});
		const sortedPossiblePickups = orgPropsList.sort((a, b) =>
			a.acceptedItems.length > b.acceptedItems.length ? -1 : 1,
		);
		return sortedPossiblePickups;
	};

	const [orgs, setOrgs] = useState<OrgProps[]>(sortPickups(items));

	return (
		<BasePage title="Home Pickup" description="Singapore's first recycling planner">
			<NonRecyclableModal setPage={setPage} items={items} getItemCategory={getItemCategory} />
			<Container
				maxW={{
					base: "full",
					sm: "container.md",
				}}
				p={0}
				pb={5}
			>
				<VStack align="stretch" my={23} spacing={4} px={6}>
					{/* Carousel */}
					<PickupCarousel numPickupServices={orgs.length} minDist={minDistance} />
					{/* Title + Back Button */}
					<ButtonRow setPage={setPage} />
					{/* Multiselect Box */}
					<ItemsAndFilterRow items={items} setOrgs={setOrgs} sortPickups={sortPickups} />
					{/* Title + List of all Services */}
					<OrgList sortedPossiblePickups={orgs} />
				</VStack>
			</Container>
		</BasePage>
	);
};
