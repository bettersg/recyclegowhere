import Head from "next/head";
import { useState } from 'react' 
import { Stack, Heading, Center, Box, Flex, Button, useDisclosure } from "@chakra-ui/react";
import { Steps, Step } from "chakra-ui-steps";
import { AddIcon, EditIcon, DeleteIcon, CheckIcon, EmailIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import ShowSummaryLink from "../../components/recycleAndReuseComponents/ShowSummaryLink";

export default function Summary(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [step, setStep] = useState(3)

  const stepLabels = [
    { label: "Step 1", description: "Add Items"},
    { label: "Step 2", description: "Verify Items"},
    { label: "Step 3", description: "Take Action"},
    { label: "Step 4", description: "Complete"},]
  
  var parsedData = JSON.parse(atob(props.cont));

  return (
    <Center>
     <Head>
        <title>Summary</title>
      </Head>

      <ShowSummaryLink isOpen={isOpen} onClose={onClose} linkId={props.cont}/>

      <Box w={['70vw', '60vw', '40wv']}>
        <Flex 
          flexDir='column' 
          width='100%'>

          <Steps 
            activeStep={step} 
            responsive={false}
            labelOrientation="vertical"
            colorScheme='teal' 
            p={3} 
            size="md">

            {/* Add items to the recycling list */}
            <Step 
              label={stepLabels[0].label} 
              icon={AddIcon}
              description={stepLabels[0].description}
              key='0'>
              <Heading 
                as="h2" 
                fontSize="xl" 
                textAlign="center">
                  Add Items
              </Heading>
            </Step>

            {/* Verify that the items are empty, rinsed or dried  */}
            <Step 
              label={stepLabels[1].label} 
              icon={EditIcon} 
              description={stepLabels[1].description}
              key='1'>
            </Step>

            {/* Decide what action to take: either house pickup or self-disposal */}
            <Step 
              label={stepLabels[2].label} 
              icon={DeleteIcon}
              description={stepLabels[2].description}
              key='2'>
            </Step>

            {/* Final Confirmation and Summary List*/}
            <Step 
              label={stepLabels[3].label} 
              icon={CheckIcon}
              description={stepLabels[3].description}
              key='3'>
                <Flex
                  flexDirection="row"
                  justifyContent="center"
                  alignItems="center"
                  marginBottom={10}
                >
                  <Box>
                    <Heading as="h3">Your Summary</Heading>
                    <Stack direction='row' spacing={4}>
                      <Button leftIcon={<EmailIcon />} colorScheme='teal' variant='solid' onClick={onOpen}>
                        Save this summary!
                      </Button>
                      <Button rightIcon={<ArrowForwardIcon />} colorScheme='teal' variant='outline'>
                        Restart
                      </Button>
                    </Stack>
                    <br/>
                    { parsedData.map((prop, index) => (
                    //   <div>
                    //   <strong>{prop.itemname}</strong>
                    //   <p>{prop.address}</p>
                    //   <p>{prop.latitude}</p>
                    //   <p>{prop.longitude}</p>
                    // </div>
                      prop.website ? 
                      (
                      <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' p='6'>
                        <p>Item {index + 1}</p>
                        <strong>{prop.itemname}</strong>
                        <hr/>
                        <p>{prop.channel_name} by {prop.organisation_name}</p>
                        <p>({prop.address})</p>
                        <hr/>
                        <p><b>Items Accepted: </b> {prop.categories_accepted}</p>
                        <p><b>Operating Hours: </b>{prop.operating_hours}</p>
                        <p><b>Condition: </b>{prop.type}</p>
                        <p><b>Contact: </b>{prop.contact}</p>
                        <p>({prop.distance}km from your location)</p>
                        <a href={prop.website}>{prop.website}</a><br/>
                        <b>+5 points</b>
                      </Box>
                      ) :  
                      (
                      <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' p='6'>
                        <p>Item {index + 1}</p>
                        <strong>{prop.itemname}</strong>
                        <hr/>
                        <p>Recycling Bin @ Blk {prop.block_number}, S{prop.postal}</p>
                        {/* <p>{prop.latitude}</p>
                        <p>{prop.longitude}</p> */}
                        <p>({Math.round(prop.distance)} km from your location)</p>
                        <b>+2 points</b>
                        <br/>

                      </Box>
                      )
                    ))}
                  </Box>
                </Flex>
            </Step>
          </Steps>
        </Flex>
      </Box>
    </Center >
  );
}
export async function getServerSideProps(context) {
  console.log(context.query.code);
  return {
    props: { cont: context.query.code }, // will be passed to the page component as props
  };
}