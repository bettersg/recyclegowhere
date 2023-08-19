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

const WeightIcon = () => {
	return (
		<svg
			width="13"
			height="14"
			viewBox="0 0 13 14"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M12.7135 1.04203C12.8933 0.867764 12.9495 0.608976 12.8554 0.376869C12.7614 0.144714 12.536 0 12.2855 0H0.713535C0.463091 0 0.237676 0.144714 0.143636 0.376869C0.0495956 0.608976 0.105784 0.871347 0.285569 1.04562C1.54194 2.26352 3.55912 2.99954 5.88467 3.1104V3.831C3.54917 4.13354 1.73912 6.13987 1.73912 8.5565C1.73912 10.3795 2.76927 11.9662 4.27783 12.7703H3.98708C3.6475 12.7703 3.37222 13.0455 3.37222 13.3851C3.37222 13.7247 3.64745 14 3.98704 14H8.96175C9.30133 14 9.57662 13.7247 9.57662 13.3851C9.57662 13.0455 9.30133 12.7703 8.96175 12.7703H8.72125C10.2298 11.9662 11.26 10.3795 11.26 8.5565C11.26 6.13987 9.44991 4.13349 7.11436 3.831V3.1104C9.43992 2.99949 11.4571 2.25989 12.7135 1.04203ZM10.1899 1.22974C9.14521 1.65539 7.86541 1.91008 6.49954 1.91008C5.13367 1.91008 3.85387 1.65539 2.80915 1.22974H10.1899ZM10.0303 8.55183C10.0303 10.4987 8.44644 12.0826 6.49954 12.0826C4.55265 12.0826 2.96881 10.4987 2.96881 8.55183C2.96881 6.60494 4.55265 5.02105 6.49954 5.02105C8.44644 5.02105 10.0303 6.60498 10.0303 8.55183Z"
				fill="black"
			/>
		</svg>
	);
};
const DollarIcon = () => {
	return (
		<svg
			width="15"
			height="14"
			viewBox="0 0 15 14"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M8.08333 2.04232C8.08333 1.72015 7.82217 1.45898 7.5 1.45898C7.17782 1.45898 6.91667 1.72015 6.91667 2.04232V2.36852C6.23414 2.45031 5.60613 2.67529 5.10608 3.02068C4.46405 3.46416 4 4.13664 4 4.95898C4 5.70215 4.28681 6.39229 4.92038 6.87967C5.42005 7.26403 6.09279 7.48978 6.91667 7.56007V10.4551C6.45939 10.3818 6.06527 10.2253 5.76914 10.0207C5.35554 9.73497 5.16667 9.38666 5.16667 9.04232C5.16667 8.72014 4.9055 8.45898 4.58333 8.45898C4.26117 8.45898 4 8.72014 4 9.04232C4 9.86464 4.46405 10.5372 5.10608 10.9806C5.60613 11.326 6.23414 11.551 6.91667 11.6328V11.959C6.91667 12.2812 7.17782 12.5423 7.5 12.5423C7.82217 12.5423 8.08333 12.2812 8.08333 11.959V11.6344C8.76128 11.5565 9.3886 11.3421 9.89015 11.0014C10.5405 10.5597 11 9.88442 11 9.04232C11 8.28013 10.7167 7.58527 10.0759 7.10052C9.57492 6.72158 8.90228 6.5068 8.08333 6.44007V3.54623C8.54061 3.61945 8.93477 3.77607 9.23087 3.98061C9.64445 4.26631 9.83333 4.61466 9.83333 4.95898C9.83333 5.28115 10.0945 5.54232 10.4167 5.54232C10.7388 5.54232 11 5.28115 11 4.95898C11 4.13664 10.536 3.46416 9.89394 3.02069C9.39391 2.67528 8.76589 2.45031 8.08333 2.36852V2.04232ZM6.91667 3.54623C6.45939 3.61946 6.06527 3.77607 5.76914 3.98062C5.35554 4.26631 5.16667 4.61466 5.16667 4.95898C5.16667 5.38249 5.31737 5.71315 5.63171 5.95497C5.89173 6.15499 6.30237 6.32305 6.91667 6.38827V3.54623ZM8.08333 7.6114V10.4577C8.54481 10.3877 8.93978 10.2366 9.23466 10.0363C9.63996 9.76104 9.83333 9.41553 9.83333 9.04232C9.83333 8.58918 9.6791 8.26322 9.37209 8.03099C9.11338 7.83534 8.7026 7.67364 8.08333 7.6114Z"
				fill="black"
			/>
		</svg>
	);
};

const ClockIcon = () => {
	return (
		<svg
			width="15"
			height="14"
			viewBox="0 0 15 14"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M7.5 4.66602V6.99935L9.25 8.74935"
				stroke="black"
				strokeWidth="1.2"
				strokeLinecap="round"
			/>
			<path
				d="M7.5 12.25C10.3995 12.25 12.75 9.8995 12.75 7C12.75 4.1005 10.3995 1.75 7.5 1.75C4.6005 1.75 2.25 4.1005 2.25 7C2.25 9.8995 4.6005 12.25 7.5 12.25Z"
				stroke="black"
				strokeWidth="1.2"
			/>
		</svg>
	);
};

export default OrgCard;
