import { useState} from 'react'
import { Flex, Text } from '@chakra-ui/react'
import Image from 'next/image'
import AddItemDialog from './AddItemDialog'
import AddItemMultiSelect from './AddItemMultiSelect'

const AddItem = ({ setNextStep, data, setItems }) => {
    const [didSelectItems, willTriggerDialog] = useState(false)

    return (
        <Flex flexDirection="column" justifyContent="center" alignItems="center" >
            <br />
            {/* <Text fontWeight="bold">Key in the name of the items you wish to reuse/recycle.</Text> */}
            <Image
                src="/unclesemakau.png"
                alt="Uncle Semakau"
                width={211}
                height={223}
            />
            <div style={{marginInline:"20%", marginBottom:"20px"}}>
            <Text fontWeight="bold" textAlign="center"> Type in item(s) to recycle/donate:</Text>
            </div>
            <AddItemMultiSelect data={data} setItems={setItems} willTriggerDialog={willTriggerDialog} />
            <AddItemDialog setNextStep={setNextStep} didSelectItems={didSelectItems} willTriggerDialog={willTriggerDialog} />
        </Flex>
    );
}

export default AddItem
