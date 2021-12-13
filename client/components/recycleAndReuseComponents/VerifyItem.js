import React from 'react'
import { Alert, AlertIcon, Box, Button, Checkbox, CloseButton, Flex, HStack, ListItem, Select, Spacer, Text, UnorderedList, VStack } from '@chakra-ui/react'
import Image from 'next/image'

const VerifyItem = ({ items, setItems, navigateToTakeAction }) => {
    // TODO: figure out how this is populated
    const getInvalidItems = (items) => {
        return ["Cheese", "Cheeseburger"]
    }

    const getItemsToCheckCleaned = (items) => {
        return items.filter(item => item.isBlueBinRecyclable)
    }

    const getItemsToCheckCondition = (items) => {
        return items.filter(item => !item.isBlueBinRecyclable)
    }

    const invalidItems = getInvalidItems(items)
    const itemsToCheckCleaned = getItemsToCheckCleaned(items)
    const itemsToCheckCondition = getItemsToCheckCondition(items)

    const [showAlert, toggleShowAlert] = React.useState(true)
    const initialCheckedConditionItems = Array(itemsToCheckCondition.length).fill(false)
    const [checkedConditionItems, setCheckedConditionItems] = React.useState(initialCheckedConditionItems)

    const itemConditions = ['Good', 'Needs Repair', 'Spoilt']
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
        for (let i = 0; i < checkedItems.length; i++) {
            if (checkedItems[i].nodeName === 'INPUT' && checkedItems[i].type === 'checkbox') {
                const isItemCleaned = checkedItems[i].checked
                const item = items.filter(item => item.id === parseInt(checkedItems[i].name))[0]
                const clonedItem = {...item}
                clonedItem['isCleaned'] = isItemCleaned
                updatedItems.push(clonedItem)
            } else if (checkedItems[i].nodeName === 'SELECT') {
                const condition = checkedItems[i].selectedOptions[0].value
                const item = items.filter(item => item.id === parseInt(checkedItems[i].name))[0]
                const clonedItem = {...item}
                clonedItem['condition'] = condition
                updatedItems.push(clonedItem)
            }
        }
        setItems(updatedItems)
        navigateToTakeAction()
    }

    return (
        <Flex flexDirection='column' justifyContent='center' alignItems='center'>
            <Text fontWeight='bold'>2. Please check against the statements below.</Text>
            <Image
                src='/unclesemakau.png'
                alt='Uncle Semakau'
                width={211}
                height={223}
            />
            <form onSubmit={handleSubmit}>
                <VStack spacing={4} width='100%'>
                    <Text fontWeight='bold' textAlign='center'>Your Item List</Text>
                    <Box width='100%' borderWidth='1px' borderRadius='lg' overflow='scroll' height='250px'>
                        {itemsToCheckCleaned && itemsToCheckCleaned.length > 0 && <VStack width='100%' p='12px'>
                            <Text fontWeight='bold' textAlign='left' width='100%'>ITEM IS EMPTY, RINSED AND/OR DRIED</Text>
                            {itemsToCheckCleaned.map(itemToCheckCleaned => {
                                return (
                                    <HStack width='100%' key={itemToCheckCleaned.id}>
                                        <Text>{itemToCheckCleaned.description}</Text>
                                        <Spacer />
                                        <Checkbox 
                                            name={itemToCheckCleaned.id}
                                        />
                                    </HStack>
                                )
                            })}
                        </VStack>}
                        {itemsToCheckCondition && itemsToCheckCondition.length > 0 && <VStack width='100%' p='12px'>
                            <Text fontWeight='bold' textAlign='left' width='100%'>INDICATE THE CONDITION</Text>
                            {itemsToCheckCondition.map((itemToCheckCondition, index) => {
                                return (
                                    <HStack width='100%' key={`${itemToCheckCondition.id}`}>
                                        <Text width='70%'>{itemToCheckCondition.description}</Text>
                                        <Spacer />
                                        <Select 
                                            placeholder={selectPlaceholder} 
                                            onChange={(e) => toggleSelect(e.target.selectedOptions[0].value, index)}
                                            isRequired={true}
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
                    </Box>
                    {invalidItems && showAlert && (
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
                                        {invalidItems.map((invalidItem) => 
                                            <ListItem key={invalidItem}>{invalidItem}</ListItem>
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
        </Flex>
    )
}

export default VerifyItem;
