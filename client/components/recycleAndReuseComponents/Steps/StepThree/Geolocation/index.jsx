import { ArrowForwardIcon, SearchIcon } from "@chakra-ui/icons";
import { Button, useDisclosure } from "@chakra-ui/react";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import AsyncSelect from "react-select/async";
import { selectStylesForColorModes } from "../../../../DarkModeSwitch";
import { InfoBox } from "./InfoBox";
import { InstructionalBox } from "./InstructionalBox";
import { markerHome, markerOthers, markerRecycle } from "./markers";
import { NoOptions } from "./NoOptions";
import { PopupInfo } from "./PopupContentComponent";
import { SearchBar } from "./Searchbar";
import {
	fetchOneMapSuggestions,
	getNearestBlueBin,
	getNearestNonBlueBinFacilities,
} from "./utils";

export default function Geolocation({ userItems }) {
	const { onToggle } = useDisclosure();

	// Initial Position
	const mapCenter = useRef({
		lat: 1.36882713986152,
		lng: 103.950296238717,
	});
	const homeMarker = useRef({
		lat: 1,
		lng: 1,
	});

	// Encode JSON to Base64
	const encode = useRef("");

	// Display address after search bar input
	const inputAddress = useRef("");

	// Markers (non bluebin + bluebin)
	const [nonBlueBinMarkers, setNonBlueBinMarkers] = useState([]);
	const [blueBinMarkers, setBlueBinMarkers] = useState([]);

	// Disable button if no location
	const [disable, setDisable] = useState(true);
	// Pre summary page loader
	const [loader, setLoader] = useState(false);

	// Popup
	const [showPopup, setShowPopup] = useState(false);
	const [popupContent, setPopupContent] = useState("");
	const [displayDirection, setDisplayDirection] = useState(false);

	// Map Stuff
	//////////////////////////////////////
	const updateMarker = (event) => {
		homeMarker.current = event.marker.getLatLng();
	};

	const switchLoader = () => {
		setLoader(true);
	};

	const onChangeHandler = (event) => {
		generateMarkers(
			event.label,
			{ lat: event.lat, lng: event.long },
			event.value,
		);
	};

	const onUseMyLocation = () => {
		const successCallback = (position) => {
			const address = `${position.coords.latitude},${position.coords.longitude}`;
			generateMarkers(address, {
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			});
		};
		const errorCallback = (/* error */) => {
			//handle error
		};

		navigator.geolocation.getCurrentPosition(
			successCallback,
			errorCallback,
			{
				enableHighAccuracy: true,
				timeout: 25000,
			},
		);
	};

	const handleHomeMarkerClick = () => {
		setDisplayDirection(false);
		setPopupContent(inputAddress.current);
		setShowPopup(true);
		onToggle();
	};

	const generateMarkers = (addressLabel, { lat, lng }, postcode) => {
		inputAddress.current = addressLabel;
		mapCenter.current = {
			lat,
			lng,
		};
		homeMarker.current = {
			lat,
			lng,
		};

		const allLocations = [];

		/* SORT OUT BLUE BIN OBJECTS FROM NON BLUE BIN  */
		const nonBlueBinItems = [];
		const blueBinItems = [];

		for (const userItem of userItems) {
			if (userItem.bluebinrecyclable == 0) {
				blueBinItems.push(userItem.description);
			} else {
				nonBlueBinItems.push(userItem);
			}
		}

		/* BLUE BIN MARKERS */
		const nearestBin = getNearestBlueBin(
			blueBinItems,
			{ lat, lng },
			postcode,
		);
		if (nearestBin) {
			setBlueBinMarkers([nearestBin]);
			allLocations.push(nearestBin);
		}

		/* NON-BLUE BIN ITEMS */
		const nonBlueBinFacilities = getNearestNonBlueBinFacilities(
			nonBlueBinItems,
			{ lat, lng },
		);
		if (nonBlueBinFacilities) {
			setNonBlueBinMarkers(nonBlueBinFacilities);
			allLocations.push(...nonBlueBinFacilities);
		}

		const person = {
			latitude: lat,
			longitude: lng,
			isPerson: true,
		};
		allLocations.push(person);

		encode.current = btoa(JSON.stringify(allLocations));
		setDisable(false);
	};

	return (
		<div>
			<div
				style={{
					position: "relative",
				}}
			>
				{/* Multiselect+Buttons */}
				<div
					style={{
						position: "absolute",
						width: "90%",
						height: "auto",
						top: 0,
						zIndex: 10000,
						justifyContent: "center",
						left: { left_proportion: "50%" },
						marginLeft: "5%",
						marginTop: "5%",
					}}
				>
					<AsyncSelect
						value={inputAddress.current}
						isSearchable
						placeholder={"Enter your Location"}
						loadOptions={fetchOneMapSuggestions}
						onChange={onChangeHandler}
						components={{ NoOptions }}
						styles={selectStyles}
					/>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							marginTop: 5,
						}}
					>
						<Button
							onClick={onUseMyLocation}
							marginRight={2}
							colorScheme="teal"
						>
							<SearchIcon />{" "}
							<span style={{ fontSize: "0.9rem" }}>
								Use My Location!{" "}
							</span>
						</Button>
						<Link
							href={{
								pathname: "/summary/[code]",
								query: {
									code: encode.current,
								},
							}}
							as={`/summary/${encode.current}`}
							passHref
						>
							{loader ? (
								<Button
									isLoading
									colorScheme="teal"
									variant="solid"
									loadingText="Loading..."
								></Button>
							) : (
								<Button
									disabled={disable}
									rightIcon={<ArrowForwardIcon />}
									onClick={switchLoader}
									colorScheme="teal"
								>
									<span style={{ fontSize: "0.9rem" }}>
										I&apos;m done!
									</span>
								</Button>
							)}
						</Link>
					</div>
				</div>

				{/* Pop Up Box */}
				{showPopup && (
					<InfoBox
						content={popupContent}
						homeMarker={homeMarker.current}
						displayDirection={displayDirection}
						handleCloseInfoBox={() => setShowPopup(false)}
					/>
				)}
				{/* Center instructional Box */}
				{disable && <InstructionalBox />}

				{/* Map */}
				<div className="map-root">
					<Map
						center={[mapCenter.current.lat, mapCenter.current.lng]}
						zoom={13}
						style={{
							height: "700px",
							flex: 4,
							width: "140%",
							marginLeft: "-20%",
						}}
					>
						<TileLayer
							attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
						<Marker
							draggable={false}
							position={[
								homeMarker.current.lat,
								homeMarker.current.lng,
							]}
							animate={true}
							icon={markerHome}
							onClick={handleHomeMarkerClick}
						/>
						{nonBlueBinMarkers.map((marker, idx) => (
							<Marker
								key={`marker-${idx}`}
								position={[marker.latitude, marker.longitude]}
								icon={markerOthers}
								onClick={() => {
									setPopupContent(
										<PopupInfo.nonBlueBin
											marker={marker}
										/>,
									);
									setDisplayDirection(true);
									setShowPopup(true);
								}}
							/>
						))}
						{blueBinMarkers.map((marker, idx) => (
							<Marker
								key={`marker-${idx}`}
								position={[marker.latitude, marker.longitude]}
								icon={markerRecycle}
								onClick={() => {
									setPopupContent(
										<PopupInfo.blueBin
											marker={marker}
										/>);
									setDisplayDirection(true);
									setShowPopup(true);
								}}
							/>
						))}
						<SearchBar updateMarker={updateMarker} />
					</Map>
					<style jsx>
						{`
							.map-root {
								height: 100%;
							}
							.leaflet-container {
								height: 400px !important;
								width: 80%;
								margin: 0 auto;
							}
						`}
					</style>
				</div>
			</div>
		</div>
	);
}

// Map style
const selectStyles = {
	...selectStylesForColorModes,
	menu: (styles) => ({ ...styles, zIndex: 999 }),
};
