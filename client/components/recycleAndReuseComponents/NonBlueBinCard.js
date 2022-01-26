
import { Box, Text, Button, ButtonGroup, Flex } from "@chakra-ui/react";

const NonBlueBinCard = ({data}) => {

  return (
    <Box maxW='md' borderWidth='1px' borderRadius='lg' overflow='hidden' p='6'>
      {/* Bin Type */}
      <Text fontSize='3xl' fontWeight='bold'>
        { data.binType }
      </Text>

      {/* location */}
      <Text fontSize='xl' fontWeight='bold' color='dodgerblue'>
        { data.location }
      </Text>

      {/* address */}
      <Text fontSize='sm'>
        { data.address}
      </Text>

      {/* timings */}
      <Text fontSize='sm'>
        When to go: { data.timings }
      </Text>

      <br />

      {/* items */}
      <Text fontWeight='bold'>
        Your Items
      </Text>

      {/* item list */}
      <Text marginLeft="20px">
        { 
          data.items ? data.items.map( (item, idx) => {
            return (
              <li key={`item${idx}`}> 
                { item }
              </li>
            )
          }) : ""
        }
      </Text>
      
      <br />

      <Flex direction="row-reverse">
        <ButtonGroup>
          <Button> Directions</Button>
          <Button colorScheme={'teal'}> Contact </Button>
        </ButtonGroup>
      </Flex>

    </Box>
  )
}



export default NonBlueBinCard
                    
