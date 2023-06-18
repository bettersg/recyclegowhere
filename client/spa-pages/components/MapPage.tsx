import { BasePage } from "layouts/BasePage";
import { Container, Flex, VStack, IconButton, Box, Button, Image, Text } from "@chakra-ui/react";
import { HeaderButtons } from "components/map";
import { Dispatch, SetStateAction, useState, MouseEventHandler } from "react";
import { Pages } from "spa-pages/pageEnums";
import { Location } from "components/home/UserInput/Location";
import { COLORS } from "theme";
import { HamburgerIcon } from "@chakra-ui/icons";
import MapIcon from "components/map/Marker/MapIcon";
import { useUserInputs } from "hooks/useUserSelection";
import { ChevronLeftIcon } from "@chakra-ui/icons";
// Leaflet Imports
import dynamic from "next/dynamic";
import { LatLngExpression } from "leaflet";
import useMapContext from "../../hooks/useMapContext";
import useLeafletWindow from "../../hooks/useLeafletWindow";
import { useResizeDetector } from "react-resize-detector";
import MapContextProvider from "components/map/MapContextProvider";
// Reference page: https://github.com/richard-unterberg/next-leaflet-starter-typescript/blob/master/src/components/Map/ui/LocateButton.tsx
import { useBreakpointValue } from "@chakra-ui/react";
import { TStateFacilities } from "app-context/SheetyContext/types";
import { useSheetyData } from "hooks/useSheetyData";

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

interface ButtonProps {
	onClick: MouseEventHandler<HTMLButtonElement>;
}

// Button Design for the filter button
const FilterButton = ({ onClick }: ButtonProps) => {
	return (
		<IconButton
			variant="solid"
			color={COLORS.gray[700]}
			background={COLORS.gray[100]}
			aria-label="add line"
			icon={<HamburgerIcon />}
			onClick={onClick}
		/>
	);
};

const MapInner = ({ setPage }: Props) => {
	const [addressBlur, setAddressBlur] = useState(false);
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
	const { getFacility } = useSheetyData();
	// const [isTouched, setIsTouched] = useState(false);
	const { map } = useMapContext();
	const leafletWindow = useLeafletWindow();
	const { recyclingLocationResults, address } = useUserInputs();
	const locations = recyclingLocationResults?.results;
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
	const zoom = 50;
	const {
		width: viewportWidth,
		height: viewportHeight,
		ref: viewportRef,
	} = useResizeDetector({
		refreshMode: "debounce",
		refreshRate: 200,
	});

	const showFilter = () => {
		setFilterShow(true);
	};

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
		facility.id === facCardDetails.id
			? setFacCardIsOpen(!facCardIsOpen)
			: setFacCardIsOpen(true);
		setFacCardDetails(getFacility(facility.id));
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
				<VStack spacing={30} align="stretch">
					<HeaderButtons setPage={setPage} />
					<Flex w="100%" direction={"row"} gap={"0.3rem"}>
						<Location showText={false} handleBlur={() => setAddressBlur(true)} />
						<FilterButton onClick={showFilter} />
					</Flex>
					<Box overflow="hidden" width="100%" height={isMobile ? "70vh" : "80vh"}>
						<Box
							left={0}
							transition="opacity 0.3s"
							opacity={isLoading ? 0 : 1}
							top={80}
							width={viewportWidth ?? "100%"}
							height={viewportHeight ? viewportHeight - 80 : "100%"}
						>
							<LeafletMap center={centerPos} zoom={zoom} minZoom={11} maxZoom={18}>
								<Cluster icon={MapIcon} color={"#81C784"} chunkedLoading>
									{locations &&
										Object.entries(locations).map(([clothingType, result]) =>
											result.facilities.map(
												(facility: {
													id: number;
													distance: number;
													latlng: Array<number>;
												}) => (
													<CustomMarker
														key={facility.id}
														position={
															facility.latlng as LatLngExpression
														}
														icon={MapIcon}
														color={"#81C784"}
														handleOnClick={() =>
															handleMarkerOnClick(facility)
														}
													/>
												),
											),
										)}
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
					{facCardIsOpen && !isMobile && (
						<Flex
							position={"fixed"}
							height="150px"
							width={"50%"}
							left={"25%"}
							bg="white"
							marginLeft={"20%"}
							zIndex={99999}
							bottom={"80px"}
							rounded="xl"
							flexDir={"row"}
						>
							<Image height={"100%"} width={"50%"} left={0} />
							<Flex flexDir={"column"} gap={3} padding={2}>
								<Text fontSize={"sm"} as={"b"}>
									{facCardDetails.channelName}
								</Text>
								<Text fontSize={"xs"}>
									<b>Address:</b> {facCardDetails.address}
								</Text>
								<Text fontSize={"xs"}>
									<b>Categories Accepted: </b>
									{facCardDetails.categoriesAccepted.map(
										(category) => category + ", ",
									)}
								</Text>
							</Flex>
						</Flex>
					)}
				</VStack>
			</Container>
			<Box
				as="footer"
				w="100%"
				bg="white"
				py={4}
				position="fixed"
				bottom={isExpanded ? (isMobile ? "93.5vh" : "91.5vh") : 0}
				transition="bottom 0.1s"
				zIndex={9999}
				onClick={handleStickyFooter}
				height="57px"
			>
				<Box textAlign="center" position="relative" cursor="pointer">
					<Box
						position="absolute"
						top="-10px"
						left="50%"
						transform="translateX(-50%)"
						w="30px"
						h="2px"
						bg="black"
						borderTopRadius="xl"
					/>
					<Box>
						<p>x nearby.</p>
					</Box>
				</Box>
			</Box>
			{isExpanded && (
				<Box
					position={"fixed"}
					height="calc(100vh - 53px)"
					width={"100vw"}
					bg="white"
					zIndex={99999}
					bottom={0}
				>
					<Flex p={7}>
						<Flex flexDir={"row"} w={"100%"} gap={3}>
							<Button
								bg={COLORS.Button.primary}
								color={COLORS.white}
								leftIcon={<ChevronLeftIcon />}
							>
								Restart!
							</Button>
							<Location showText={false} handleBlur={() => setAddressBlur(true)} />
							<FilterButton onClick={showFilter} />
						</Flex>
					</Flex>
				</Box>
			)}
			{facCardIsOpen && isMobile && (
				<Flex
					position={"fixed"}
					height="150px"
					width={"86vw"}
					marginInline={"7vw"}
					bg="white"
					zIndex={99999}
					bottom={"80px"}
					rounded="xl"
					flexDir={"row"}
				>
					<Image height={"100%"} width={"50%"} left={0} />
					<Flex flexDir={"column"} gap={3} padding={2}>
						<Text fontSize={"sm"} as={"b"}>
							{facCardDetails.channelName}
						</Text>
						<Text fontSize={"xs"}>
							<b>Address:</b> {facCardDetails.address}
						</Text>
						<Text fontSize={"xs"}>
							<b>Categories Accepted: </b>
							{facCardDetails.categoriesAccepted.map((category) => category + ", ")}
						</Text>
					</Flex>
				</Flex>
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
