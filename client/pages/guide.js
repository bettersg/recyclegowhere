import {
  Box,
  Center,
  Heading,
  Flex
} from "@chakra-ui/react";
import Image from 'next/image';

import { useState, useRef, useEffect } from "react";

import Head from "../components/head";

function Guide({ data }) {
  // const [items, setItems] = useState([]);
  // const [step, setStep] = useState(0);
  // const [geolocation, setGeolocation] = useState(false);

  return (<div>
    <Heading mb={4} as="h1" size="2xl" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
          About Us / App Guide
        </Heading>
    <Center>
      <Head title="Reuse and Recycle" />
    
      <Box pr={25} mb={20}>
        We are Team RecycleGoWhere, a subsidiary project under Better.sg.
        <br/>
        <br/>
        We created this little tool over the past months because we saw a problem. Youth adults have a low rate of recycling, because they lack knowledge of recycling and it is inconvenient to find recycling points beyond the blue bin. Our project aims to improve recycling rates by providing a one-stop search point for Recycling Beginners to gather information on recycling right, as well as recycling points.
        <br/>
        <br/>
        Singapore has only 1 landfill, Pulau Semakau, which will fill up by 2035. If we do not recycle regularly and correctly, we cannot ensure the longevity of the landfill, and we will have to create new landfills, which causes environmental destruction and requires land space that Singapore does not possess.
        <br/>
        <br/>

      </Box>
      <Box w={["60vw", "60vw", "30wv"]}>
        
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
    </div>
  );
}

export default Guide;
