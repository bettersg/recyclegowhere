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
} from "@chakra-ui/react";
import Additem from "../components/recycleAndReuseComponents/AddItem";
import MultiSelect from "../components/recycleAndReuseComponents/MultiSelect";
import Geolocation from "../components/recycleAndReuseComponents/Geolocation";
// import MultiSelect from '../components/recycleAndReuseComponents/MultiSelect';
// import Router from 'next//router';
import axios from "axios";
import { useState } from "react";
import urlcat from "urlcat";
import { options } from "../../mockData/data";

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

function RecycleAndReuse({ options }) {
  const [items, setItems] = useState({ input: [] });

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
      </Box>
    </Center>
  );
}

export default RecycleAndReuse;
