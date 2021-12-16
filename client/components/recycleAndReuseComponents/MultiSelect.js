import { Button, Flex } from "@chakra-ui/react";
import React, { useState, useContext } from "react";
import Select from "react-select";
import { options } from '../../../mockData/data';
import FormContext from "../../context/context";

const MultiSelect = ({ optionss = options, setInput, }) => {

  const { selectedItems, setSelectedItems } = useContext(FormContext);
  const [listItems, setListItems] = useState();

  const handleChange = (event) => {
    setListItems(event);
    // setSelectedItems(listItems);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSelectedItems(listItems);
  };




  return (
    <>
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
          <Button backgroundColor="#319795" color="white" my="5" type="submit">
            Update List
          </Button>
        </Flex>
      </form>
    </>
  );
};

export default MultiSelect;
