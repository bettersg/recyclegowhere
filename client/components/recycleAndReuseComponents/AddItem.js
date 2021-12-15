import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import Image from 'next/image'
import AddItemDialog from './AddItemDialog'
import AddItemMultiSelect from './AddItemMultiSelect'

const Additem = ({ setTabIndex, data, setItems }) => {
    const [didSelectItems, willTriggerDialog] = React.useState(false);

    return (
        <Flex flexDirection="column" justifyContent="center" alignItems="center" >
            <Text fontWeight="bold">1. Type the name of the item you wish to reuse/recycle.</Text>
            <Image
                src="/unclesemakau.png"
                alt="Uncle Semakau"
                width={211}
                height={223}
            />
            <Text fontWeight="bold" textAlign="center">I want to reuse or recycle:</Text>
            <AddItemMultiSelect data={data} setItems={setItems} willTriggerDialog={willTriggerDialog} /> 
            <AddItemDialog setTabIndex={setTabIndex} didSelectItems={didSelectItems} willTriggerDialog={willTriggerDialog} />
        </Flex>
    );
}

export default Additem
