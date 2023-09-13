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
					<Carousel minDist={minDistance} />
					<ButtonRow setPage={setPage} />
					<ItemsAndFilterRow items={items} />
					<OrgList items={items} />
				</VStack>
			</Container>
		</BasePage>
	);
};
