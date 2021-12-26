import { AddIcon, EditIcon, DeleteIcon, CheckIcon } from '@chakra-ui/icons'
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
import { Step, Steps } from 'chakra-ui-steps'

import Additem from '../components/recycleAndReuseComponents/AddItem'
import TakeAction from '../components/recycleAndReuseComponents/TakeAction'
import VerifyItem from '../components/recycleAndReuseComponents/VerifyItem'

import axios from 'axios'
import { useState, useRef } from 'react'
import urlcat from 'urlcat'

import dynamic from "next/dynamic"
import Head from '../components/head'

const GeolocationNoSSR = dynamic(
  () => import("../components/recycleAndReuseComponents/Geolocation"),
  {
    loading: () => <p>Map is loading</p>,
    ssr: false,
  }
);

// TODO: Need to actually fetch the data from the real server
export async function getStaticProps() {
  //   const url = urlcat(process.env.SERVER_URL, "/api/items");
  const url = urlcat("https://api.npoint.io", "324727202a8ce24af12f");
  try {
    const data = await axios.get(url);
    return {
      props: {
        data: data.data,
      },
    };
  } catch (error) {
    // TODO: handle error in a better way
    console.error(error)
  }
}





function RecycleAndReuse({ data }) {
  const [items, setItems] = useState([])
  const [step, setStep] = useState(0)
  const [geolocation, setGeolocation] = useState(false)

  return (
    <Center>
      <Head title="Reuse and Recycle" />
      <Box w={['70vw', '60vw', '40wv']}>
        <Flex flexDir='column' width='100%'>
          <Steps activeStep={step} responsive={false} colorScheme='teal' p={3} size="md">
            <Step label={false && 'Add Items'} icon={AddIcon} key='0'>
              <Heading as="h2" fontSize="xl" textAlign="center">Add Items</Heading>
              <Additem setNextStep={() => setStep(1)} data={data} setItems={setItems} />
            </Step>
            <Step label={false && 'Verify Items'} icon={EditIcon} key='1'>
              <Heading as="h2" fontSize="xl" textAlign="center">Verify Items</Heading>
              <VerifyItem items={items} setItems={setItems} navigateToTakeAction={() => setStep(2)} />
            </Step>
            <Step label={false && 'Take Action'} icon={DeleteIcon} key='2'>
              <Heading as="h2" fontSize="xl" textAlign="center">Take Action</Heading>
              {
                geolocation ? <GeolocationNoSSR items={items} />
                  : <TakeAction items={items} setGeolocation={setGeolocation} />
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
