import { Text, Button, ButtonGroup, VStack, Heading, Flex, Accordion, AccordionItem, AccordionButton, Box, AccordionIcon, AccordionPanel, Spacer, theme } from "@chakra-ui/react";
import { Card, CardBody } from "@chakra-ui/card";
import { TSheetyPickupDetails } from "api/sheety/types";
import { MdOutlineScale } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";
import { BsCurrencyDollar } from "react-icons/bs";
import OrgLabel from "./OrgLabel";
import { TEmptyItem, TItemSelection } from "app-context/SheetyContext/types";
import { Categories } from "api/sheety/enums";
import { CheckIcon, SmallCloseIcon } from "@chakra-ui/icons";

type Props = {
	items: (TItemSelection | TEmptyItem)[];
	orgDetails: TSheetyPickupDetails;
	getItemCategory: (itemName: string) => Categories;
};

const OrgCard = (props: Props) => {
	const items = props.items;
	const {
		organisationName,
		website,
		categoriesAccepted,
		time,
		minimumWeightInKg,
		pricingTermsInSgd,
		contactMethod,
		contactDetail,
		lastUpdated
	} = props.orgDetails;
	const colors = theme.colors;

	const getItemCategory = props.getItemCategory;

	const numItems = items.length;
	const acceptedItems = items.filter((item) => categoriesAccepted.includes(getItemCategory(item.name)));
	const notAcceptedItems = items.filter((item) => !categoriesAccepted.includes(getItemCategory(item.name)));

	return (
		<Card mx={5} my={2} boxShadow="md" border="2px" borderColor={colors.gray[100]} >
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
					<Accordion allowToggle>
						<AccordionItem border="none">
							<h2>
								<AccordionButton py={1} bgColor={colors.green[100]} border="1px" borderColor={colors.green[300]} borderRadius="md" _hover={{ bg: colors.green[100] }}>
									<Box rowGap={2} as="b" flex="1" textAlign="left" fontSize="sm" textColor={colors.gray[700]}>
										<CheckIcon boxSize="3" ml={1} mr={2} color={colors.green[400]} />
										Accepted: {acceptedItems.length}/{numItems} items
									</Box>
									<AccordionIcon />
								</AccordionButton>
							</h2>
							<AccordionPanel pb={4} fontSize="sm">
								<Box>
									<Text>{acceptedItems.map((item) => item.name).join(", ")}</Text>
									<Spacer mt={4} />
									<Text as="b">They also accept these items:</Text>
									<Text>{categoriesAccepted.slice(0, 1)}{categoriesAccepted.slice(1).toLowerCase().replaceAll("_", " ")}.</Text>
									<Text>Please check their website for more info.</Text>
								</Box>
							</AccordionPanel>
						</AccordionItem>
					</Accordion>
					{notAcceptedItems.length > 0 &&
						<Accordion allowToggle>
							<AccordionItem border="none">
								<h2>
									<AccordionButton py={1} bgColor={colors.red[100]} border="1px" borderColor={colors.red[300]} borderRadius="md" _hover={{ bg: colors.red[100] }}>
										<Box rowGap={2} as="b" flex="1" textAlign="left" fontSize="sm" textColor={colors.gray[700]}>
											<SmallCloseIcon boxSize="4" mr={2} color={colors.red[400]} />
											Not Accepted: {notAcceptedItems.length}/{numItems} items
										</Box>
										<AccordionIcon />
									</AccordionButton>
								</h2>
								<AccordionPanel pb={4} fontSize="sm">
									{notAcceptedItems.map((item) => item.name).join(", ")}
								</AccordionPanel>
							</AccordionItem>
						</Accordion>
					}
					<ButtonGroup mt={4}>
						<a href={website} target="_blank" rel="noreferrer">
							<Button colorScheme={"teal"} variant={"outline"}>
								Website
							</Button>
						</a>
						<a href={Number.isNaN(Number(contactDetail)) ? contactDetail : `tel:${contactDetail}`} target="_blank" rel="noreferrer">
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
