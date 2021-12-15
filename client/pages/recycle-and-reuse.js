import { AddIcon, DeleteIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import Additem from "../components/recycleAndReuseComponents/AddItem";
import ItemList from '../components/recycleAndReuseComponents/ItemList';
import TakeAction from "../components/recycleAndReuseComponents/TakeAction";
import VerifyItem from "../components/recycleAndReuseComponents/VerifyItem";
// import Router from 'next//router';
import Link from 'next/link'
import axios from "axios";
import { useState, useRef } from "react";
import urlcat from "urlcat";
import { options } from "../../mockData/data";

// // TODO: Need to actually fetch the data from the real server

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
  const [tabIndex, setTabIndex] = useState(0)

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
          index={tabIndex}
          onChange={(index) => setTabIndex(index)}
        >
          <TabList>
            <Tab isDisabled={tabIndex !== 0}>
              <AddIcon />
              Add Item
            </Tab>
            <Tab isDisabled={tabIndex !== 1}>
              <InfoOutlineIcon />
              Item List
            </Tab>
            <Tab isDisabled={tabIndex !== 2}>
              <DeleteIcon />
              Take Action
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Additem setTabIndex={setTabIndex} data={data} setItems={setItems} />
            </TabPanel>
            <TabPanel>
              <VerifyItem items={items} setItems={setItems} navigateToTakeAction={() => setTabIndex(2)} />
            </TabPanel>
            <TabPanel>
              <TakeAction items={items} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Center>
  );
}

export default RecycleAndReuse;
