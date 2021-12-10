import { Button } from "@chakra-ui/react";
import React from "react";
import Select from "react-select";
import { options }  from '../../../mockData/data';
import { useState } from "react";


const MultiSelect = ({ optionss = options, setInput, updateSelectedItems, selectedItems }) => {

    const [listItems, updateListItems] = useState();

    const handleChange = (event) => {
        updateListItems(event);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        updateSelectedItems(listItems);
        console.log(selectedItems);
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
            <Button backgroundColor="teal.300" m={2} type="submit">
                Submit
            </Button>
        </form>
    );
};

export default MultiSelect;
