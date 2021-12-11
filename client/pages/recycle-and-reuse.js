import { AddIcon, EditIcon, DeleteIcon, CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  Center,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Button,
} from "@chakra-ui/react";
import AddItems from "../components/recycleAndReuseComponents/AddItem";
import VerifyItems from "../components/recycleAndReuseComponents/VerifyItems";
import Geolocation from "../components/recycleAndReuseComponents/Geolocation";
import axios from "axios";
import React, { useState, useContext } from "react";
import urlcat from "urlcat";
import { options } from "../../mockData/data";
// STEPPER IMPORTS
import { Step, Steps, useSteps } from 'chakra-ui-steps';
// CONTEXT
import FormContext from "../context/context";
import next from "next";

// // TODO: Need to actually fetch the data from the real server
const hasNoItems = (items) => items?.input?.length === 0;

export async function getStaticProps() {
  //   const url = urlcat(process.env.SERVER_URL, "/api/items");
  const url = urlcat("https://api.npoint.io", "a8416aa207861acb363d");
  try {
    const data = await axios.get(url);
    return {
      props: {
        options: data.data,
      },
    };
  } catch (error) {
    return {
      props: {
        options,
      },
    };
  }
}


const steps = [
  { id: 0, label: "Add Items" },
  { id: 1, label: "Verify Items" },
  { id: 2, label: "Take Action" },
  { id: 3, label: "Complete!" }
]

function RecycleAndReuse({ options, pageProps }) {
  const [selectedItems, setSelectedItems] = useState();
  // const [items, setItems] = useState({ input: [] });

  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  })

  return (
    <FormContext.Provider value={{ selectedItems, setSelectedItems }}>
      <Center {...pageProps}>
        <Box w="40vw">
          <Flex flexDir="column" width="100%">
            <Steps activeStep={activeStep} responsive={false} colorScheme="teal">
              <Step label="Add Items" icon={AddIcon} key="0">
                <AddItems />
              </Step>
              <Step label="Verify Items" icon={EditIcon} key="1">
                <VerifyItems />
              </Step>
              <Step label="Take Action" icon={DeleteIcon} key="2">
                <div>Take action</div>
              </Step>
              <Step label="Completed!" icon={CheckIcon} key="3">
                <div>Completed</div>
              </Step>
            </Steps>
            {activeStep === 4 ? (
              <Center p={4} flexDir="column">
                <Heading fontSize="xl">Woohoo! All steps completed!</Heading>
                <Button mt={6} size="sm" onClick={reset}>
                  Reset
                </Button>
              </Center>
            ) : (
              <Flex width="100%" justify="center">
                <Button
                  mr={4}
                  size="sm"
                  variant="ghost"
                  onClick={prevStep}
                  isDisabled={activeStep === 0}
                >
                  Prev
                </Button>
                <Button size="sm" onClick={nextStep}>
                  {activeStep === steps.length - 1 ? "Finish" : "Confirm"}
                </Button>
              </Flex>
            )}
          </Flex>

        </Box>
      </Center>
    </FormContext.Provider>

  );
}

export default RecycleAndReuse;
