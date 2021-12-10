import React from 'react';
import { Input, Flex, Text, InputGroup, InputLeftElement, Heading} from "@chakra-ui/react";
import Image from 'next/image';
import { Search2Icon } from '@chakra-ui/icons';

const ItemList = ({selectedItems}) => {


    return (
        <Flex flexDirection="column" justifyContent="center" alignItems="center">
            <Image
                src="/unclesemakau.png"
                alt="Uncle Semakau"
                width={211}
                height={223}
            />
            <Heading fontSize="xl" mb="5" mx="5" px="5" textAlign="center">Alrighty, please confirm against the items you've listed previously, below:</Heading>
            <Heading fontSize="xl" color="#319795">Your Item List</Heading>
            
            {selectedItems.map(item => <div>{item.label}</div>)}

        </Flex>
    );
}

export default ItemList;
