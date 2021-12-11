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
import AddItems from "../components/recycleAndReuseComponents/AddItem";
import VerifyItems from "../components/recycleAndReuseComponents/VerifyItems";
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

const renderStep = (step) => {
  switch (step) {
    case 0:
      return <AddItems />
    case 1:
      return <VerifyItems />
    case 2:
      return <h1>Take Action</h1>
    case 3:
      return <h1>Complete</h1>
  }
}


const steps = [
  { id: 0, label: "Add Items" },
  { id: 1, label: "Verify Items" },
  { id: 2, label: "Take Action" },
  { id: 3, label: "Complete!" }
]

function RecycleAndReuse({ options }) {
  const [items, setItems] = useState({ input: [] });

  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  })

  return (
    <Center>
      <Box w="40vw">

        <Flex flexDir="column" width="100%">
          <Steps activeStep={activeStep} responsive={false}>
            {steps.map(({ id, label }) => (
              <Step label={label} key={id}>
                {renderStep(id)}
              </Step>
            ))}
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
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Flex>
          )}
        </Flex>

      </Box>
    </Center>
  );
}

export default RecycleAndReuse;
