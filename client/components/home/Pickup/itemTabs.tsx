import { Tab, Tabs, TabList, TabPanel, TabPanels } from "@chakra-ui/react";
import OrgCard from "./card";

const ItemTabs = () => {
    const itemList = ["Laptop", "Battery", "Drink Bottle", "Drink Cans", "Light Bulb", "Aerosol Cans", "Perfume Bottles"];

    return (
        <Tabs variant={"enclosed"} colorScheme={"teal"} align={"start"} overflow={"hidden"} isFitted={true}>
            <TabList>
                {itemList.map((item)=>(
                    <Tab key={item}>{item}</Tab>
                ))}
            </TabList>
            <TabPanels>
                {itemList.map((item)=>(
                    <TabPanel key={item}>
                        <OrgCard />
                        <OrgCard />
                    </TabPanel>
                ))}
            </TabPanels>
        </Tabs>
    );
};

export default ItemTabs;