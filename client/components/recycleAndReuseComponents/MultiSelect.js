import React from 'react';
import Select from 'react-select';
import { options } from '../../../mockData/data';



const MultiSelect = () => (
    <Select
        // defaultValue={[options[1], options[2]]}
        isMulti
        name="items"
        options={options}
        className="basic-multi-select"
        classNamePrefix="select"
        instanceId="postType"
    />
)

export default MultiSelect;