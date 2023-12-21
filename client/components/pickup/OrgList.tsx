import { Box, Heading, Text } from "@chakra-ui/react";
import OrgCard from "./OrgCard";
import { OrgProps } from "spa-pages/components/PickupPage";

type Props = {
	sortedPossiblePickups: OrgProps[];
};

const OrgList = (props: Props) => {
	return (
		<Box>
			<Heading size="md" textAlign="left" mb={4}>
				Pick Up Services Near You
			</Heading>
			{props.sortedPossiblePickups.length > 0 ? (
				props.sortedPossiblePickups.map((pickup) => (
					<OrgCard
						key={pickup.organisation["s/n"]}
						orgDetails={pickup.organisation}
						acceptedItems={pickup.acceptedItems}
						notAcceptedItems={pickup.notAcceptedItems}
					/>
				))
			) : (
				<Text textAlign={"center"}>No relevant pick up services were found. :(</Text>
			)}
		</Box>
	);
};

export default OrgList;
