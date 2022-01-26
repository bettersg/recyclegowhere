import Head from "next/head";

import Image from "next/image";
import Link from "next/link";
import { Stack, Text, Heading, Button, Box, Flex, Center } from "@chakra-ui/react";
import { useEffect } from "react";

import { Step, Steps } from "chakra-ui-steps";
import { useState } from 'react' 
import { Stack, Heading, Center, Box, Flex, Button, useDisclosure, Text, Spacer } from "@chakra-ui/react";
import { AddIcon, EditIcon, DeleteIcon, CheckIcon, LinkIcon, RepeatIcon } from "@chakra-ui/icons";
import ShowSummaryLink from "../../components/recycleAndReuseComponents/ShowSummaryLink";
import BlueBinCard from "../../components/recycleAndReuseComponents/BlueBinCard";
import NonBlueBinCard from "../../components/recycleAndReuseComponents/NonBlueBinCard";

export default function Summary(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [step, setStep] = useState(3)

  const bluebinDummyData = [
    {
      address: "578 Hougang Ave 4, Singapore 53057",
      location: 'NEA',
      timings: "Available 24/7",
      items: ["item 1", "item 2"]
    }
  ]

  const nonBluebinDummyData = [
    {
      binType: "Special Electronic Waste BIn",
      location: "Alba E-Waste Smart Recycling Pte Ltd",
      address: "10 Buangkok View, Singapore 539747",
      timings: "24/7",
      items: ["Toaster = Spoilt beyond repair"]
    },
    {
      binType: "Thrift & Buyback Shop - Bishan outlet",
      location: "Salvation Army",
      address: "20 Bishan St 22",
      timings: "Mon - Sun, 7am - 9am",
      items: ["Laptop - in good condition"]
    }
  ]

  const stepLabels = [
    { label: "Step 1", description: "Add Items"},
    { label: "Step 2", description: "Verify Items"},
    { label: "Step 3", description: "Take Action"},
    { label: "Step 4", description: "Complete"},]
  
  var parsedData = JSON.parse(atob(props.cont));
  console.log(parsedData)

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
                  <Flex
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    marginBottom={10}
                    >

                    <br />
                    <Heading as="h3">Your Summary</Heading>
                    <br />

                    <Stack direction='row' spacing={4}>
                      <Button leftIcon={<LinkIcon />} colorScheme='teal' variant='solid' onClick={onOpen}>
                        Save this summary!
                      </Button>

                    <Link href="/recycle-and-reuse" passHref>
                      <Button rightIcon={<RepeatIcon />} colorScheme='teal' variant='outline'>
                        Restart
                      </Button>
                    </Link>
                    </Stack>
                    <br/>

                    {/*  
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

                        <p>{prop.latitude}</p>
                        <p>{prop.longitude}</p>
                        <p>({Math.round(prop.distance)} km from your location)</p>
                        <b>+2 points</b>
                        <br/>

                      </Box>
                      )
                    ))}
                    */}

                    {/* BLUEBIN */}
                    { 
                      bluebinDummyData ? bluebinDummyData.map((data, idx) => {
                        return (
                          <BlueBinCard data={data} key={`bluebin${idx}`} />
                        )
                      })
                      : "" 
                    }

                    <br />
                    <Heading size="md">For non-blue bin recycling</Heading>
                    <br />

                    {/* NONBLUEBIN */}
                   { 
                    nonBluebinDummyData ? nonBluebinDummyData.map( (data, idx) => {
                      return (
                          <> 
                            <NonBlueBinCard data={data} key={`nonbluebin${idx}`} />
                            <br />
                          </>
                          )
                    })
                    : ""
                   }

                  </Flex>
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
