import { BasePage } from "layouts/BasePage";
import { Container, Flex, VStack, IconButton, Box } from "@chakra-ui/react";
import { HeaderButtons } from "components/map";
import { Dispatch, SetStateAction, useState, MouseEventHandler } from "react";
import { Pages } from "spa-pages/pageEnums";
import { Location } from "components/home/UserInput/Location";
import { COLORS } from "theme";
import { HamburgerIcon } from "@chakra-ui/icons";
import MapIcon from "components/map/Marker/MapIcon";

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
	// const [isTouched, setIsTouched] = useState(false);
	const { map } = useMapContext();
	const leafletWindow = useLeafletWindow();

	const isLoading = !map || !leafletWindow;
	const centerPos = [1.376690088473865, 103.7993060574394] as LatLngExpression;
	const zoom = 13;

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
					<Box overflow="hidden" width="100%" height="100vh">
						<Box
							left={0}
							transition="opacity 0.3s"
							opacity={isLoading ? 0 : 1}
							top={80}
							width={viewportWidth ?? "100%"}
							height={viewportHeight ? viewportHeight - 80 : "100%"}
						>
							<LeafletMap center={centerPos} zoom={zoom} minZoom={11} maxZoom={18}>
								{/* Test markers and cluster */}
								<Cluster icon={MapIcon} color={"#81C784"} chunkedLoading>
									<CustomMarker
										position={centerPos}
										icon={MapIcon}
										color={"#81C784"}
									/>
									<CustomMarker
										position={[1.38, 103.7993060574394] as LatLngExpression}
										icon={MapIcon}
										color={"#81C784"}
									/>
									<CustomMarker
										position={[1.37, 103.7993060574394] as LatLngExpression}
										icon={MapIcon}
										color={"#81C784"}
									/>
								</Cluster>
							</LeafletMap>
						</Box>
					</Box>
				</VStack>
			</Container>
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
