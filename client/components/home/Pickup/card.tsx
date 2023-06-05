import { Text, Button, ButtonGroup, VStack, Heading } from "@chakra-ui/react";
import { Card, CardBody } from "@chakra-ui/card";
import { TSheetyPickupDetails } from "api/sheety/types";

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
		<Card p={5} boxShadow={"lg"} direction={{ base: "column" }} variant={"elevated"}>
			<CardBody>
				<VStack spacing={"3"} mt={"6"}>
					<Heading size={"md"} as={"b"}>
						<Text>{organisationName}</Text>
					</Heading>
					<Text fontSize={"s"}>Please visit the website for more information.</Text>
					<Text fontSize={"s"} as={"b"}>
						You can donate:
						<br />
						<Text fontSize={"xs"}>
							{categoriesAccepted}
						</Text>
					</Text>
					<Text fontSize={"s"}>
						<Text as={"b"}>Service Cost: {pricingTermsInSgd}</Text>
						<br />
						<Text as={"b"}>Min. Pickup Quantity: {minimumWeightInKg}</Text>
					</Text>
					<ButtonGroup>
						<Button colorScheme={"teal"} variant={"outline"}>
							Website
						</Button>
						<Button colorScheme={"teal"} variant={"solid"}>
							Contact
						</Button>
					</ButtonGroup>
				</VStack>
			</CardBody>
		</Card>
	);
};

export default OrgCard;
