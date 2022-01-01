import React, { useRef, useState, useEffect } from "react";
import {
  MapControl,
  withLeaflet,
} from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import AsyncSelect from "react-select/async";
import { components } from "react-select";
import { InfoIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Text } from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
import "../../node_modules/react-datetime-picker/dist/DateTimePicker.css";
import { FaRegCalendar } from "react-icons/fa";
import Box from "@mui/material/Box";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/accordion";

class SearchBox extends MapControl {
  constructor(props) {
    super(props);
    props.leaflet.map.on("geosearch/showlocation", (e) =>
      props.updateMarker(e)
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
export default function Location({ items }) {
  console.log(items);
  // Initial Position
  const [center, setCenter] = useState({
    lat: 1.36882713986152,
    lng: 103.950296238717,
  });
  const [marker, setMarker] = useState({
    lat: 1.36882713986152,
    lng: 103.950296238717,
  });

  // Markers (non bluebin + bluebin)
  const [markers, setMarkers] = useState([]);
  const [bluebinmarkers, setBlueBinMarkers] = useState([]);
  const [allLocations, setAllLocations] = useState([]);

  const [value, onChange] = useState(new Date());

  // Map properties
  const [zoom, setZoom] = useState(13);
  const [draggable, setDraggable] = useState(true);

  // Data from API
  const [data, setData] = useState(null);
  const [bluebindata, setBlueBinData] = useState(null);

  // Display address after search bar input
  const [Address, setAddress] = useState("");

  // Encode JSON to Base64
  const [encode, setEncode] = useState("");

  const [orgs, setOrgs] = useState([]);

  // Map style
  const selectStyles = { menu: (styles) => ({ ...styles, zIndex: 999 }) };

  // Mock list of objects passed in from previous screen
  var mockitems = [
    {
      category: "Paper",
      description: "Writing paper",
      id: 1,
      isBlueBinRecyclable: true,
      name: "writing paper",
      condition: null,
    },
    {
      category: "ICT_Equipment",
      description: "Printers",
      id: 2,
      isBlueBinRecyclable: false,
      name: "Printers",
      condition: "In_need_of_repair",
    },
    {
      category: "ICT_Equipment",
      description: "Tablets",
      id: 3,
      isBlueBinRecyclable: false,
      name: "Tablets",
      condition: "Spoilt_beyond_repair",
    },
    {
      category: "Portable_batteries",
      description: "Batteries",
      id: 4,
      isBlueBinRecyclable: false,
      name: "Batteries",
      condition: "Spoilt_beyond_repair",
    },
  ];

  // Fetch data from API and save it in state hooks
  useEffect(() => {
    fetch("https://api.npoint.io/cea2b5b4f3cfe386db9d")
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        setBlueBinData(result);
        // console.log(data);
      });
  }, [bluebindata]);

  useEffect(() => {
    fetch("https://api.npoint.io/1c924ccf40788facdfee")
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        setData(result);
        // console.log(data);
      });
  }, [data]);


  // Function to calculate distance between two points + radian conversion
  function calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
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
      `https://developers.onemap.sg/commonapi/search?searchVal=${inputText}&returnGeom=Y&getAddrDetails=Y&pageNum=1`
    );
    const json = await response.json();
    callback(
      json.results.map((i) => ({
        label: i.ADDRESS,
        value: i.POSTAL,
        lat: i.LATITUDE,
        long: i.LONGITUDE,
      }))
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

  // SEARCH BAR INPUT - THE SEARCH ALGORITHM
  const onChangeHandler = (event) => {
    console.log(event.label);
    console.log(event.lat);
    console.log(event.long);
    console.log(event.value);
    setAddress(event.label);
    setCenter({ lat: event.lat, lng: event.long });
    setMarker({ lat: event.lat, lng: event.long });

    // SORT OUT BLUE BIN OBJECTS FROM NON BLUE BIN
    var nonbluebinobjects = {
      items: [],
    };
    var bluebinarray = [];
    for (let i = 0; i < mockitems.length; i++) {
      if (mockitems[i].isBlueBinRecyclable) {
        bluebinarray.push(mockitems[i].description);
      } else {
        nonbluebinobjects.items.push(mockitems[i]);
      }
    }

    // BLUE BIN MARKERS
    allLocations = [];
    bluebinmarkers = [];
    var items = [];
    var substring = event.value.toString().substring(0, 2);
    if (bluebinarray.length != 0) {
      if (event.value != "NIL") {
        console.log("Blue bin items detected. Displaying recycling bins.");
        console.log("first two integers of postal:" + substring);
        const filteredbluebindata = bluebindata.bluebins.filter((d) =>
          d.postal.toString().includes(substring)
        );
        for (let bb = 0; bb < filteredbluebindata.length; bb++) {
          var item = {
            postal: filteredbluebindata[bb].postal,
            distance: calcCrow(
              event.lat,
              event.long,
              filteredbluebindata[bb].latitude,
              filteredbluebindata[bb].longitude
            ),
            latitude: filteredbluebindata[bb].latitude,
            longitude: filteredbluebindata[bb].longitude,
            address: filteredbluebindata[bb].address,
          };
          items.push(item);
        }
        items.sort(function (a, b) {
          return a.distance - b.distance;
        });
        for (let i = 0; i < items.length; i++) {
          console.log(items[i].distance);
        }
        // get the blue bin with shortest distance from house
        items[0].itemname = bluebinarray;
        bluebinmarkers.push(items[0]);
        allLocations.push(items[0]);
        setBlueBinMarkers(bluebinmarkers);
      } else {
        for (let bb = 0; bb < bluebindata.bluebins.length; bb++) {
          var item = {
            postal: bluebindata.bluebins[bb].postal,
            distance: calcCrow(
              event.lat,
              event.long,
              bluebindata.bluebins[bb].latitude,
              bluebindata.bluebins[bb].longitude
            ),
            latitude: bluebindata.bluebins[bb].latitude,
            longitude: bluebindata.bluebins[bb].longitude,
            address: bluebindata.bluebins[bb].address,
          };
          items.push(item);
        }
        items.sort(function (a, b) {
          return a.distance - b.distance;
        });
        for (let i = 0; i < items.length; i++) {
          console.log(items[i].distance);
        }
        // get the blue bin with shortest distance from house
        items[0].itemname = bluebinarray;
        bluebinmarkers.push(items[0]);
        allLocations.push(items[0]);
        setBlueBinMarkers(bluebinmarkers);
      }
    }
    console.log(nonbluebinobjects.items);
    // NON BLUE BIN MARKERS
    var data1 = {
      sections: [
        {
          items: [],
        },
      ],
    };
    var items = data1.sections[0].items;
    console.log(
      "Length of unfiltered dataset:" + data.physical_channels.length
    );
    console.log(nonbluebinobjects.items.length);

    markers = [];

    for (let l = 0; l < nonbluebinobjects.items.length; l++) {
      for (let i = 0; i < data.physical_channels.length; i++) {
        if (
          data.physical_channels[i].Items_accepted.includes(
            nonbluebinobjects.items[l].category
          ) &&
          data.physical_channels[i].Type.includes(
            nonbluebinobjects.items[l].condition
          )
        ) {
          var item = {
            postal: data.physical_channels[i].postal,
            distance: calcCrow(
              event.lat,
              event.long,
              data.physical_channels[i].latitude,
              data.physical_channels[i].longitude
            ),
            latitude: data.physical_channels[i].latitude,
            longitude: data.physical_channels[i].longitude,
            address: data.physical_channels[i].address,
          };
          items.push(item);
        }
      }
      items.sort(function (a, b) {
        return a.distance - b.distance;
      });
      for (let i = 0; i < items.length; i++) {
        console.log(items[i].distance);
      }
      items[0].itemname = nonbluebinobjects.items[l].description;
      console.log(items[0]);
      markers.push(items[0]);
      allLocations.push(items[0]);
      items = [];
    }
    setMarkers(markers);
    setAllLocations(allLocations);
    console.log(allLocations);
    setEncode(btoa(JSON.stringify(allLocations)));
    console.log(encode);
  };

  // BUTTON CLICK - THE SAME SEARCH ALGORITHM
  const navigatorControl = () => {
    const postalcode = "NIL";
    const successCallback = (position) => {
      setAddress(`${position.coords.latitude},${position.coords.longitude}`);
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      setMarker({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      var nonbluebinobjects = {
        items: [],
      };
      var bluebinarray = [];
      for (let i = 0; i < mockitems.length; i++) {
        if (mockitems[i].isBlueBinRecyclable) {
          bluebinarray.push(mockitems[i].description);
        } else {
          nonbluebinobjects.items.push(mockitems[i]);
        }
      }
      if (bluebinarray.length != 0) {
        console.log("Blue bin items detected. Displaying recycling bins.");
      }

      console.log(nonbluebinobjects.items);

      //////////////////
      // SORT OUT BLUE BIN OBJECTS FROM NON BLUE BIN
      var nonbluebinobjects = {
        items: [],
      };
      var bluebinarray = [];
      for (let i = 0; i < mockitems.length; i++) {
        if (mockitems[i].isBlueBinRecyclable) {
          bluebinarray.push(mockitems[i].description);
        } else {
          nonbluebinobjects.items.push(mockitems[i]);
        }
      }

      // BLUE BIN MARKERS
      allLocations = [];
      bluebinmarkers = [];
      var items = [];
      if (bluebinarray.length != 0) {
        for (let bb = 0; bb < bluebindata.bluebins.length; bb++) {
          var item = {
            postal: bluebindata.bluebins[bb].postal,
            distance: calcCrow(
              position.coords.latitude,
              position.coords.longitude,
              bluebindata.bluebins[bb].latitude,
              bluebindata.bluebins[bb].longitude
            ),
            latitude: bluebindata.bluebins[bb].latitude,
            longitude: bluebindata.bluebins[bb].longitude,
            address: bluebindata.bluebins[bb].address,
          };
          items.push(item);
        }
        items.sort(function (a, b) {
          return a.distance - b.distance;
        });
        for (let i = 0; i < items.length; i++) {
          console.log(items[i].distance);
        }
        // get the blue bin with shortest distance from house
        items[0].itemname = bluebinarray;
        bluebinmarkers.push(items[0]);
        allLocations.push(items[0]);
        setBlueBinMarkers(bluebinmarkers);
      }
      console.log(nonbluebinobjects.items);
      // NON BLUE BIN MARKERS
      var data1 = {
        sections: [
          {
            items: [],
          },
        ],
      };
      var items = data1.sections[0].items;
      console.log(
        "Length of unfiltered dataset:" + data.physical_channels.length
      );
      console.log(nonbluebinobjects.items.length);

      markers = [];

      for (let l = 0; l < nonbluebinobjects.items.length; l++) {
        for (let i = 0; i < data.physical_channels.length; i++) {
          if (
            data.physical_channels[i].Items_accepted.includes(
              nonbluebinobjects.items[l].category
            ) &&
            data.physical_channels[i].Type.includes(
              nonbluebinobjects.items[l].condition
            )
          ) {
            var item = {
              postal: data.physical_channels[i].postal,
              distance: calcCrow(
                position.coords.latitude,
                position.coords.longitude,
                data.physical_channels[i].latitude,
                data.physical_channels[i].longitude
              ),
              latitude: data.physical_channels[i].latitude,
              longitude: data.physical_channels[i].longitude,
              address: data.physical_channels[i].address,
            };
            items.push(item);
          }
        }
        items.sort(function (a, b) {
          return a.distance - b.distance;
        });
        for (let i = 0; i < items.length; i++) {
          console.log(items[i].distance);
        }
        items[0].itemname = nonbluebinobjects.items[l].description;
        console.log(items[0]);
        markers.push(items[0]);
        allLocations.push(items[0]);
        items = [];
      }
      setMarkers(markers);
      setAllLocations(allLocations);
      console.log(allLocations);
      setEncode(btoa(JSON.stringify(allLocations)));
      console.log(encode);
    };

    const errorCallback = (error) => {
      console.log(error);
    };
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
      enableHighAccuracy: true,
      timeout: 25000,
    });
  };

  const fetchOrgs = async () => {
    const { data } = await axios.get(
      "https://api.npoint.io/669bd0f24dae3a92e427"
    );
    const orgs = data;
    setOrgs(orgs);
  };
  // edit api link: https://www.npoint.io/docs/669bd0f24dae3a92e427

  useEffect(() => {
    fetchOrgs();
  }, []);

  return (
    <div>
      <div style={{ marginTop: 15, marginBottom: 5, color: "#19a3ad" }}>
        <Text fontWeight="bold" fontSize="20">
          Collection Location
        </Text>
      </div>
      <AsyncSelect
        value={Address}
        isSearchable
        placeholder={"Input address..."}
        loadOptions={loadOptionsHandler}
        onChange={onChangeHandler}
        components={{ NoOptionsMessage }}
        styles={selectStyles}
      />
      <p>{Address}</p>

      <div style={{ marginTop: 10 }}>
        <Button onClick={navigatorControl} style={{ marginRight: 10 }}>
          {" "}
          <InfoIcon />
          <Text style={{ marginLeft: 10 }}>Locate with GPS </Text>
        </Button>
      </div>

      <div style={{ marginTop: 30, marginBottom: 5, color: "#19a3ad" }}>
        <Text fontWeight="bold" fontSize="20">
          Collection Date and Time
        </Text>
      </div>
      <div style={{ marginBottom: 160 }}>
        <DateTimePicker
          onChange={onChange}
          value={value}
          disableClock
          calendarIcon={<FaRegCalendar />}
          clearIcon={null}
          calendarClassName="Calendar"
        />
      </div>
      <div style={{ textAlign: "center" }}>
        <Link
          href={{
            pathname: "/summary/[code]",
            query: {
              code: encode,
            },
          }}
          as={`/summary/${encode}`}
        >
          <Button rightIcon={<ArrowForwardIcon />}>I'm done!</Button>
        </Link>
      </div>

      <div style={{ marginTop: 50, marginBottom: 10 }}>
        <Text fontWeight="bold" fontSize="20">
          Contact these organisations for more info
        </Text>
      </div>

      <div>
        {orgs.map((org) => (
          <Accordion defaultIndex={[0]} allowMultiple>
            <AccordionItem key={org.id}>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left" style={{ fontWeight: "bold", fontSize: 18 }}>
                    {org.name}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={2}><b>Website: </b><a style={{color: "#14828A"}} href={org.url}>{org.url}</a></AccordionPanel>
              <AccordionPanel pb={2}><b>Price: </b>{org.price}</AccordionPanel>
              <AccordionPanel pb={4}><b>Minimum weight: </b>{org.minimum_weight}</AccordionPanel>
            </AccordionItem>
          </Accordion>
        ))}
        
      </div>
    </div>
  );
}
