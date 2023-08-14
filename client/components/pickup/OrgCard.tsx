import { Text, Button, ButtonGroup, VStack, Heading, Flex, Icon, HStack } from "@chakra-ui/react";
import { Card, CardBody } from "@chakra-ui/card";
import { TSheetyPickupDetails } from "api/sheety/types";
import { MdOutlineScale } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";
import { BsCurrencyDollar } from "react-icons/bs";
import OrgLabel from "./OrgLabel";

const OrgCard = ({
	organisationName,
	website,
	categoriesAccepted,
	time,
	minimumWeightInKg,
	pricingTermsInSgd,
	contactMethod,
	contactDetail,
	lastUpdated
}: TSheetyPickupDetails) => {

	return (
		<Card mx={5} my={2} boxShadow="lg" >
			<CardBody>
				<VStack spacing={"3"} align="left">
					<Heading size={"md"}>
						{organisationName}
					</Heading>
					<Flex wrap="wrap" columnGap={6} rowGap={1}>
						<OrgLabel icon={MdOutlineScale} title="Min. Weight:" text={`${minimumWeightInKg} kg`} />
						<OrgLabel icon={BiTimeFive} title="Pickup Hours:" text={time} />
						<OrgLabel icon={BsCurrencyDollar} title="Service Cost:" text={`$${pricingTermsInSgd}`} />
					</Flex>
					<Text fontSize={"s"} as={"b"}>
						You can donate:
						<br />
						<Text fontSize={"xs"}>
							{categoriesAccepted}
						</Text>
					</Text>
					<ButtonGroup>
						<a href={website} target="_blank">
							<Button colorScheme={"teal"} variant={"outline"} as={"a"}>
								Website
							</Button>
						</a>
						<a href={Number.isNaN(Number(contactDetail)) ? contactDetail : `tel:${contactDetail}`} target="_blank">
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
