import React from 'react';
import Select from 'react-select';
import { options } from '../../../mockData/data';
import { useState } from 'react';
import { Center, Button } from '@chakra-ui/react';



const MultiSelect = () => {
    const [input, setInput] = useState({});

    const handleChange = (event) => {
        setInput({ input: event })
    }

    const handleSubmit = (event) => {

        event.preventDefault();
        console.log(input);
        alert(JSON.stringify(input));
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Select
                    // defaultValue={[options[1], options[2]]}
                    isMulti
                    name="items"
                    options={options}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    instanceId="postType"
                    onChange={handleChange}
                />
                <Button backgroundColor="teal.300" m={2} type="submit">Submit</Button>
            </form>
        </>
    )

}

export default MultiSelect;