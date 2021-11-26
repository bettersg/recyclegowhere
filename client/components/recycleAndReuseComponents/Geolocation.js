import React from "react";
import { useState } from 'react';
import AsyncSelect from 'react-select/async';
import { components } from 'react-select'
import { locations } from '../../../mockData/data';

import {
  Input,
  Flex,
  Text,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import Image from "next/image";
import { Search2Icon } from "@chakra-ui/icons";

const Geolocation = () => {
    const [Address, setAddress] = useState("");

    // const onChangeHandler = (event) => {
    //     setAddress(event);
    //     console.log(Address);
    // }

    const loadOptionsHandler = async (inputText, callback) =>{
        const response = await fetch(`https://developers.onemap.sg/commonapi/search?searchVal=${inputText}&returnGeom=Y&getAddrDetails=Y&pageNum=1`)
        const json = await response.json();
        callback(json.results.map(i => ({
            label: i.ADDRESS,
            value: i.POSTAL
        })));
    }

    const onChangeHandler = (event) =>{
        console.log(event.label);
        setAddress(event.label);
        
    }

    const NoOptionsMessage = props => {
      return (
        <components.NoOptionsMessage {...props}>
          <span>Please enter your address to find your location.</span> 
        </components.NoOptionsMessage>
      );
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
      />
      <p>{Address}</p>
    </div>
  );
};

export default Geolocation;

