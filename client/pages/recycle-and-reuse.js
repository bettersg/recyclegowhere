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
} from '@chakra-ui/react'
// STEPPER IMPORTS
import { Step, Steps } from 'chakra-ui-steps'

import Additem from '../components/recycleAndReuseComponents/AddItem'
import TakeAction from '../components/recycleAndReuseComponents/TakeAction'
import VerifyItem from '../components/recycleAndReuseComponents/VerifyItem'

import axios from 'axios'
import { useState, useRef } from 'react'
import urlcat from 'urlcat'

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

  return (
    <Center>
      <Box w='50vw'>
        <Flex flexDir='column' width='100%'>
          <Steps activeStep={step} responsive={false} colorScheme='teal' padding='1rem'>
            <Step label='Add Items' icon={AddIcon} key='0'>
              <Additem setNextStep={() => setStep(1)} data={data} setItems={setItems} />
            </Step>
            <Step label='Verify Items' icon={EditIcon} key='1'>
              <VerifyItem items={items} setItems={setItems} navigateToTakeAction={() => setStep(2)} />
            </Step>
            <Step label='Take Action' icon={DeleteIcon} key='2'>
              <TakeAction items={items} />
            </Step>
            <Step label='Completed!' icon={CheckIcon} key='3'>
              <div>Completed</div>
            </Step>
          </Steps> 
        </Flex>     
      </Box>
    </Center>
  );
}

export default RecycleAndReuse
