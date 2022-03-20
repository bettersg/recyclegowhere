import { Box, Button, HStack, Spacer, Text, VStack } from "@chakra-ui/react";
import React from "react";
import {
	getBlueBinRecyclableItems,
	getNonBlueBinRecyclableItems,
	hasCheckedNonBlueBinRecyclableItems,
	hasCleanedBlueBinRecyclableItems,
} from "../../..//utils";
import { StepsLayout } from "../StepsLayout";

// const GeolocationNoSSR = dynamic(() => import("./Geolocation"), {
// 	loading: () => <p>Map is loading...</p>,
// 	ssr: false,
// });

export const TakeAction = ({
	items,
	setLocation,
	setGeolocation,
	navigateBackToAddItem,
}) => {
	const blueBinRecyclableItems = getBlueBinRecyclableItems(items);
	const nonBlueBinRecyclableItems = getNonBlueBinRecyclableItems(items);
	const hasRecyclableItems =
		(blueBinRecyclableItems && blueBinRecyclableItems.length > 0) ||
		(nonBlueBinRecyclableItems && nonBlueBinRecyclableItems.length > 0);

	const hasValidRecyclableItems =
		hasCleanedBlueBinRecyclableItems(items) ||
		hasCheckedNonBlueBinRecyclableItems(items);

	// const [data, setData] = useState(null);

	// useEffect(() => {
	//     let ignore = false;

	//     if (!ignore) setData(physicalChannels);
	//     return () => {
	//       ignore = true;
	//     };
	//   }, []);
	// // Ensure that item + condition is in database.

	return (
		<StepsLayout>
			<VStack spacing={4} width="100%">
				<Text fontWeight="bold" textAlign="center" marginInline={"20%"}>
					How would you like to take action?
				</Text>

				<Box
					width={["85vw", "60vw", "40vw"]}
					borderWidth="1px"
					borderRadius="lg"
					overflow="scroll"
					height="250px"
					p="12px"
				>
					{blueBinRecyclableItems &&
						blueBinRecyclableItems.length > 0 && (
							<VStack width="100%" p="12px">
								<Text
									fontWeight="bold"
									textAlign="left"
									width="100%"
								>
									BLUE BIN RECYCLING
								</Text>

								{blueBinRecyclableItems.map(
									(blueBinRecyclableItem) => {
										return blueBinRecyclableItem.isCleaned ? (
											<Text
												textAlign="left"
												width="100%"
												key={blueBinRecyclableItem.id}
											>
												{
													blueBinRecyclableItem.description
												}
											</Text>
										) : (
											<Text
												textAlign="left"
												as="s"
												width="100%"
												key={blueBinRecyclableItem.id}
											>
												{
													blueBinRecyclableItem.description
												}
											</Text>
										);
									},
								)}
							</VStack>
						)}
					{nonBlueBinRecyclableItems &&
						nonBlueBinRecyclableItems.length > 0 && (
							<VStack width="100%" p="12px">
								<Text
									fontWeight="bold"
									textAlign="left"
									width="100%"
								>
									NON-BLUE BIN RECYCLING
								</Text>
								{nonBlueBinRecyclableItems.map(
									(nonBlueBinRecyclableItem) => {
										return (
											<HStack
												width="100%"
												key={
													nonBlueBinRecyclableItem.id
												}
											>
												<Text
													textAlign="left"
													width="50%"
												>
													{
														nonBlueBinRecyclableItem.description
													}
												</Text>
												<Spacer />
												<Text textAlign="right">
													{
														nonBlueBinRecyclableItem.condition
													}
												</Text>
											</HStack>
										);
									},
								)}
							</VStack>
						)}
					{!hasRecyclableItems && (
						<Text>No recyclable items selected!</Text>
					)}
				</Box>

				{hasValidRecyclableItems && (
					<HStack>
						<Button
							size="md"
							colorScheme="gray"
							variant="outline"
							onClick={() => {
								setLocation(true);
							}}
						>
							House Pickup
						</Button>
						<Button
							size="md"
							colorScheme="teal"
							onClick={() => {
								setGeolocation(true);
							}}
						>
							Self disposal
						</Button>
					</HStack>
				)}
				{!hasValidRecyclableItems && (
					<Button
						size="md"
						colorScheme="teal"
						onClick={navigateBackToAddItem}
					>
						Return to Add Items
					</Button>
				)}
			</VStack>

			{/* <GeolocationNoSSR /> */}
		</StepsLayout>
	);
};
