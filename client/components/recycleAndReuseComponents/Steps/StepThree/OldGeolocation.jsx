/* eslint-disable */
// =============================================================================
// This is the old Geolocation file. It has been replaced with ..., and is only being kept for reference for bugs. To be deleted once bugs are fixed and the new component works
// =============================================================================
import { ArrowForwardIcon, SearchIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Image, useDisclosure } from "@chakra-ui/react";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Map, MapControl, Marker, TileLayer, withLeaflet } from "react-leaflet";
import { components } from "react-select";
import AsyncSelect from "react-select/async";
import oneMapRecyclingBin from "../../../../jsonfiles/One-Map-Recycling-Bin.json";
import physicalChannels from "../../../../jsonfiles/Physical-Channel.json";
import { selectStylesForColorModes } from "../../../DarkModeSwitch";

class SearchBox extends MapControl {
	constructor(props) {
		super(props);
		props.leaflet.map.on("geosearch/showlocation", (e) =>
			props.updateMarker(e),
		);
	}

	createLeafletElement() {
		const searchEl = GeoSearchControl({
			provider: new OpenStreetMapProvider(),
			style: "bar",
			showMarker: true,
			showPopup: false,
			autoClose: true,
			retainZoomLevel: false,
			animateZoom: true,
			keepResult: false,
			searchLabel: "search",
		});
		return searchEl;
	}
}

// Marker Icons
const markerHome = new L.Icon({
	iconUrl: "/homemarker.png",
	iconSize: [45, 45],
});
const markerRecycle = new L.Icon({
	iconUrl: "/recyclingbin.png",
	iconSize: [45, 45],
});
const markerOthers = new L.Icon({
	iconUrl: "/nonrecyclables.png",
	iconSize: [45, 45],
});

///////////////////////////////////////////
// Geolocation Function
export default function Geolocation({ items }) {
	// Initial Position
	const [center, setCenter] = useState({
		lat: 1.36882713986152,
		lng: 103.950296238717,
	});
	const [marker, setMarker] = useState({
		lat: 1,
		lng: 1,
	});

	// Markers (non bluebin + bluebin)
	const [markers, setMarkers] = useState([]);
	const [bluebinmarkers, setBlueBinMarkers] = useState([]);
	const [allLocations, setAllLocations] = useState([]);
	// const [filteredbluebindata, setFilteredBlueBinData] = useState();

	// Map properties
	const [zoom] = useState(13);
	const [draggable, setDraggable] = useState(true);

	// Data from API
	const [data, setData] = useState(null);
	const [bluebindata, setBlueBinData] = useState(null);

	// Display address after search bar input
	const [Address, setAddress] = useState("");

	// Encode JSON to Base64
	const [encode, setEncode] = useState("");

	// Disable button if no location
	const [disable, setDisable] = useState(true);

	// Pre summary page loader
	const [loader, setLoader] = useState(false);

	// Popup
	const [popUp, setPopUp] = useState(false);

	// Popup Content
	const [content, setContent] = useState(false);

	// Map style
	const selectStyles = {
		...selectStylesForColorModes,
		menu: (styles) => ({ ...styles, zIndex: 999 }),
	};

	// Mock list of objects passed in from previous screen
	var mockitems = items;
	// [
	// {
	//   category: "Paper",
	//   description: "Writing paper",
	//   id: 1,
	//   isBlueBinRecyclable: true,
	//   name: "writing paper",
	//   condition: null,
	// },
	// {
	//   category: "ICT equipment",
	//   condition: "Spoilt beyond repair",
	//   description: "Printers",
	//   id: 2,
	//   isBlueBinRecyclable: false,
	//   name: "Printers",
	// },
	// {
	//   category: "ICT_Equipment",
	//   description: "Tablets",
	//   id: 3,
	//   isBlueBinRecyclable: false,
	//   name: "Tablets",
	//   condition: "Spoilt_beyond_repair",
	// },
	// {
	//   category: "Portable_batteries",
	//   description: "Batteries",
	//   id: 4,
	//   isBlueBinRecyclable: false,
	//   name: "Batteries",
	//   condition: "Spoilt_beyond_repair",
	// },
	// ];

	// Fetch data from API and save it in state hooks
	// Blue Bins
	useEffect(() => {
		let ignore = false;

		if (!ignore) setBlueBinData(oneMapRecyclingBin);
		return () => {
			ignore = true;
		};
	}, []);

	// Physical Channels
	useEffect(() => {
		let ignore = false;

		if (!ignore) setData(physicalChannels);
		return () => {
			ignore = true;
		};
	}, []);

	// Function to calculate distance between two points + radian conversion
	function calcCrow(lat1, lon1, lat2, lon2) {
		var R = 6371; // km
		var dLat = toRad(lat2 - lat1);
		var dLon = toRad(lon2 - lon1);
		var lat1 = toRad(lat1);
		var lat2 = toRad(lat2);

		var a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.sin(dLon / 2) *
				Math.sin(dLon / 2) *
				Math.cos(lat1) *
				Math.cos(lat2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		var d = R * c;
		return d;
	}
	function toRad(Value) {
		return (Value * Math.PI) / 180;
	}

	// Not sure about this, followed a tutorial
	var refmarker = useRef(marker);

	// Map Stuff
	//////////////////////////////////////
	const toggleDraggable = () => {
		setDraggable(!draggable);
	};

	const updateMarker = (event) => {
		// const marker = e.marker;
		setMarker(event.marker.getLatLng());
		console.log(event.marker.getLatLng());
	};

	const updatePosition = () => {
		const marker = refmarker;
		if (marker != null) {
			setMarker(marker.current.leafletElement.getLatLng());
		}
		console.log(marker.current.leafletElement.getLatLng());
	};
	//////////////////////////////////////////////////////////////

	// User location saved as a variable
	const position = [center.lat, center.lng];
	const markerPosition = [marker.lat, marker.lng];
	const SearchBar = withLeaflet(SearchBox);

	// Load addresses from the OneMap address database
	const loadOptionsHandler = async (inputText, callback) => {
		const response = await fetch(
			`https://developers.onemap.sg/commonapi/search?searchVal=${inputText}&returnGeom=Y&getAddrDetails=Y&pageNum=1`,
		);
		const json = await response.json();
		callback(
			json.results.map((i) => ({
				label: i.ADDRESS,
				value: i.POSTAL,
				lat: i.LATITUDE,
				long: i.LONGITUDE,
			})),
		);
	};

	// Message displayed when no addresses match your query
	const NoOptionsMessage = (props) => {
		return (
			<components.NoOptionsMessage {...props}>
				<span>Please enter your address to find your location.</span>
			</components.NoOptionsMessage>
		);
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// SEARCH BAR INPUT - THE SEARCH ALGORITHM //
	const onChangeHandler = (event) => {
		console.log(mockitems);
		console.log("User's Address: " + event.label);
		console.log("User's Latitude: " + event.lat);
		console.log("User's Longitude: " + event.long);
		console.log("User's Postal Code: " + event.value);
		console.log("--------------------------------------");
		setAddress(event.label);
		setCenter({ lat: event.lat, lng: event.long });
		setMarker({ lat: event.lat, lng: event.long });

		////////////////////////////////////////////////////////
		// SORT OUT BLUE BIN OBJECTS FROM NON BLUE BIN //
		var nonbluebinobjects = {
			items1: [],
		};
		var bluebinarray = [];
		for (let i = 0; i < mockitems.length; i++) {
			if (mockitems[i].bluebinrecyclable == 0) {
				bluebinarray.push(mockitems[i].description);
			} else {
				nonbluebinobjects.items1.push(mockitems[i]);
			}
		}
		////////////////////////////////////////////////////////
		// BLUE BIN MARKERS //
		allLocations = [];
		bluebinmarkers = [];
		var items2 = [];
		var substring = event.value.toString().substring(0, 2);
		const lowerlimit = Number(substring) * 10000;
		const upperlimit = lowerlimit + 10000;
		console.log(
			"The nearby postalcodes range from " +
				lowerlimit +
				" to " +
				upperlimit +
				".",
		);
		var filteredbluebindata = bluebindata.filter(
			(d) => d.postcode > lowerlimit && d.postcode < upperlimit,
		);
		if (filteredbluebindata[0] == null) {
			console.log("There are no postal codes in the range.");
		} else {
			console.log(
				"There are " +
					filteredbluebindata.length +
					" postal codes in the range.",
			);
		}
		if (bluebinarray.length != 0) {
			// If there is a postal code
			if (event.value != "NIL" && filteredbluebindata[0] != null) {
				console.log("This address has a postal code.");
				for (let bb = 0; bb < filteredbluebindata.length; bb++) {
					var item = {
						postal: filteredbluebindata[bb].postcode,
						distance:
							Math.round(
								calcCrow(
									event.lat,
									event.long,
									filteredbluebindata[bb].latitude,
									filteredbluebindata[bb].longitude,
								) * 100,
							) / 100,
						latitude: filteredbluebindata[bb].latitude,
						longitude: filteredbluebindata[bb].longitude,
						block_number: filteredbluebindata[bb].block_number,
					};
					items2.push(item);
				}
				items2.sort(function (a, b) {
					return a.distance - b.distance;
				});
				// get the blue bin with shortest distance from house
				items2[0].itemname = bluebinarray;
				bluebinmarkers.push(items2[0]);
				allLocations.push(items2[0]);
				setBlueBinMarkers(bluebinmarkers);
				console.log("These are the details for the nearest facility:");
				console.log(items2[0]);
			} else {
				console.log(
					"This address has no postal code attached, OR has no nearby bins.",
				);
				for (let bb = 0; bb < bluebindata.length; bb++) {
					var item = {
						postal: bluebindata[bb].postcode,
						distance:
							Math.round(
								calcCrow(
									event.lat,
									event.long,
									bluebindata[bb].latitude,
									bluebindata[bb].longitude,
								) * 100,
							) / 100,
						latitude: bluebindata[bb].latitude,
						longitude: bluebindata[bb].longitude,
						block_number: bluebindata[bb].block_number,
					};
					items2.push(item);
				}
				items2.sort(function (a, b) {
					return a.distance - b.distance;
				});
				// get the blue bin with shortest distance from house
				items2[0].itemname = bluebinarray;
				bluebinmarkers.push(items2[0]);
				allLocations.push(items2[0]);
				setBlueBinMarkers(bluebinmarkers);
				console.log("These are the details for the nearest facility:");
				console.log(items2[0]);
			}
		} else {
			console.log("There are no blue bin recyclables.");
		}
		console.log("--------------------------------------------");

		////////////////////////////////////////////////////////
		// NON BLUE BIN MARKERS //

		var items3 = [];

		console.log("Number of Physical Channels available: " + data.length);
		// Remove items not in database
		// var itemsThatAreValid = 0;
		// console.log("these are non blue");
		// console.log(nonbluebinobjects.items1.length);
		// for (let l = 0; l < nonbluebinobjects.items1.length; l++) {
		//   for (let i = 0; i < data.length; i++) {
		//     if (
		//       data[i].categories_accepted.includes(
		//         nonbluebinobjects.items1[l].category
		//       ) &&
		//       data[i].type.includes(nonbluebinobjects.items1[l].condition)
		//     ) {
		//       itemsThatAreValid += 1;
		//     } else {
		//       nonbluebinobjects.items1.pop(nonbluebinobjects.items1[l]);
		//     }
		//   }
		// }
		markers = [];
		if (nonbluebinobjects.items1[0]) {
			console.log("You have non-blue bin objects.");
			for (let l = 0; l < nonbluebinobjects.items1.length; l++) {
				for (let i = 0; i < data.length; i++) {
					if (
						data[i].categories_accepted.includes(
							nonbluebinobjects.items1[l].category,
						) &&
						data[i].type.includes(
							nonbluebinobjects.items1[l].condition,
						)
					) {
						console.log(data[i].categories_accepted);
						console.log(data[i].type);
						var item = {
							postal: data[i].postcode,
							distance:
								Math.round(
									calcCrow(
										event.lat,
										event.long,
										data[i].latitude,
										data[i].longitude,
									) * 100,
								) / 100,
							latitude: data[i].latitude,
							longitude: data[i].longitude,
							address: data[i].address,
							channel_name: data[i].channel_name,
							operating_hours: data[i].operating_hours,
							contact: data[i].contact,
							website: data[i].website,
							categories_accepted: data[i].categories_accepted,
							organisation_name: data[i].organisation_name,
							type: data[i].type,
							contact: data[i].contact,
						};
						items3.push(item);
					} else {
						console.log(
							"Error processing this item, it does not match our queries.",
						);
					}
				}
				items3.sort(function (a, b) {
					return a.distance - b.distance;
				});
				for (let i = 0; i < items3.length; i++) {
					console.log(items3[i].distance);
				}
				items3[0].itemname = nonbluebinobjects.items1[l].description;
				console.log(items3[0]);
				markers.push(items3[0]);
				allLocations.push(items3[0]);
				items3 = [];
			}
		} else {
			console.log("There are no non-blue bin objects.");
		}
		console.log("Your non-blue bin objects:");
		console.log(nonbluebinobjects.items1);

		setMarkers(markers);
		const person = {
			latitude: event.lat,
			longitude: event.long,
			isPerson: true,
		};

		allLocations.push(person);
		setAllLocations(allLocations);
		console.log("The nearest facility is:");
		console.log(allLocations);
		setEncode(btoa(JSON.stringify(allLocations)));
		console.log("The code for the summary page is: " + encode);
		console.log("--------------------------------------------");

		setDisable(false);
	};
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// BUTTON CLICK - THE SAME SEARCH ALGORITHM
	const navigatorControl = () => {
		const postalcode = "NIL";
		const successCallback = (position) => {
			setAddress(
				`${position.coords.latitude},${position.coords.longitude}`,
			);
			setCenter({
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			});
			setMarker({
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			});
			console.log("User's Latitude: " + position.coords.latitude);
			console.log("User's Longitude: " + position.coords.longitude);

			///////////////////////////////////
			// SORT OUT BLUE BIN OBJECTS FROM NON BLUE BIN
			var nonbluebinobjects = {
				items: [],
			};
			var bluebinarray = [];
			for (let i = 0; i < mockitems.length; i++) {
				if (mockitems[i].bluebinrecyclable == 0) {
					bluebinarray.push(mockitems[i].description);
				} else {
					nonbluebinobjects.items.push(mockitems[i]);
				}
			}
			console.log(
				"------------------------------------------------------------------",
			);

			/////////////////////////////////
			// BLUE BIN MARKERS
			allLocations = [];
			bluebinmarkers = [];
			var items = [];
			console.log(
				"There are " + bluebindata.length + " blue bins in total.",
			);
			if (bluebinarray.length != 0) {
				for (let bb = 0; bb < bluebindata.length; bb++) {
					var item = {
						postal: bluebindata[bb].postcode,
						distance:
							Math.round(
								calcCrow(
									position.coords.latitude,
									position.coords.longitude,
									bluebindata[bb].latitude,
									bluebindata[bb].longitude,
								) * 100,
							) / 100,
						latitude: bluebindata[bb].latitude,
						longitude: bluebindata[bb].longitude,
						block_number: bluebindata[bb].block_number,
					};
					items.push(item);
				}
				items.sort(function (a, b) {
					return a.distance - b.distance;
				});

				// Get the blue bin with shortest distance from house
				items[0].itemname = bluebinarray;
				bluebinmarkers.push(items[0]);
				allLocations.push(items[0]);
				setBlueBinMarkers(bluebinmarkers);
				console.log("The nearest location is:");
				console.log(items[0]);
			} else {
				bluebinmarkers = [];
				setBlueBinMarkers(bluebinmarkers);
				console.log("There are no blue bin items.");
			}

			console.log(
				"------------------------------------------------------------------",
			);

			////////////////////////////////////////////////
			// NON BLUE BIN MARKERS
			console.log(nonbluebinobjects.items);
			var items = [];
			console.log("Length of unfiltered dataset:" + data.length);

			markers = [];

			var counter = 0;
			for (let l = 0; l < nonbluebinobjects.items.length; l++) {
				for (let i = 0; i < data.length; i++) {
					if (
						data[i].categories_accepted.includes(
							nonbluebinobjects.items[l].category,
						) &&
						data[i].type.includes(
							nonbluebinobjects.items[l].condition,
						)
					) {
						counter = counter + 1;
						var item = {
							postal: data[i].postcode,
							distance:
								Math.round(
									calcCrow(
										position.coords.latitude,
										position.coords.longitude,
										data[i].latitude,
										data[i].longitude,
									) * 100,
								) / 100,
							latitude: data[i].latitude,
							longitude: data[i].longitude,
							address: data[i].address,
							channel_name: data[i].channel_name,
							operating_hours: data[i].operating_hours,
							contact: data[i].contact,
							website: data[i].website,
							categories_accepted: data[i].categories_accepted,
							organisation_name: data[i].organisation_name,
							type: data[i].type,
							contact: data[i].contact,
						};
						items.push(item);
					}
				}
				items.sort(function (a, b) {
					return a.distance - b.distance;
				});
				console.log(
					"There are " +
						counter +
						" facilities that recycle " +
						nonbluebinobjects.items[l].description +
						", which has the condition of " +
						nonbluebinobjects.items[l].condition +
						".",
				);
				items[0].itemname = nonbluebinobjects.items[l].description;
				console.log(items[0]);
				markers.push(items[0]);
				allLocations.push(items[0]);

				items = [];
			}
			const person = {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
				isPerson: true,
			};

			allLocations.push(person);
			setMarkers(markers);
			setAllLocations(allLocations);
			console.log(allLocations);
			setEncode(btoa(JSON.stringify(allLocations)));
			console.log(
				"------------------------------------------------------------------",
			);
			console.log(encode);
			setDisable(false);
		};

		const errorCallback = (error) => {
			console.log(error);
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
	const left_proportion = "50%";
	const enablePopUp = (e) => {
		console.log(e);
		setPopUp(true);

		console.log(popUp);
	};
	const closePopUp = () => {
		setPopUp(false);
	};

	const switchLoader = () => {
		setLoader(true);
	};
	const { isOpen, onToggle } = useDisclosure();

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
						left: { left_proportion },
						marginLeft: "5%",
						marginTop: "5%",
					}}
				>
					<AsyncSelect
						value={Address}
						isSearchable
						placeholder={"Enter your Location"}
						loadOptions={loadOptionsHandler}
						onChange={onChangeHandler}
						components={{ NoOptionsMessage }}
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
							onClick={navigatorControl}
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
									code: encode,
								},
							}}
							as={`/summary/${encode}`}
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

				{popUp && (
					<Box
						className="others-container"
						position="absolute"
						width="130%"
						marginLeft="-15%"
						height="auto"
						zIndex="9999"
						mt={[600, 600, 600, 550]}
						fontSize={["xs", "sm", "sm", "sm"]}
						borderWidth="1px"
						borderRadius="xl"
						bg="#E6FFFA
          "
					>
						<div mt={[1, 4, 6, 8]}>
							<Box flex={1} p={4}>
								<span>{content}</span>
								<br />
								<Button
									onClick={closePopUp}
									colorScheme="teal"
									size="xs"
									mt={1}
								>
									X
								</Button>
							</Box>
						</div>
					</Box>
				)}

				{/* Center instructional Box */}
				{disable && (
					<div
						className="others-container"
						style={{
							position: "absolute",
							width: "80%",
							marginLeft: "10%",

							marginTop: "28%",
							height: "auto",
							zIndex: 998,
						}}
					>
						<Flex
							flexDirection="row"
							bg="white"
							height={{
								base: "150px", // 0-48em
								md: "180px", // 48em-80em,
								xl: "200px", // 80em+
							}}
							mt={[50, 20, 6, 8]}
						>
							<Box
								style={{
									paddingTop: "5%",
									paddingInline: "5%",
									width: "100%",
								}}
								fontSize={{
									base: "12px",
									md: "18px",
									lg: "20px",
								}}
								flexGrow={1}
							>
								Tell Uncle Semakau where you are now. Uncle
								Semakau will help you find where to take action!
							</Box>
							<Box flexGrow={1} h={"100%"} w={"100%"}>
								<Image
									src="/unclesemakau_singlet.png"
									alt="Uncle Semakau in a Singlet"
									ml={["0%", "10%  ", "20%", "30%", "35%"]}
									// w={["100%", "80%", "70%", "55%"]}
									height={"100%"}
								/>
							</Box>
						</Flex>
					</div>
				)}

				{/* Map */}
				<div className="map-root">
					<Map
						center={position}
						zoom={zoom}
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
							onDragend={updatePosition}
							position={markerPosition}
							animate={true}
							ref={refmarker}
							icon={markerHome}
							onClick={() => {
								enablePopUp();
								setContent(Address);
								onToggle();
							}}
						></Marker>
						{markers.map((marker, idx) => (
							<Marker
								key={`marker-${idx}`}
								position={[marker.latitude, marker.longitude]}
								icon={markerOthers}
								onClick={() => {
									enablePopUp();
									setContent(
										<span>
											<strong>{marker.itemname}</strong>{" "}
											<br /> <br />
											<b>{marker.channel_name}</b> by{" "}
											{marker.organisation_name} <br />
											<br />
											<b>Address: </b>
											{marker.address} <br />
											<b>Postal: </b> {marker.postal}{" "}
											<br />
											<b>Operating Hours: </b>{" "}
											{marker.operating_hours} <br />
											<b>Contact: </b> {marker.contact}{" "}
											<br />
											<b>Website: </b>{" "}
											<a href={marker.website}>
												{marker.website}
											</a>{" "}
											<br />
											<b>Categories Accepted: </b>{" "}
											{marker.categories_accepted} <br />
										</span>,
									);
								}}
							>
								{/* <Popup>
                <span>
                  <strong>{marker.itemname}</strong> <br /> <br />
                  <b>{marker.channel_name}</b> by {marker.organisation_name}{" "}
                  <br />
                  <br />
                  <b>Address: </b>
                  {marker.address} <br />
                  <b>Postal: </b> {marker.postal} <br />
                  <b>Operating Hours: </b> {marker.operating_hours} <br />
                  <b>Contact: </b> {marker.contact} <br />
                  <b>Website: </b> <a href={marker.website}>{marker.website}</a>{" "}
                  <br />
                  <b>Categories Accepted: </b> {marker.categories_accepted}{" "}
                  <br />
                </span>
              </Popup> */}
							</Marker>
						))}

						{bluebinmarkers.map((marker, idx) => (
							<Marker
								key={`marker-${idx}`}
								position={[marker.latitude, marker.longitude]}
								icon={markerRecycle}
								onClick={() => {
									enablePopUp();
									setContent(
										<span>
											<strong>Blue Recycling Bin</strong>{" "}
											for{" "}
											<strong>{marker.itemname}</strong>{" "}
											<br /> <br />
											Postal Code: {
												marker.postal
											} <br /> Distance: {marker.distance}{" "}
											km <br />
											{/* Latitude: {marker.latitude} <br /> Longitude:{" "}
                {marker.longitude} <br /> */}
										</span>,
									);
								}}
							>
								{/* <Popup>
                <span>
                  <strong>{marker.itemname}</strong> <br /> <br />
                  Postal Code: {marker.postal} <br /> Distance:{" "}
                  {marker.distance} km <br /> */}
								{/* Latitude: {marker.latitude} <br /> Longitude:{" "}
                  {marker.longitude} <br /> */}
								{/* </span>
              </Popup> */}
							</Marker>
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
