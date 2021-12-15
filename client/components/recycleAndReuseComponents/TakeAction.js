import React from 'react'
import { Box, ListItem, UnorderedList } from '@chakra-ui/react'
import Geolocation from './Geolocation'

const TakeAction = ({ items }) => {
    return (
        <>
            <Box width='100%' pl={45}>
                <UnorderedList width='100%'>
                    {items.map(item => 
                        <ListItem key={item.name}>{item.name}</ListItem>
                    )}
                </UnorderedList>
            </Box>
            <Geolocation />
        </>
    )
}

export default TakeAction
