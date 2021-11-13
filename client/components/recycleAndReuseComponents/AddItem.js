import React from 'react';
import { Input, Flex, Text, InputGroup, InputLeftElement } from "@chakra-ui/react";
import Image from 'next/image';
import { Search2Icon } from '@chakra-ui/icons';

const Additem = () => {
    return (
        <Flex flexDirection="column" justifyContent="center" alignItems="center">
            <Text fontWeight="bold">1. Type the name of the item you wish to reuse/recycle.</Text>
            <Image
                src="/unclesemakau.png"
                alt="Uncle Semakau"
                width={211}
                height={223}
            />
            <Text fontWeight="bold" textAlign="center">I want to reuse or recycle:</Text>
            <InputGroup>
                <InputLeftElement
                    pointerEvents="none"
                    children={<Search2Icon color="gray.300" />}
                />
                <Input backgroundColor="white" placeholder="e.g. newspaper" />
            </InputGroup>

        </Flex>
    );
}

export default Additem;
