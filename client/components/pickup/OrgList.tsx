import { Divider, Heading, Center, theme } from "@chakra-ui/react";
import OrgCard from "./OrgCard";
import { OrgProps } from "spa-pages/components/PickupPage";

type Props = {
	sortedPossiblePickups: OrgProps[];
};

const OrgList = (props: Props) => {
	const colors = theme.colors;

	return (
		<>
			<Center>
				<Divider borderColor={colors.gray[500]} w="85%" />
			</Center>
			<Heading size="lg" textAlign="center">
				Pick Up Services Near You
			</Heading>
			{props.sortedPossiblePickups.map((pickup) => (
				<OrgCard key={pickup.organisation["s/n"]} orgDetails={pickup.organisation} acceptedItems={pickup.acceptedItems} notAcceptedItems={pickup.notAcceptedItems} />
			))}
		</>
	);
};

export default OrgList;