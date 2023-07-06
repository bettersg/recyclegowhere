// General Imports
import { BasePage } from "layouts/BasePage";
import { Container, Flex, VStack, Box } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { Pages } from "spa-pages/pageEnums";
import { useUserInputs } from "hooks/useUserSelection";
import { useBreakpointValue } from "@chakra-ui/react";
import { TStateFacilities } from "app-context/SheetyContext/types";
import { useSheetyData } from "hooks/useSheetyData";
import { MAX_DISTANCE_KM, getNearbyFacilities } from "utils";
import { TItemSelection } from "app-context/SheetyContext/types";
// Component Imports
import { Location } from "components/home/UserInput/Location";
import MapIcon from "components/map/Marker/MapIcon";
import NearbyFacilitiesPanel from "components/map/NearbyFacilitiesPanel";
import PullUpTab from "components/map/PullUpTab";
import { HeaderButtons } from "components/map";
import FacilityCard from "components/map/FacilityCard";
import { FilterButton } from "components/map/NearbyFacilitiesPanel";

// Leaflet Imports
import dynamic from "next/dynamic";
import { LatLngExpression } from "leaflet";
import useMapContext from "../../hooks/useMapContext";
import useLeafletWindow from "../../hooks/useLeafletWindow";
import { useResizeDetector } from "react-resize-detector";
import MapContextProvider from "components/map/MapContextProvider";
// Reference page: https://github.com/richard-unterberg/next-leaflet-starter-typescript/blob/master/src/components/Map/ui/LocateButton.tsx

// Next.js requires dynamic imports for Leaflet.js compatibility
const LeafletMap = dynamic(
	async () => (await import("../../components/map/LeafletMap")).LeafletMap,
	{
		ssr: false,
	},
);
// Dynamic import of Marker component
const CustomMarker = dynamic(
	async () => (await import("../../components/map/Marker")).CustomMarker,
	{
		ssr: false,
	},
);
// Dynamic import of Cluster function (clusters multiple markers upon zoomout)
const Cluster = dynamic(
	async () => (await import("../../components/map/Marker/ClusterGroup")).MarkerClusterGroup(),
	{
		ssr: false,
	},
);

type Props = {
	setPage: Dispatch<SetStateAction<Pages>>;
};

const MapInner = ({ setPage }: Props) => {
	// const [addressBlur, setAddressBlur] = useState(false);
	const [filterShow, setFilterShow] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);
	const [facCardIsOpen, setFacCardIsOpen] = useState(false);
	const [facCardDetails, setFacCardDetails] = useState<TStateFacilities>({
		id: 0,
		address: "",
		categoriesAccepted: [],
		channelName: "",
		contact: "",
		latitude: 0,
		longitude: 0,
		methodsAccepted: [],
		operatingHours: "",
		recyclingSubCategory: "",
		organisationName: "",
		otherFormsOfContact: "",
		postcode: 0,
		remarks: "",
		type: "",
		website: "",
	});
	const { getFacility, facilities, getItemCategory } = useSheetyData();
	const { map } = useMapContext();
	const leafletWindow = useLeafletWindow();
	const { recyclingLocationResults, address, items, setRecyclingLocationResults } =
		useUserInputs();
	const [locations, setLocations] = useState(recyclingLocationResults?.results);
	const [nearbyLocations, setNearbyLocations] = useState(
		getNearbyFacilities(items as TItemSelection[], address, facilities, getItemCategory, 1),
	);
	const isLoading = !map || !leafletWindow;
	const isMobile = useBreakpointValue({ base: true, md: false });

	const handleStickyFooter = () => {
		setIsExpanded(!isExpanded);
		setFacCardIsOpen(false);
	};

	const centerPos =
		address.value !== ""
			? ([
					parseFloat(address.coordinates.lat),
					parseFloat(address.coordinates.long),
			  ] as LatLngExpression)
			: ([1.376690088473865, 103.7993060574394] as LatLngExpression);
	const zoom = 15;
	const {
		width: viewportWidth,
		height: viewportHeight,
		ref: viewportRef,
	} = useResizeDetector({
		refreshMode: "debounce",
		refreshRate: 200,
	});

	// const handleClick = useCallback(() => {
	// 	if (!isTouched || !map) return;

	// 	map.flyTo(centerPos, zoom);
	// 	map.once("moveend", () => {
	// 		setIsTouched(false);
	// 	});
	// }, [map, isTouched, zoom, centerPos]);

	const handleMarkerOnClick = (facility: {
		id: number;
		distance: number;
		latlng: Array<number>;
	}) => {
		const { cardIsOpen, cardDetails } = getMatchingFacility(facility);
		setFacCardIsOpen(cardIsOpen);
		setFacCardDetails(cardDetails);
	};

	const getMatchingFacility = (facility: {
		id: number;
		distance: number;
		latlng: Array<number>;
	}) => {
		let cardIsOpen = true;
		let cardDetails = facCardDetails;
		if (facility.id === facCardDetails.id) {
			cardIsOpen = !facCardIsOpen;
		} else {
			cardDetails = getFacility(facility.id);
		}

		return { cardIsOpen: cardIsOpen, cardDetails: cardDetails };
	};

	const useForceUpdate = () => {
		const [, setState] = useState(0);
		const forceUpdate = () => setState((prevState) => prevState + 1);
		return forceUpdate;
	};
	const forceUpdate = useForceUpdate();

	const handleChangedLocation = () => {
		const locations = getNearbyFacilities(
			items as TItemSelection[],
			address,
			facilities,
			getItemCategory,
			MAX_DISTANCE_KM,
		);
		const locationsWithin1km = getNearbyFacilities(
			items as TItemSelection[],
			address,
			facilities,
			getItemCategory,
			1,
		);
		setRecyclingLocationResults(locations);
		setNearbyLocations(locationsWithin1km);

		locations ? setLocations(locations.results) : setLocations(undefined);
		forceUpdate();
		map?.panTo(centerPos);
	};

	return (
		<BasePage title="Instructions" description="Singapore's first recycling planner">
			<Container
				maxW={{
					base: "full",
					sm: "container.md",
				}}
				ref={viewportRef}
			>
				<VStack spacing={5} align="stretch">
					{/* Header Buttons */}
					<HeaderButtons setPage={setPage} />
					<Flex w="100%" direction={"row"} gap={"0.3rem"}>
						<Location showText={false} handleBlur={handleChangedLocation} />
						<FilterButton onClick={() => setFilterShow(true)} />
					</Flex>

					{/* Map Display */}
					<Box overflow="hidden" width="100%" height={isMobile ? "70vh" : "80vh"}>
						<Box
							left={0}
							transition="opacity 0.3s"
							opacity={isLoading ? 0 : 1}
							top={80}
							// This was in the reference code
							width={viewportWidth ?? "100%"}
							height={viewportHeight ? viewportHeight - 80 : "100%"}
						>
							<LeafletMap center={centerPos} zoom={zoom} minZoom={11} maxZoom={18}>
								{/* The color is the background color of the cluster */}
								<Cluster icon={MapIcon} color={"#81C784"} chunkedLoading>
									{locations &&
										// ClothingType will be used to show relevant icon
										Object.entries(locations).map(([clothingType, result]) => {
											return result.facilities.map((facility) => (
												<CustomMarker
													key={facility.id}
													position={facility.latlng as LatLngExpression}
													icon={MapIcon}
													color={"#81C784"}
													handleOnClick={() =>
														handleMarkerOnClick(facility)
													}
												/>
											));
										})}
									{/* Center Marker */}
								</Cluster>
								<CustomMarker
									position={centerPos}
									icon={MapIcon}
									color={"#FF0000"}
									handleOnClick={() => setFacCardIsOpen(false)}
								/>
							</LeafletMap>
						</Box>
					</Box>

					{/* Facility Card */}
					{facCardIsOpen &&
						(isMobile ? (
							<FacilityCard
								facCardDetails={facCardDetails}
								width={"86%"}
								left={"7%"}
							/>
						) : (
							<FacilityCard
								facCardDetails={facCardDetails}
								width={"50%"}
								left={"25%"}
							/>
						))}
				</VStack>
			</Container>

			{/* Pull up tab */}
			<PullUpTab
				isExpanded={isExpanded}
				isMobile={isMobile}
				handleStickyFooter={handleStickyFooter}
				numberOfNearby={nearbyLocations.facilitiesList.length}
			/>
			{/* Panel upon pulling up */}
			{isExpanded && (
				<NearbyFacilitiesPanel
					setPage={setPage}
					handleChangedLocation={handleChangedLocation}
					showFilter={() => setFilterShow(true)}
					nearbyLocations={nearbyLocations}
					getMatchingFacility={getMatchingFacility}
				/>
			)}
		</BasePage>
	);
};

// Leaflet Map Context Provider to wrap around the Page
export const MapPage = ({ setPage }: Props) => (
	<MapContextProvider>
		<MapInner setPage={setPage} />
	</MapContextProvider>
);

export default MapPage;
