import React, { useRef, useState, useEffect } from "react";
import { Button, Text, Box, Flex } from "@chakra-ui/react";
import axios from "axios";
import AsyncSelect from "react-select/async";
import { components } from "react-select";
import Image from "next/image";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/accordion";

import callForCollection from "../../jsonfiles/Call-For-Collection.json";
import { selectStylesForColorModes } from "../DarkModeSwitch";

export default function Location({ items, setGeolocation, setLocation }) {
  const [orgs, setOrgs] = useState([]);
  const [confirmedAddress, setConfirmedAddress] = useState(false);
  const [Address, setAddress] = useState("");
  const fetchOrgs = async () => {
    // const { data } = await axios.get(
    //   "https://api.npoint.io/669bd0f24dae3a92e427"
    // );

    const orgs = callForCollection;
    setOrgs(orgs);
  };
  // edit api link: https://www.npoint.io/docs/669bd0f24dae3a92e427

  useEffect(() => {
    fetchOrgs();
  }, []);

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
  const selectStyles = {
    ...selectStylesForColorModes,
    menu: (styles) => ({ ...styles, zIndex: 999 }),
  };
  // Message displayed when no addresses match your query
  const NoOptionsMessage = (props) => {
    return (
      <components.NoOptionsMessage {...props}>
        <span>Please enter your address to find your location.</span>
      </components.NoOptionsMessage>
    );
  };
  const onChangeHandler = (event) => {
    setAddress(event.label);
    setConfirmedAddress(true);
  };
  return (
    <div>
      {confirmedAddress ? (
        <div>
          <Flex mt="4">
            <Box pr='20'>
              <div style={{ marginTop: 50, marginBottom: 10 }}>
                Your location is <br />
                <strong>{Address}. </strong>{" "}
                
              </div>
              <div>
                Your items are:
                {items.map((item) => (
                  <b>
                    <p key={item.id}>
                      {item.description}
                      <br />
                    </p>
                  </b>
                ))}
              </div>
              <Button
                  onClick={() => {
                    setGeolocation(true);
                    setLocation(false);
                  }}
                >
                  Dispose Items Yourself Instead
                </Button>
            </Box>
            <Image
              src="/heatmap.jpg"
              alt="Uncle Semakau"
              width={370}
              height={223}
            />
            
          </Flex>

          <div>
            
          </div>
          <div style={{ marginTop: 10, marginBottom: 10 }}>
            <Text fontWeight="bold" fontSize="20">
              Contact these organisations for doorstep collections:
            </Text>
          </div>

          <br />
          <div>
            {orgs.map((org) => (
              <Accordion defaultIndex={[0]} allowMultiple>
                <AccordionItem key={org.id}>
                  <h2>
                    <AccordionButton>
                      <Box
                        flex="1"
                        textAlign="left"
                        style={{ fontWeight: "bold", fontSize: 18 }}
                      >
                        {org.name}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={2}>
                    <b>Website: </b>
                    <a target="_blank" style={{ color: "#14828A" }} href={org.website}>
                      {org.website}
                    </a>
                  </AccordionPanel>
                  <AccordionPanel pb={2}>
                    <b>Price: </b>
                    {org.pricing_terms}
                  </AccordionPanel>
                  <AccordionPanel pb={4}>
                    <b>Minimum weight: </b>
                    {org.minimum_weight}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div>Enter your home address:</div>
          <AsyncSelect
            value={Address}
            isSearchable
            placeholder={"Input address..."}
            loadOptions={loadOptionsHandler}
            onChange={onChangeHandler}
            components={{ NoOptionsMessage }}
            styles={selectStyles}
          />
        </div>
      )}
    </div>
  );
}
