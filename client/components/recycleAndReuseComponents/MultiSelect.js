import { Button } from "@chakra-ui/react";
import React from "react";
import Select from "react-select";

const MultiSelect = ({ options = data, setInput }) => {
  const handleChange = (event) => {
    setInput({ input: event });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("submitting");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Select
          isMulti
          name="items"
          options={options}
          className="basic-multi-select"
          classNamePrefix="select"
          instanceId="postType"
          onChange={handleChange}
        />
        <Button backgroundColor="teal.300" m={2} type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};

export default MultiSelect;
