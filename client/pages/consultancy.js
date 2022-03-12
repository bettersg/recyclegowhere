import { Text, Box, Center, Heading, Button } from "@chakra-ui/react";
import Image from "next/image";

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
        <Heading
          mb={4}
          as="h1"
          size="2xl"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Business Consultancy
        </Heading>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {" "}
          <Image
            src="/unclesemakau.png"
            alt="Uncle Semakau"
            width={211}
            height={223}
          />
        </div>

        <Text>
          {" "}
          At RecycleGoWhere, we have a database of information on our hands.
        </Text>
        <br />
        <Text>
          We aim to provide our recycling data to help businesses be better
          informed and make decisions that will save their money. You can be a
          part of our sustainable revolution! Sign up in the form below and we
          will get back in 24 hours.{" "}
        </Text>
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {" "}
          <Button colorScheme="green">Fill out our form!</Button>
        </div>
      </Box>
    </Center>
  );
}

export default Guide;
