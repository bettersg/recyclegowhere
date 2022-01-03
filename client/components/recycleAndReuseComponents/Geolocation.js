import React, { Component, useRef, useState, useEffect } from "react";
import {
  Map,
  TileLayer,
  Marker,
  Popup,
  MapControl,
  withLeaflet,
} from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import AsyncSelect from "react-select/async";
import { components } from "react-select";
import { InfoIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import urlcat from "urlcat";
import axios from "axios";
import Link from "next/link";
import { selectStylesForColorModes } from "../DarkModeSwitch"

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
export default function Geolocation({items}) {
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

  // Map style
  const selectStyles = { ...selectStylesForColorModes, menu: (styles) => ({ ...styles, zIndex: 999 }) };

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

  return (
    <div>
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

      {/* ///////////////////// */}
      <Button onClick={navigatorControl}>
        {" "}
        <InfoIcon /> Locate with GPS{" "}
      </Button>
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

      {/* ///////////////////// */}

      <div className="map-root">
        <Map
          center={position}
          zoom={zoom}
          style={{
            height: "500px",
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
          >
            <Popup minWidth={90}>
              <span onClick={toggleDraggable}>
                {draggable ? "Click on this for no reason" : "Nice job!"}
              </span>
            </Popup>
            {/* {console.log(bluebinmarkers)}
            {console.log(markers)} */}
          </Marker>
          {markers.map((marker, idx) => (
            <Marker
              key={`marker-${idx}`}
              position={[marker.latitude, marker.longitude]}
              icon={markerOthers}
            >
              <Popup>
                <span>
                  <strong>{marker.itemname}</strong> <br /> <br />
                  Address:{marker.address} <br /> Postal: {marker.postal} <br />
                </span>
              </Popup>
            </Marker>
          ))}
          {bluebinmarkers.map((marker) => (
            <Marker
              position={[marker.latitude, marker.longitude]}
              icon={markerRecycle}
            >
              <Popup>
                <span>
                  <strong>{marker.itemname}</strong> <br /> <br />
                  Address:{marker.address} <br /> Postal: {marker.postal} <br />
                </span>
              </Popup>
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
  );
}
