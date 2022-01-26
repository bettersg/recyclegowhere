import { useState } from 'react'
import {
    Alert,
    AlertIcon,
    Box,
    Button,
    Checkbox,
    CloseButton,
    Flex,
    HStack,
    ListItem,
    Select,
    Spacer,
    Text,
    UnorderedList,
    VStack
} from '@chakra-ui/react'
import Image from 'next/image'
import VerifyItemDialog from './VerifyItemDialog'
import { getGeneralWasteItems, getBlueBinRecyclableItems, getNonBlueBinRecyclableItems } from '../Utils'

const VerifyItem = ({ items, setItems, generalWasteItemDetails, navigateToTakeAction }) => {
    const [showDialog, setShowDialog] = useState(false)
    const [dialogItemIndex, setDialogItemIndex] = useState(0)
    const [selectedItems, setSelectedItems] = useState([])

    const generalWasteItems = getGeneralWasteItems(items)
    const blueBinRecyclableItems = getBlueBinRecyclableItems(items)
    const nonBlueBinRecyclableItems = getNonBlueBinRecyclableItems(items)

    const [showAlert, toggleShowAlert] = useState(true)
    const initialCheckedConditionItems = Array(nonBlueBinRecyclableItems.length).fill(false)
    const [checkedConditionItems, setCheckedConditionItems] = useState(initialCheckedConditionItems)

    const itemConditions = ['In good condition', 'In need of repair', 'Spoilt beyond repair']
    const selectPlaceholder = 'Select condition'
    const enableConfirmButton = checkedConditionItems.every((itemCondition) => itemConditions.includes(itemCondition))

    const toggleSelect = (selectValue, index) => {
        const itemsCheckedForCondition = checkedConditionItems.map((checkedConditionItem, itemIndex) => {
            return itemIndex === index ? selectValue : checkedConditionItem
        })
        setCheckedConditionItems(itemsCheckedForCondition)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const checkedItems = event.target.elements
        const updatedItems = []

        const addToUpdatedItemsList = (element, value, field) => {
            const item = items.filter(item => item.id === parseInt(element.name))[0]
            const clonedItem = { ...item }
            clonedItem[field] = value
            updatedItems.push(clonedItem)
        }

        for (let i = 0; i < checkedItems.length; i++) {
            if (checkedItems[i].nodeName === 'INPUT' && checkedItems[i].type === 'checkbox') {
                const isChecked = checkedItems[i].checked
                addToUpdatedItemsList(checkedItems[i], isChecked, 'isCleaned')
            } else if (checkedItems[i].nodeName === 'SELECT') {
                const condition = checkedItems[i].selectedOptions[0].value
                addToUpdatedItemsList(checkedItems[i], condition, 'condition')
            }
        }

        if (generalWasteItems && generalWasteItems.length > 0) {
            setSelectedItems(updatedItems)
            setShowDialog(true)
        } else {
            setItems(updatedItems)
            navigateToTakeAction()
        }
    }

    return (
        <Flex flexDirection='column' justifyContent='center' alignItems='center' width='100%'>
            <Text fontWeight='bold'>Please check against the statements below.</Text>
            <Image
                src='/unclesemakau.png'
                alt='Uncle Semakau'
                width={211}
                height={223}
            />
            <form onSubmit={handleSubmit}>
                <VStack spacing={4} width='100%'>
                    <Text fontWeight='bold' textAlign='center'>Your Item List</Text>
                    <Text fontWeight='lighter' textAlign='left' width='100%'>* represents a required field</Text>
                    <Box width={['85vw', '60vw', '40vw']} borderWidth='1px' borderRadius='lg' overflow='scroll' height='250px' p='12px'>
                        {blueBinRecyclableItems && blueBinRecyclableItems.length > 0 && <VStack width='100%' p='12px'>
                            <Text fontWeight='bold' textAlign='left' width='100%'>ITEM IS EMPTY, RINSED AND/OR DRIED</Text>
                            {blueBinRecyclableItems.map(itemToCheckCleaned => {
                                return (
                                    <HStack width='100%' key={itemToCheckCleaned.id}>
                                        <Text>{itemToCheckCleaned.description}</Text>
                                        <Spacer />
                                        <Checkbox
                                            name={itemToCheckCleaned.id}
                                            colorScheme="blue"
                                            size='lg' 
                                        />
                                    </HStack>
                                )
                            })}
                        </VStack>}
                        {nonBlueBinRecyclableItems && nonBlueBinRecyclableItems.length > 0 && <VStack width='100%' p='12px'>
                            <Text fontWeight='bold' textAlign='left' width='100%'>INDICATE THE CONDITION</Text>
                            {nonBlueBinRecyclableItems.map((itemToCheckCondition, index) => {
                                return (
                                    <HStack width='100%' key={`${itemToCheckCondition.id}`}>
                                        <Text width='70%'>{itemToCheckCondition.description}*</Text>
                                        <Spacer />
                                        <Select
                                            placeholder={selectPlaceholder}
                                            onChange={(e) => toggleSelect(e.target.selectedOptions[0].value, index)}
                                            isRequired={true}
                                            name={itemToCheckCondition.id}
                                            value={checkedConditionItems[index]}
                                        >
                                            {itemConditions.map(itemCondition =>
                                                <option
                                                    key={`${itemToCheckCondition.id}-${itemCondition}`}
                                                    name={itemToCheckCondition.id}
                                                    value={itemCondition}
                                                >
                                                    {itemCondition}
                                                </option>
                                            )}
                                        </Select>
                                    </HStack>
                                )
                            })}
                        </VStack>}
                        {(!blueBinRecyclableItems || blueBinRecyclableItems.length === 0) && (!nonBlueBinRecyclableItems || nonBlueBinRecyclableItems.length === 0) && (
                            <Text>No recyclable items selected.</Text>
                        )}
                    </Box>
                    {generalWasteItems && generalWasteItems.length > 0 && showAlert && (
                        <Alert status='error'>
                            <VStack width='100%'>
                                <HStack width='100%'>
                                    <AlertIcon />
                                    <Text fontWeight="bold">The following items cannot be recycled.</Text>
                                    <Spacer />
                                    <CloseButton onClick={() => toggleShowAlert(false)} size='md' />
                                </HStack>
                                <Box width='100%' pl={45}>
                                    <UnorderedList width='100%'>
                                        {generalWasteItems.map((generalWasteItem) =>
                                            <ListItem key={generalWasteItem.id}>{generalWasteItem.description}</ListItem>
                                        )}
                                    </UnorderedList>
                                </Box>
                            </VStack>
                        </Alert>
                    )}
                    <Button
                        size='md'
                        colorScheme='teal'
                        isDisabled={!enableConfirmButton}
                        type='submit'
                    >
                        Confirm
                    </Button>
                </VStack>
            </form>
            {generalWasteItems && generalWasteItems.length > 0 && generalWasteItemDetails && <VerifyItemDialog 
                setNextStep={navigateToTakeAction}
                showDialog={showDialog}
                setShowDialog={setShowDialog}
                generalWasteItems={generalWasteItems}
                generalWasteItemDetails={generalWasteItemDetails}
                selectedItems={selectedItems}
                setItems={setItems}
                dialogItemIndex={dialogItemIndex}
                setDialogItemIndex={setDialogItemIndex}
            />}
        </Flex>
    )
}

export default VerifyItem
