import { Text, Button, ButtonGroup, VStack, Heading, HStack, Box } from "@chakra-ui/react";
import { Card, CardBody } from "@chakra-ui/card";
import { TSheetyPickupDetails } from "api/sheety/types";
import NextLink from "next/link";
import { useUserInputs } from "hooks/useUserSelection";
import { useSheetyData } from "hooks/useSheetyData";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
	Accordion,
	AccordionItem,
	AccordionIcon,
	AccordionButton,
	AccordionPanel,
} from "@chakra-ui/react";
import { WeightIcon, ClockIcon, DollarIcon } from "./Icons";
const OrgCard = ({
	organisationName,
	website,
	categoriesAccepted,
	time,
	minimumWeightInKg,
	pricingTermsInSgd,
	contactMethod,
	contactDetail,
	lastUpdated,
}: TSheetyPickupDetails) => {
	const { items } = useUserInputs();
	const { getItemCategory, processCategory } = useSheetyData();
	const acceptedItems = [];
	const unacceptedItems = [];
	const categoriesNoted = [] as string[];
	const categoriesArray = categoriesAccepted.split(", ");

	for (const item of items) {
		const itemCategory = getItemCategory(item.name);
		if (categoriesAccepted.includes(itemCategory)) {
			acceptedItems.push(item.name);
			categoriesNoted.push(itemCategory);
		} else {
			unacceptedItems.push(item.name);
		}
	}

	const otherCategories = categoriesArray
		.filter((category) => !categoriesNoted.includes(category))
		.map(processCategory);

	const handlePickup = (detail: any) => {
		let contact = detail;
		if (typeof detail === "number") {
			contact = `tel:${detail}`;
		}
		window.location.href = contact;
	};
	return (
		<Card p={5} boxShadow={"lg"} direction={{ base: "column" }} variant={"elevated"}>
			<CardBody>
				<VStack align="flex-start" spacing={"3"} mt={"6"}>
					<Heading size={["md", "lg"]} as={"b"}>
						<Text textAlign={"left"}>{organisationName}</Text>
					</Heading>
					<VStack fontSize={["sm", "md"]} w={"100%"} align="flex-start">
						<HStack w={"100%"}>
							<HStack w={"50%"}>
								<WeightIcon />
								<Text as={"b"}>Min Weight:</Text>
								<Text>{minimumWeightInKg} kg</Text>
							</HStack>
							<HStack w={"50%"}>
								<ClockIcon />
								<Text as={"b"}>Pickup Hours:</Text>
								<Text>{time}</Text>
							</HStack>
						</HStack>
						<HStack>
							<DollarIcon />
							<Text as={"b"}>Service Cost: </Text>
							<Text>${pricingTermsInSgd}</Text>
						</HStack>
					</VStack>
					<Accordion allowToggle w={"100%"}>
						<AccordionItem mb={3} border="0px">
							<h2>
								<AccordionButton
									bgColor={"green.100"}
									border="1px"
									borderColor={"green.700"}
									rounded="md"
								>
									<HStack>
										<CheckIcon color={"green.700"} />
										<Text as="b" flex="1" textAlign="left">
											Accepted: {acceptedItems.length}/
											{Object.keys(items).length} items
										</Text>
									</HStack>

									<AccordionIcon />
								</AccordionButton>
							</h2>
							<AccordionPanel pb={4}>
								<VStack gap={3} align="flex-start">
									<Text>{acceptedItems.join(", ")}</Text>
									<Box>
										<Text as={"b"}>
											They also accept these <Text as={"u"}>categories</Text>{" "}
											of items:
										</Text>
										<Text>{otherCategories.join(", ")}</Text>
									</Box>
								</VStack>
							</AccordionPanel>
						</AccordionItem>
						{acceptedItems.length !== Object.keys(items).length && (
							<AccordionItem border="0px">
								<h2>
									<AccordionButton
										bgColor={"red.100"}
										border="1px"
										borderColor={"red.700"}
										rounded="md"
									>
										<HStack>
											<CloseIcon color={"red.700"} />
											<Text as="b" flex="1" textAlign="left">
												Not Accepted:{" "}
												{Object.keys(items).length - acceptedItems.length}/
												{Object.keys(items).length} items
											</Text>
										</HStack>
										<AccordionIcon />
									</AccordionButton>
								</h2>
								<AccordionPanel pb={4}>{unacceptedItems.join(", ")}</AccordionPanel>
							</AccordionItem>
						)}
					</Accordion>

					<ButtonGroup>
						<NextLink href={website} passHref>
							<Button colorScheme={"teal"} variant={"outline"} as={"a"}>
								Website
							</Button>
						</NextLink>
						<Button
							onClick={() => handlePickup(contactDetail)}
							colorScheme={"teal"}
							variant={"solid"}
						>
							Arrange Pickup!
						</Button>
					</ButtonGroup>
				</VStack>
			</CardBody>
		</Card>
	);
};

export default OrgCard;
