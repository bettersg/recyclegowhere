import { AddIcon, EditIcon, DeleteIcon, CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
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

function RecycleAndReuse({ data }) {

  const [items, setItems] = useState([])
  const [step, setStep] = useState(0)
  const [geolocation, setGeolocation] = useState(false)
  const [location, setLocation] = useState(false)

  const stepLabels = [
    { label: "Step 1", description: "Add Items"},
    { label: "Step 2", description: "Verify Items"},
    { label: "Step 3", description: "Take Action"},
    { label: "Step 4", description: "Complete"},]

  return (
    <Center>
      <Head title="Reuse and Recycle" />
      <Box w={['70vw', '60vw', '40wv']}>
        <Flex 
          flexDir='column' 
          width='100%'>

          <Steps 
            activeStep={step} 
            responsive={false}
            labelOrientation="vertical"
            colorScheme='teal' 
            p={3} 
            size="md">

            {/* Add items to the recycling list */}
            <Step 
              label={stepLabels[0].label} 
              icon={AddIcon}
              description={stepLabels[0].description}
              key='0'>
              {/* <Heading 
                as="h2" 
                fontSize="xl" 
                textAlign="center">
                  Add Items
              </Heading> */}
              <AddItem 
                setNextStep={() => setStep(1)} 
                data={data} 
                setItems={setItems} />
            </Step>

            {/* Verify that the items are empty, rinsed or dried  */}
            <Step 
              label={stepLabels[1].label} 
              icon={EditIcon} 
              description={stepLabels[1].description}
              key='1'>
              {/* <Heading 
                as="h2" 
                fontSize="xl" 
                textAlign="center">
                Verify Items
              </Heading> */}
              <VerifyItem 
                items={items} 
                setItems={setItems} 
                generalWasteItemDetails={data.generalWasteItemDetails} 
                navigateToTakeAction={() => setStep(2)} 
              />
            </Step>

            {/* Decide what action to take: either house pickup or self-disposal */}
            <Step 
              label={stepLabels[2].label} 
              icon={DeleteIcon}
              description={stepLabels[2].description}
              key='2'>
              {/* <Heading 
                as="h2" 
                fontSize="xl" 
                textAlign="center">
                Take Action
              </Heading> */}
              {
                geolocation 
                  ? <GeolocationNoSSR items={items} />
                    : location
                    ? <Location 
                        items={items} 
                        setGeolocation={setGeolocation} 
                        setLocation={setLocation}
                      /> 
                    : <TakeAction 
                        items={items} 
                        setGeolocation={setGeolocation} 
                        setLocation={setLocation} 
                        navigateBackToAddItem={() => setStep(0)}
                      />
              }
            </Step>

            {/* Final Confirmation and Summary List*/}
            <Step 
              label={stepLabels[3].label} 
              icon={CheckIcon}
              description={stepLabels[3].description}
              key='3'>
            </Step>
          </Steps>
        </Flex>
      </Box>
    </Center >
  );
}


export async function getStaticProps() {

  async function fetchDataFromAPI(url) {
    const response = await fetch(url)

    if (!response.ok) {
      console.error(response)
      return null
    }

    return await response.json()
  }

  let items = Item || [] 
  let generalWasteItemDetails = GeneralWaste || []

  return {
    props: {
      data: {
        items: items,
        generalWasteItemDetails: generalWasteItemDetails
      }
    }
  }
  
}

export default RecycleAndReuse
