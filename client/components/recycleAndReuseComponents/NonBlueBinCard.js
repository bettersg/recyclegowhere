
import { Box, Text, Button, ButtonGroup, Flex } from "@chakra-ui/react";

const NonBlueBinCard = ({person, data}) => {
  const hyperlink = "https://www.google.com/maps/dir/" + person.latitude +","+person.longitude+"/"+data.latitude+","+data.longitude+"/data=!3m1!4b1!4m5!4m4!1m1!4e1!1m0!3e3"
  return (
    <Box maxW='md' borderWidth='1px' borderRadius='lg' overflow='hidden' p='6'>
      The nearest facility for your non blue bin item is:
      {/* Bin Type */}
      <Text fontSize='3xl' fontWeight='bold'>
        { data.organisation_name } 
      </Text>

      {/* location */}
      <Text fontSize='xl' fontWeight='bold' color='dodgerblue'>
        { data.channel_name } 
      </Text>

      {/* address */}
      <Text fontSize='sm'mt={1}>
        { data.address}
      </Text>

      {/* timings */}
      <Text fontSize='sm' mt={1}>
        When to go: { data.operating_hours } 
      </Text>

      <br />

      {/* items */}
      <Text fontWeight='bold'>
        Your Item
      </Text>

      {/* item list */}
      <Text marginLeft="20px">
      <li> 
                { data.itemname } ({data.type})
              </li>
        {/* { 
          // data.items ? data.items.map( (item, idx) => {
          //   return (
              <li> 
                { itemname }
              </li>
            )
          }) : ""
        } */}
      </Text>
      
      <br />

      <Flex direction="row-reverse">
        <ButtonGroup>
          <a href="https://www.google.com/maps/dir/1.3918193,103.9027994/1.3975897,103.9007985/@1.3942831,103.8985932,17z/data=!3m1!4b1!4m5!4m4!1m1!4e1!1m0!3e3">
          <Button> Directions</Button></a>
          <Button colorScheme={'teal'}> Contact </Button>
        </ButtonGroup>
      </Flex>

    </Box>
  )
}



export default NonBlueBinCard
                    
