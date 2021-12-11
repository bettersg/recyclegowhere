import React, { useContext } from 'react';
import { Box, Input, Flex, Text, InputGroup, InputLeftElement, Heading, List, ListItem, ListIcon, Button } from "@chakra-ui/react";
import Image from 'next/image';
import FormContext from '../../context/context';

const VerifyItems = () => {

    const { selectedItems, setSelectedItems } = useContext(FormContext);

    return (
        <Box>
            <Heading fontSize="2xl">Verify Items (Testing)</Heading>
            {selectedItems && selectedItems.map(item =>
                <Text>
                    {item.label}
                </Text>
            )}


        </Box>
    );
}

export default VerifyItems;
