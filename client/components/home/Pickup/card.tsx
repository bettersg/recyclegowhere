import { Text, Button, ButtonGroup, VStack, Heading } from "@chakra-ui/react";
import { Card, CardBody } from "@chakra-ui/card";

const OrgCard = () => {
	return (
		<Card p={5} boxShadow={"lg"} direction={{ base: "column" }} variant={"elevated"}>
			<CardBody>
				<VStack spacing={"3"} mt={"6"}>
					<Heading size={"md"} as={"b"}>
						<Text>Organisation Name</Text>
					</Heading>
					<Text fontSize={"s"}>Please visit the website for more information.</Text>
					<Text fontSize={"s"} as={"b"}>
						You can donate:
						<br />
						<Text fontSize={"xs"}>
							Clothing, Bags and Accessories, Books, Stationery, Drink Cans.
						</Text>
					</Text>
					<Text fontSize={"s"}>
						<Text as={"b"}>Service Cost:</Text> $30
						<br />
						<Text as={"b"}>Min. Pickup Quantity: </Text>40kg
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
