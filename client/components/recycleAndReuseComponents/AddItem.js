import React, { useContext } from 'react';
import { Heading, Flex, Text, InputGroup, InputLeftElement, Box, List, ListItem, ListIcon } from "@chakra-ui/react";
import Image from 'next/image';
import MultiSelect from './MultiSelect';
import FormContext from '../../context/context';

const AddItems = () => {

    const { selectedItems, setSelectedItems } = useContext(FormContext);

    return (
        <Box pt={5}>
            <Flex flexDirection="column" justifyContent="center" alignItems="center">

                <Text fontWeight="bold">1. Type the name of the item you wish to reuse/recycle.</Text>
                <Image
                    src="/unclesemakau.png"
                    alt="Uncle Semakau"
                    width={211}
                    height={223}
                />
                <Text fontWeight="bold" textAlign="center">Type in item(s) to recycle/ donate</Text>

            </Flex>
            <MultiSelect />
            <Text textAlign="center" marginBottom={3}>Click here if your item is not in our list.</Text>
            <Box p={10}>
                <Heading as="h1" fontSize="2xl">Your Items</Heading>
                <List>
                    {selectedItems ? selectedItems.map(item =>
                        <ListItem>
                            {item.label}
                        </ListItem>
                    ) : <Text color="gray.500">No items yet</Text>}


                </List>
            </Box>

        </Box>

    );
}

export default AddItems;
