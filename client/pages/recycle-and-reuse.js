import { AddIcon, EditIcon, DeleteIcon, CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Button,
  Heading,
} from '@chakra-ui/react'
// STEPPER IMPORTS
import { Step, Steps } from "chakra-ui-steps";

import AddItem from "../components/recycleAndReuseComponents/AddItem";
import TakeAction from "../components/recycleAndReuseComponents/TakeAction";
import VerifyItem from "../components/recycleAndReuseComponents/VerifyItem";
import Location from "../components/recycleAndReuseComponents/Location";

import axios from "axios";
import { useState, useRef, useEffect } from "react";
import urlcat from "urlcat";

import dynamic from "next/dynamic"
import Head from '../components/head'

import Item from '../jsonfiles/Item.json'
import GeneralWaste from '../jsonfiles/General-Waste.json'

const GeolocationNoSSR = dynamic(
  () => import("../components/recycleAndReuseComponents/Geolocation"),
  {
    loading: () => <p>Map is loading</p>,
    ssr: false,
  }
);

export async function getStaticProps() {
  async function fetchDataFromAPI(url) {
    const response = await fetch(url)

    if (!response.ok) {
      console.error(response)
      return null
    }

    return await response.json()
  }

  let items = Item
  let generalWasteItemDetails = GeneralWaste

  if (items === null) {
    items = []
  }

  if (generalWasteItemDetails === null) {
    generalWasteItemDetails = []
  }

  if (items === null || generalWasteItemDetails === null) {
    items = []
  }

  return {
    props: {
      data: {
        items: items,
        generalWasteItemDetails: generalWasteItemDetails
      }
    }
  }
  
}

function RecycleAndReuse({ data }) {
  const [items, setItems] = useState([])
  const [step, setStep] = useState(0)
  const [geolocation, setGeolocation] = useState(false)
  const [location, setLocation] = useState(false)

  return (
    <Center>
      <Head title="Reuse and Recycle" />
      <Box w={['70vw', '60vw', '40wv']}>
        <Flex flexDir='column' width='100%'>
          <Steps activeStep={step} responsive={false} colorScheme='teal' p={3} size="md">
            <Step label={false && 'Add Items'} icon={AddIcon} key='0'>
              <Heading as="h2" fontSize="xl" textAlign="center">Add Items</Heading>
              <AddItem setNextStep={() => setStep(1)} data={data} setItems={setItems} />
            </Step>
            <Step label={false && 'Verify Items'} icon={EditIcon} key='1'>
              <Heading as="h2" fontSize="xl" textAlign="center">Verify Items</Heading>
              <VerifyItem items={items} setItems={setItems} generalWasteItemDetails={data.generalWasteItemDetails} navigateToTakeAction={() => setStep(2)} />
            </Step>
            <Step label={false && 'Take Action'} icon={DeleteIcon} key='2'>
              <Heading as="h2" fontSize="xl" textAlign="center">Take Action</Heading>
              {
                geolocation 
                  ? <GeolocationNoSSR items={items} />
                    : location
                    ? <Location items={items} setGeolocation={setGeolocation} setLocation={setLocation}/> 
                  : <TakeAction items={items} setGeolocation={setGeolocation} setLocation={setLocation} navigateBackToAddItem={() => setStep(0)}/>
              }
            </Step>
            <Step label={false && 'Completed!'} icon={CheckIcon} key='3'>
              <Heading as="h2" fontSize="xl" textAlign="center">Complete!</Heading>
            </Step>
          </Steps>
        </Flex>
      </Box>
    </Center >
  );
}

export default RecycleAndReuse
