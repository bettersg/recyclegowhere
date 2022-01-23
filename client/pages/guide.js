import {
  Box,
  Center,
  Heading,
} from "@chakra-ui/react";
import Image from 'next/image';

import { useState, useRef, useEffect } from "react";

import Head from "../components/head";

function Guide({ data }) {
  // const [items, setItems] = useState([]);
  // const [step, setStep] = useState(0);
  // const [geolocation, setGeolocation] = useState(false);

  return (
    <Center>
      <Head title="Reuse and Recycle" />
      <Box w={["70vw", "60vw", "40wv"]}>
        <Heading mb={4} as="h1" size="2xl" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
          Website/Recycling Guide
        </Heading>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
          <Image
          src="/infographic.jpg"
          alt="Recycling Infographic"
          width={550}
          height={1350}
        /> 
        </div>
          
      </Box>
    </Center>
  );
}

export default Guide;
