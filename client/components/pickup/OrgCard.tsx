import {
	Text,
	Button,
	ButtonGroup,
	VStack,
	Heading,
	Flex,
	Box,
	theme,
	Divider,
} from "@chakra-ui/react";

import { Card, CardBody } from "@chakra-ui/card";
import { TSheetyPickupDetails } from "api/sheety/types";
import { MdOutlineScale } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";
import { BsCurrencyDollar } from "react-icons/bs";
import OrgLabel from "./OrgLabel";
import { TEmptyItem, TItemSelection } from "app-context/SheetyContext/types";
import { AcceptedTab, UnacceptedTab } from "components/map";

type Props = {
	orgDetails: TSheetyPickupDetails;
	acceptedItems: (TItemSelection | TEmptyItem)[];
	notAcceptedItems: (TItemSelection | TEmptyItem)[];
};

const OrgCard = (props: Props) => {
	const {
		organisationName,
		website,
		categoriesAccepted,
		time,
		minimumWeightInKg,
		pricingTermsInSgd,
		contactMethod,
		contactDetail,
		lastUpdated,
	} = props.orgDetails;
	const { acceptedItems, notAcceptedItems } = props;
	const numItems = acceptedItems.length + notAcceptedItems.length;
	const colors = theme.colors;

	return (
		<Card my={2} boxShadow="md" border="2px" borderColor={colors.gray[100]}>
			<CardBody>
				<VStack spacing={"3"} align="left">
					<Heading size={"md"}>{organisationName}</Heading>
					<Flex wrap="wrap" columnGap={6} rowGap={1}>
						<OrgLabel
							icon={MdOutlineScale}
							title="Min. Weight:"
							text={`${minimumWeightInKg} kg`}
						/>
						<OrgLabel icon={BiTimeFive} title="Pickup Hours:" text={time} />
						<OrgLabel
							icon={BsCurrencyDollar}
							title="Service Cost:"
							text={`$${pricingTermsInSgd}`}
						/>
					</Flex>
					<Divider />
					<Box>
						<Text color={"black"} fontWeight={500} mb={1}>
							They accept {acceptedItems.length} of {numItems} items:
						</Text>
						<Flex gap={2} fontSize={"xs"} width={"100%"} wrap={"wrap"}>
							{acceptedItems.map((item, idx) => (
								<AcceptedTab key={idx}>{item.name}</AcceptedTab>
							))}
							{notAcceptedItems.map((item, idx) => (
								<UnacceptedTab key={idx}>{item.name}</UnacceptedTab>
							))}
						</Flex>
					</Box>
					<Box>
						<Text as="b">They also accept these items:</Text>
						<Text>
							{categoriesAccepted
								.split(" ")
								.map(
									(category) =>
										category.slice(0, 1) +
										category.slice(1).toLowerCase().replaceAll("_", " "),
								)
								.join(" ")}
						</Text>
					</Box>
					<ButtonGroup mt={2}>
						<a href={website} target="_blank" rel="noreferrer">
							<Button
								colorScheme={"teal"}
								variant={"outline"}
								disabled={website ? false : true}
							>
								Website
							</Button>
						</a>
						<a
							href={
								Number.isNaN(Number(contactDetail))
									? contactDetail
									: `tel:${contactDetail}`
							}
							target="_blank"
							rel="noreferrer"
						>
							<Button colorScheme={"teal"} variant={"solid"}>
								Arrange Pickup!
							</Button>
						</a>
					</ButtonGroup>
				</VStack>
			</CardBody>
		</Card>
	);
};

export default OrgCard;
