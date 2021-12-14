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
// import Router from 'next//router';
import axios from "axios";
import { useState, useRef } from "react";
import urlcat from "urlcat";
import { options } from "../../mockData/data";

// // TODO: Need to actually fetch the data from the real server

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
    const [selectedItems, updateSelectedItems] = useState();
    const [tabIndex, updateTabIndex] = useState(0);
    const [didSelectItems, willTriggerNotification] = useState(false);

    // Dialog box for Confirmation
    const cancelRef = useRef();
    const onClose = () => willTriggerNotification(false);
    const proceedNextTab = () => {
        updateTabIndex(1);
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
                        <Button colorScheme='green' onClick={proceedNextTab} ml={3}>
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
                >
                    <TabList>
                        <Tab isDisabled={tabIndex != 0}>
                            <AddIcon />
                            Add Item
                        </Tab>
                        {/* <Tab isDisabled={hasNoItems(items)}> */}
                        <Tab isDisabled={selectedItems && tabIndex == 1 ? selectedItems.count > 0 ? true : false : true}>
                            <InfoOutlineIcon />
                            Item List
                        </Tab>
                        <Tab isDisabled={selectedItems && tabIndex == 2 ? selectedItems.count > 0 ? true : false : true}>
                            <DeleteIcon />
                            Dispose Items
                        </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Additem />
                            <MultiSelect options={options} updateTabIndex={updateTabIndex} updateSelectedItems={updateSelectedItems} willTriggerNotification={willTriggerNotification} />
                        </TabPanel>
                        <TabPanel>
                            <ItemList selectedItems={selectedItems} />
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
