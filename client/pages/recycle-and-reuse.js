import { AddIcon, DeleteIcon, InfoOutlineIcon } from "@chakra-ui/icons";
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
import Additem from "../components/recycleAndReuseComponents/AddItem";
import MultiSelect from "../components/recycleAndReuseComponents/MultiSelect";
import Geolocation from "../components/recycleAndReuseComponents/Geolocation";
import axios from "axios";
import { useState } from "react";
import urlcat from "urlcat";
import { options } from "../../mockData/data";
// STEPPER IMPORTS
import { Step, Steps, useSteps } from 'chakra-ui-steps';

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

// const content = (
//   <Flex py={4}>
//     <Box p={1} />
//   </Flex>
// );

const steps = [{ label: "Step 1" }, { label: "Step 2" }, { label: "Step 3" }]

function RecycleAndReuse({ options }) {
  const [items, setItems] = useState({ input: [] });

  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  })

  return (
    <Center>
      <Box w="40vw">
        {/* isLazy prop used to defer rendering each tab until that tab is selected */}
        <Tabs
          w="40vw"
          colorScheme="teal"
          // variant="enclosed-colored"
          id="tabs-3--tab--1"
          isLazy
        >
          <TabList>
            <Tab>
              <AddIcon />
              Add Item
            </Tab>
            <Tab isDisabled={hasNoItems(items)}>
              <InfoOutlineIcon />
              Item List
            </Tab>
            <Tab isDisabled={hasNoItems(items)}>
              <DeleteIcon />
              Dispose Items
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Additem />
              <MultiSelect options={options} setInput={setItems} />
            </TabPanel>
            <TabPanel>
              <p>Item List goes here!</p>
            </TabPanel>
            <TabPanel>
              <Geolocation />
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Box>
          <Flex flexDir="column" width="100%">
            <Steps activeStep={activeStep}>
              {steps.map(({ label }, index) => (
                <Step label={label} key={label}>
                  <Box index={index}>
                    This is box {index}
                  </Box>
                </Step>
              ))}
            </Steps>
            {activeStep === 3 ? (
              <Center p={4} flexDir="column">
                <Heading fontSize="xl">Woohoo! All steps completed!</Heading>
                <Button mt={6} size="sm" onClick={reset}>
                  Reset
                </Button>
              </Center>
            ) : (
              <Flex width="100%" justify="flex-end">
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
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Flex>
            )}
          </Flex>
        </Box>
      </Box>
    </Center>
  );
}

export default RecycleAndReuse;
