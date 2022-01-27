import React, { useState } from 'react'
import {
    Box,
    Button,
    Flex,
    HStack,
    Image,
    Spacer,
    Text,
    VStack
} from '@chakra-ui/react'
// import Geolocation from './Geolocation'

import dynamic from "next/dynamic"
import { getBlueBinRecyclableItems, getNonBlueBinRecyclableItems, hasCheckedNonBlueBinRecyclableItems, hasCleanedBlueBinRecyclableItems } from '../Utils'

const GeolocationNoSSR = dynamic(
    () => import("./Geolocation"),
    {
        loading: () => <p>Map is loading...</p>,
        ssr: false,
    }
);

const TakeAction = ({ items, setLocation, setGeolocation, navigateBackToAddItem }) => {
    

    const blueBinRecyclableItems = getBlueBinRecyclableItems(items)
    const nonBlueBinRecyclableItems = getNonBlueBinRecyclableItems(items)
    const hasRecyclableItems = (blueBinRecyclableItems && blueBinRecyclableItems.length > 0) || (nonBlueBinRecyclableItems && nonBlueBinRecyclableItems.length > 0)

    const hasValidRecyclableItems = hasCleanedBlueBinRecyclableItems(items) || hasCheckedNonBlueBinRecyclableItems(items)

    return (
        <Flex flexDirection='column' justifyContent='center' alignItems='center'>

            <Text fontWeight='bold'>How would you like to take action?</Text>

            <Image
                src='/unclesemakau.png'
                alt='Uncle Semakau'
                width={211}
                height={223}
            />

            <VStack spacing={4} width='100%'>

                <Text 
                    fontWeight='bold' 
                    textAlign='center'> 
                    Your Final Item List 
                </Text>

                <Box 
                    width={['85vw', '60vw', '40vw']} 
                    borderWidth='1px' 
                    borderRadius='lg' 
                    overflow='scroll' 
                    height='250px' 
                    p='12px'>

                    { 
                        blueBinRecyclableItems && blueBinRecyclableItems.length > 0 && 
                        
                        <VStack width='100%' p='12px'>

                            <Text fontWeight='bold' textAlign='left' width='100%'>BLUE BIN RECYCLING</Text>

                            {
                                blueBinRecyclableItems.map(blueBinRecyclableItem => {
                                    return blueBinRecyclableItem.isCleaned
                                        ? <Text 
                                            textAlign='left' 
                                            width='100%' 
                                            key={blueBinRecyclableItem.id}>
                                                {blueBinRecyclableItem.description}
                                            </Text>
                                        : <Text 
                                            textAlign='left' 
                                            as='s' 
                                            width='100%' 
                                            key={blueBinRecyclableItem.id}>
                                                {blueBinRecyclableItem.description}
                                            </Text>
                                })
                            }
                        </VStack>
                        }
                    { 
                        nonBlueBinRecyclableItems && nonBlueBinRecyclableItems.length > 0 && 
                        
                        <VStack width='100%' p='12px'>

                            <Text 
                                fontWeight='bold' 
                                textAlign='left' 
                                width='100%'>
                                    NON-BLUE BIN RECYCLING
                                </Text>
                                {
                                    nonBlueBinRecyclableItems.map(nonBlueBinRecyclableItem => {
                                        return (
                                            <HStack 
                                                width='100%' 
                                                key = {nonBlueBinRecyclableItem.id}>

                                                    <Text 
                                                        textAlign='left' 
                                                        width='50%'>
                                                        {nonBlueBinRecyclableItem.description}
                                                    </Text>
                                                    <Spacer />
                                                    <Text textAlign='right'>
                                                        {nonBlueBinRecyclableItem.condition}
                                                    </Text>
                                            </HStack>
                                        )
                                })}
                        </VStack>
                    }
                    {
                        !hasRecyclableItems && 
                        <Text>No recyclable items selected!</Text>
                    }
                </Box>

                {
                    hasValidRecyclableItems && 
                    <HStack>
                        <Button 
                            size='md' 
                            colorScheme='gray'
                            variant='outline'
                            onClick={() => { setLocation(true); }}>
                                House Pickup
                        </Button>
                        <Button 
                            size='md' 
                            colorScheme='teal' 
                            onClick={() => { setGeolocation(true); }}>
                                Self disposal
                        </Button>
                    </HStack>
                }
                {
                    !hasValidRecyclableItems && 
                        <Button 
                            size='md' 
                            colorScheme='teal' 
                            onClick={navigateBackToAddItem}>
                            Return to Add Items
                        </Button>}
            </VStack>

            {/* <GeolocationNoSSR /> */}
        </Flex>
    )
}

export default TakeAction
