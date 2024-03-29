import { Box, VStack, Flex, Button, Text } from "@chakra-ui/react";
import { COLORS } from "theme";
import { Pages } from "spa-pages/pageEnums";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Location } from "components/home/UserInput/Location";
import { Dispatch, SetStateAction } from "react";
import { RecyclingLocationResults } from "app-context/UserSelectionContext/types";
import { TStateFacilities } from "app-context/SheetyContext/types";
import { Image } from "@chakra-ui/react";
import { FacilityType } from "app-context/UserSelectionContext/types";
import { FilterButton } from "./Buttons";

type NearbyFacilitiesType = {
	setPage: Dispatch<SetStateAction<Pages>>;
	handleChangedLocation: () => void;
	showFilter: () => void;
	nearbyLocations: RecyclingLocationResults;
	getMatchingFacility: (facility: FacilityType) => {
		cardDetails: TStateFacilities;
	};
	isMobile: boolean | undefined;
};

export const NearbyFacilitiesPanel = ({
	setPage,
	handleChangedLocation,
	showFilter,
	nearbyLocations,
	getMatchingFacility,
	isMobile,
}: NearbyFacilitiesType) => {
	return (
		<Box
			position={"fixed"}
			height={isMobile ? "calc(92vh - 53px)" : "calc(90vh - 53px)"}
			width={"100vw"}
			bg="white"
			zIndex={1000}
			bottom={0}
			overflowY={"scroll"}
			overflowX={"hidden"}
		>
			<VStack p={7}>
				<Flex flexDir={"row"} w={"100%"} gap={3}>
					<Button
						bg={COLORS.Button.primary}
						color={COLORS.white}
						leftIcon={<ChevronLeftIcon />}
						onClick={() => setPage(Pages.HOME)}
					>
						Restart!
					</Button>
					<Location showText={false} handleBlur={handleChangedLocation} />
					<FilterButton onClick={showFilter} />
				</Flex>
				<Flex flexDir={"column"} maxW={"100vw"} p={5}>
					{nearbyLocations.results &&
						Object.entries(nearbyLocations.results).map(
							([clothingType, result], idx) => {
								const limitedResults = result.facilities.slice(0, 3);

								return (
									<Box key={idx}>
										<b>
											Nearby facilities that take <u>{clothingType}</u>
										</b>
										{limitedResults.length > 0 ? (
											limitedResults.map((facility) => {
												const { cardDetails } =
													getMatchingFacility(facility);
												return (
													<Flex
														key={cardDetails.id}
														height="150px"
														width={"86vw"}
														marginInline={"1vw"}
														bg="white"
														zIndex={99999}
														rounded="xl"
														flexDir={"row"}
														mb={5}
													>
														<Image
															height={"100%"}
															width={"50%"}
															src={"/placeholder.png"}
															alt="Image not found."
														/>
														<Flex
															flexDir={"column"}
															gap={3}
															padding={2}
														>
															<Text fontSize={"sm"} as={"b"}>
																{cardDetails.channelName}
															</Text>
															<Text fontSize={"xs"}>
																<b>Address:</b>{" "}
																{cardDetails.address
																	? cardDetails.address
																	: `${cardDetails.latitude}, ${cardDetails.longitude}`}
															</Text>
															<Text fontSize={"xs"}>
																<b>Categories Accepted: </b>
																{cardDetails.categoriesAccepted.map(
																	(category) => category + ", ",
																)}
															</Text>
														</Flex>
													</Flex>
												);
											})
										) : (
											<Box>No results for this item.</Box>
										)}
									</Box>
								);
							},
						)}
				</Flex>
			</VStack>
		</Box>
	);
};
