// General Imports
import { BasePage } from "layouts/BasePage";
import { Flex, VStack, Box, IconButton, useDisclosure } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { Pages } from "spa-pages/pageEnums";
import { useUserInputs } from "hooks/useUserSelection";
import { TStateFacilities } from "app-context/SheetyContext/types";
import { useSheetyData } from "hooks/useSheetyData";
import { MAX_DISTANCE_KM, getNearbyFacilities } from "utils";
import { TItemSelection, TEmptyItem } from "app-context/SheetyContext/types";
import { FacilityType } from "app-context/UserSelectionContext/types";
import Select from "react-select";
import { ActionMeta, MultiValue } from "react-select";
import { Methods } from "api/sheety/enums";
import { ChangeEvent } from "react";

// Component Imports
import { Location } from "components/home/UserInput/Location";
import UserIcon from "components/map/Marker/icons/UserIcon";
import GeneralIcon from "components/map/Marker/icons/GeneralIcon";
import ClusterIcon from "components/map/Marker/icons/ClusterIcon";
// import NearbyFacilitiesPanel from "components/map/NearbyFacilitiesPanel";
// import PullUpTab from "components/map/PullUpTab";
import { FacilityCard, FilterPanel, MapContextProvider } from "components/map";
import { FilterButton } from "components/map/Buttons";

// Leaflet Imports
import dynamic from "next/dynamic";
import { LatLngExpression } from "leaflet";
import useMapContext from "../../hooks/useMapContext";
import useLeafletWindow from "../../hooks/useLeafletWindow";
import { useResizeDetector } from "react-resize-detector";
import NonRecyclableModal from "components/common/NonRecyclableModal";
import { ArrowBackIcon } from "@chakra-ui/icons";
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
// Dynamic import of Polyline component
const CustomPolyline = dynamic(
	async () => (await import("../../components/map/CustomPolyline")).CustomPolyline,
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
export type OptionType = {
	value: string;
	label: string;
	method: Methods | undefined;
	idx: number;
};

type Props = {
	setPage: Dispatch<SetStateAction<Pages>>;
};

const MapInner = ({ setPage }: Props) => {
	////// Hooks //////
	const { getFacility, facilities, getItemCategory } = useSheetyData();
	const { map } = useMapContext();
	const leafletWindow = useLeafletWindow();
	const { recyclingLocationResults, address, items, setRecyclingLocationResults } =
		useUserInputs();
	////// States //////
	const [lineCoords, setLineCoords] = useState<[number, number][]>(
		recyclingLocationResults?.route.coords ?? [[0, 0]],
	);
	const [lineColor, setLineColor] = useState(
		recyclingLocationResults?.route.complete ? "green" : "blue",
	);

	// Filters
	const { isOpen: isFilterOpen, onOpen: onFilterOpen, onClose: onFilterClose } = useDisclosure();
	const [range, setRange] = useState(60);
	// const [isExpanded, setIsExpanded] = useState(false);

	// Multiselect Box
	const selectOptions: OptionType[] = items.map((item) => ({
		value: item.name,
		label: item.name,
		method: item.method,
		idx: index++,
	}));
	const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([...selectOptions]);
	// Internal tracking of user-selected items
	const [itemState, setItemState] = useState<(TItemSelection | TEmptyItem)[]>(items);

	// Facility Card
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
	const [facCardDistance, setFacCardDistance] = useState(0);

	// Locations of facilities
	const [locations, setLocations] = useState(recyclingLocationResults?.results);

	////// Variables //////
	const isLoading = !map || !leafletWindow;
	const zoom = 15;
	let index = 0;

	const [centerPos, setCenterPos] = useState<LatLngExpression>(
		address.value !== ""
			? ([
					parseFloat(address.coordinates.lat),
					parseFloat(address.coordinates.long),
			  ] as LatLngExpression)
			: ([1.376690088473865, 103.7993060574394] as LatLngExpression),
	);

	const {
		width: viewportWidth,
		height: viewportHeight,
		ref: viewportRef,
	} = useResizeDetector({
		refreshMode: "debounce",
		refreshRate: 200,
	});

	const handleMarkerOnClick = (facility: FacilityType) => {
		const { cardIsOpen, cardDetails, distance } = getMatchingFacility(facility);
		setFacCardIsOpen(cardIsOpen);
		setFacCardDetails(cardDetails);
		setFacCardDistance(distance);
	};

	const getMatchingFacility = (facility: FacilityType) => {
		let cardIsOpen = true;
		let cardDetails = facCardDetails;
		if (facility.id === facCardDetails.id) {
			cardIsOpen = !facCardIsOpen;
		} else {
			cardDetails = getFacility(facility.id);
		}

		return { cardIsOpen: cardIsOpen, cardDetails: cardDetails, distance: facility.distance };
	};

	// Handle the changing of location in this page itself
	const handleChangedLocation = (itemEntry: (TItemSelection | TEmptyItem)[]) => {
		const locations = getNearbyFacilities(
			itemEntry as TItemSelection[],
			address,
			facilities,
			getItemCategory,
			MAX_DISTANCE_KM,
		);
		locations.route.complete ? setLineColor("green") : setLineColor("blue");
		console.log(lineColor);
		setLineCoords(locations.route.coords);

		// Set map position
		setCenterPos([
			parseFloat(address.coordinates.lat),
			parseFloat(address.coordinates.long),
		] as LatLngExpression);
		// Set facilities list on React Context
		setRecyclingLocationResults(locations);
		// For current display of facilities
		locations ? setLocations(locations.results) : setLocations(undefined);

		map?.panTo([
			parseFloat(address.coordinates.lat),
			parseFloat(address.coordinates.long),
		] as LatLngExpression);
	};

	// Handle change in multi-select box (remove, add items)
	const handleMultiselectOnChange = (
		newValue: MultiValue<OptionType>,
		actionMeta: ActionMeta<OptionType>,
	) => {
		let updatedItemState: (TItemSelection | TEmptyItem)[] = itemState;
		let updatedOptions: OptionType[] = selectedOptions;
		// If user adds an option
		if (actionMeta.action === "select-option") {
			const newItem = {
				name: actionMeta.option?.label,
				method: actionMeta.option?.method as Methods,
			} as TItemSelection;
			itemState.push(newItem);
			updatedItemState = [...itemState];
			updatedOptions.push(actionMeta.option as OptionType);
			// If user removes an option
		} else if (actionMeta.action === "remove-value") {
			const removedValue = actionMeta.removedValue;
			updatedItemState = itemState.filter((item) => {
				return item.name !== removedValue.label;
			});
			updatedOptions = selectedOptions.filter(
				(option) => option.value !== removedValue.label,
			);
		}
		setSelectedOptions(updatedOptions);
		handleChangedLocation(updatedItemState);
		setItemState(updatedItemState);
		setFacCardIsOpen(false);
	};

	// Handle changes in items selected in the Filter panel
	const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
		let updatedItemState: (TItemSelection | TEmptyItem)[] = itemState;
		let updatedOptions: OptionType[] = selectedOptions;
		if (e.target.checked) {
			// If add
			const newItem = {
				name: e.target.value,
				method: e.target.name as Methods,
			} as TItemSelection;
			itemState.push(newItem);
			updatedItemState = [...itemState];
			const newOption: OptionType = {
				value: e.target.value,
				label: e.target.value,
				method: e.target.name as Methods,
				idx: parseInt(e.target.dataset.key as string),
			};
			updatedOptions.push(newOption);
		} else if (!e.target.checked) {
			// If remove
			updatedItemState = itemState.filter((item) => {
				return item.name !== e.target.value;
			});
			updatedOptions = selectedOptions.filter((option) => option.value !== e.target.value);
		}
		handleChangedLocation(updatedItemState);
		setSelectedOptions(updatedOptions);
		setItemState(updatedItemState);
	};

	const selectAllItems = () => {
		const selectOptions: OptionType[] = items.map((item) => ({
			value: item.name,
			label: item.name,
			method: item.method,
			idx: index++,
		}));
		const itemState = items.map((item) => ({
			name: item.name,
			method: item.method,
		}));

		handleChangedLocation(itemState);
		setItemState(itemState);
		setSelectedOptions(selectOptions);
	};

	// Handle the changes in distance selected in Filter panel
	const handleSliderChange = (val: number) => {
		const dist = val / 10;
		const locations = getNearbyFacilities(
			itemState as TItemSelection[],
			address,
			facilities,
			getItemCategory,
			dist,
		);
		locations.route.complete ? setLineColor("green") : setLineColor("blue");
		setLineCoords(locations.route.coords);
		setRange(val);
		setRecyclingLocationResults(locations);
		locations ? setLocations(locations.results) : setLocations(undefined);

		map?.panTo([
			parseFloat(address.coordinates.lat),
			parseFloat(address.coordinates.long),
		] as LatLngExpression);
	};

	return (
		<BasePage title="Instructions" description="Singapore's first recycling planner">
			<NonRecyclableModal setPage={setPage} items={items} getItemCategory={getItemCategory} />
			<Box height="calc(100vh - 80px)" position="relative">
				{/* Map Display */}
				<Box
					transition="opacity 0.3s"
					opacity={isLoading ? 0 : 1}
					onClick={() => setFacCardIsOpen(false)}
					position="absolute"
					height="100%"
					width="100%"
					left={0}
					top={0}
					zIndex={0}
				>
					<LeafletMap center={centerPos} zoom={zoom} minZoom={11} maxZoom={18}>
						{/* The color is the background color of the cluster */}
						<Cluster icon={ClusterIcon} color={"#81C784"} chunkedLoading>
							{locations &&
								// ClothingType will be used to show relevant icon
								Object.entries(locations).map(([category, result]) => {
									return result.facilities.map((facility) => {
										return (
											<CustomMarker
												key={facility.id}
												position={facility.latlng as LatLngExpression}
												icon={GeneralIcon}
												color={"#FFFFFF"}
												handleOnClick={() => handleMarkerOnClick(facility)}
												category={category}
												isSelected={
													facCardIsOpen &&
													facCardDetails?.id === facility.id
												}
											/>
										);
									});
								})}
						</Cluster>
						{/* Center Marker */}
						<CustomMarker
							position={centerPos}
							icon={UserIcon}
							color={"#FF0000"}
							handleOnClick={() => setFacCardIsOpen(false)}
						/>
						<CustomPolyline lineCoords={lineCoords} color={lineColor} />
					</LeafletMap>
				</Box>

				<MapHeaderButtons
					setPage={setPage}
					onFilterOpen={onFilterOpen}
					selectedOptions={selectedOptions}
					selectOptions={selectOptions}
					handleMultiselectOnChange={handleMultiselectOnChange}
					itemState={itemState}
					handleChangedLocation={handleChangedLocation}
				/>

				{facCardIsOpen && (
					<FacilityCard
						items={items}
						facCardDetails={facCardDetails}
						facCardDistance={facCardDistance}
					/>
				)}
			</Box>
			<FilterPanel
				isOpen={isFilterOpen}
				filterApply={() => onFilterClose()}
				handleSliderChange={handleSliderChange}
				range={range}
				itemState={itemState}
				selectOptions={selectOptions}
				selectAllItems={selectAllItems}
				handleCheckboxChange={handleCheckboxChange}
			/>
		</BasePage>
	);
};

// Leaflet Map Context Provider to wrap around the Page
export const MapPage = ({ setPage }: Props) => (
	<MapContextProvider>
		<MapInner setPage={setPage} />
	</MapContextProvider>
);

export const MapHeaderButtons = ({
	setPage,
	selectedOptions,
	selectOptions,
	handleMultiselectOnChange,
	itemState,
	handleChangedLocation,
	onFilterOpen,
}: {
	setPage: Dispatch<SetStateAction<Pages>>;
	selectedOptions: OptionType[];
	selectOptions: OptionType[];
	handleMultiselectOnChange: (
		newValue: MultiValue<OptionType>,
		actionMeta: ActionMeta<OptionType>,
	) => void;
	itemState: (TItemSelection | TEmptyItem)[];
	handleChangedLocation: (itemEntry: (TItemSelection | TEmptyItem)[]) => void;
	onFilterOpen: () => void;
}) => {
	return (
		<VStack
			width="100%"
			maxW={{
				base: "full",
				sm: "container.md",
			}}
			spacing={3}
			align="stretch"
			position="absolute"
			left="50%"
			transform="translate(-50%, 0)"
			paddingX={4}
			paddingY={2}
		>
			<Flex gap={4} direction={"row"}>
				<IconButton
					icon={<ArrowBackIcon />}
					onClick={() => setPage(Pages.HOME)}
					bg="teal.600"
					color="white"
					aria-label="Back to home page"
					boxShadow="2px 2px 8px 0px rgba(0, 0, 0, 0.50)"
				/>
				<Location
					containerStyle={{
						boxShadow: "2px 2px 8px 0px rgba(0, 0, 0, 0.50)",
						borderRadius: "6px",
					}}
					showText={false}
					handleBlur={() => handleChangedLocation(itemState)}
				/>
			</Flex>
			<Flex
				w="100%"
				direction={"row"}
				background="white"
				boxShadow="2px 2px 8px 0px rgba(0, 0, 0, 0.50)"
				borderRadius="6px"
				alignItems="center"
			>
				<SelectedItemChips
					selectedOptions={selectedOptions}
					handleMultiselectOnChange={handleMultiselectOnChange}
					selectOptions={selectOptions}
				/>
				<FilterButton onClick={onFilterOpen} height="44px" />
			</Flex>
		</VStack>
	);
};

function SelectedItemChips({
	selectedOptions,
	handleMultiselectOnChange,
	selectOptions,
}: {
	selectedOptions: OptionType[];
	handleMultiselectOnChange: (
		newValue: MultiValue<OptionType>,
		actionMeta: ActionMeta<OptionType>,
	) => void;
	selectOptions: OptionType[];
}) {
	return (
		<Select
			isMulti
			defaultValue={selectedOptions}
			value={selectedOptions}
			onChange={handleMultiselectOnChange}
			options={selectOptions}
			styles={{
				container: (base) => ({
					...base,
					flex: 1,
					border: "none",
					minWidth: 0,
				}),
				control: (base) => ({
					...base,
					border: "none",
					overflow: "auto",
				}),
				input: (base) => ({
					...base,
					border: "none",
				}),
				dropdownIndicator: () => ({
					display: "none",
				}),
				indicatorSeparator: () => ({
					display: "none",
				}),
				valueContainer: (base) => ({
					...base,
					flexWrap: "nowrap",
					overflow: "auto",
					marginRight: 0,
					paddingRight: 0,
				}),
				clearIndicator: () => ({
					display: "none",
				}),
				multiValue: (base) => ({
					...base,
					background: "#E0F0EF",
					borderRadius: "42px",
					minWidth: "fit-content",
					padding: "5px 10px",
				}),
			}}
		/>
	);
}

export default MapPage;
