import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import Select from "react-select";
import { options }  from '../../../mockData/data';
import { useState } from "react";


const MultiSelect = ({ optionss = options, setInput, updateSelectedItems, updateTabIndex, willTriggerNotification }) => {

    const [listItems, updateListItems] = useState();

    const handleChange = (event) => {
        updateListItems(event);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Safer logic
        if (listItems !== undefined) {
            updateSelectedItems(listItems);
            willTriggerNotification(true);
        }
        
    };

    return (
        <form onSubmit={handleSubmit}>
        <Select
            isMulti
            name="items"
            options={optionss}
            className="basic-multi-select"
            classNamePrefix="select"
            instanceId="postType"
            onChange={handleChange}
        />
        <Flex flexDirection="column" justifyContent="center" alignItems="center">
            <Button backgroundColor="#319795" color="white" my="5" type="submit" isDisabled={listItems === undefined ? true : false}>
                Submit
            </Button>
        </Flex>
        </form>
    );
};

export default MultiSelect;
