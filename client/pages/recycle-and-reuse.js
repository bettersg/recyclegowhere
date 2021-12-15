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
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter
} from "@chakra-ui/react";
import Additem from "../components/recycleAndReuseComponents/AddItem";
import MultiSelect from "../components/recycleAndReuseComponents/MultiSelect";
import Geolocation from "../components/recycleAndReuseComponents/Geolocation";
import ItemList from '../components/recycleAndReuseComponents/ItemList';
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
  const [items, setItems] = useState({ input: [] })
  const [tabIndex, setTabIndex] = useState(0)
  const [didSelectItems, willTriggerNotification] = useState(false);

  // Dialog box for Confirmation
  const cancelRef = useRef();
  const onClose = () => willTriggerNotification(false);
  const navigateToVerifyItem = () => {
      setTabIndex(1);
      onClose();
  }

  return (
    <Center>
      <AlertDialog isOpen={didSelectItems} leastDestructiveRef={cancelRef} onClose={onClose}>
          <AlertDialogOverlay>
              <AlertDialogContent>
                  <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                      Confirmation
                  </AlertDialogHeader>

                  <AlertDialogBody>
                      Is every item listed? You cannot return to this page to add more items for this round!
                  </AlertDialogBody>

                  <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                      Cancel
                  </Button>
                  <Button colorScheme='green' onClick={navigateToVerifyItem} ml={3}>
                      Confirm
                  </Button>
                  </AlertDialogFooter>
              </AlertDialogContent>
          </AlertDialogOverlay>
      </AlertDialog>
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
              Dispose Items
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Additem />
              <MultiSelect data={data} setItems={setItems} willTriggerNotification={willTriggerNotification} />
            </TabPanel>
            <TabPanel>
              <VerifyItem items={items} setItems={setItems} navigateToTakeAction={() => setTabIndex(2)} />
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
