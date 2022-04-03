import {
	AddIcon,
	CheckIcon,
	DeleteIcon,
	EditIcon,
	LinkIcon,
	RepeatIcon,
} from "@chakra-ui/icons";
import {
	Box,
	Button,
	Center,
	Flex,
	Heading,
	Stack,
	useDisclosure,
} from "@chakra-ui/react";
import { Step, Steps } from "chakra-ui-steps";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import BlueBinCard from "../../components/recycleAndReuseComponents/BlueBinCard";
import NonBlueBinCard from "../../components/recycleAndReuseComponents/NonBlueBinCard";
import ShowSummaryLink from "../../components/recycleAndReuseComponents/ShowSummaryLink";

export default function Summary(props) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [step] = useState(3);

	var parsedData = JSON.parse(atob(props.cont));

	//last item in array
	// const person = parsedData.at(-1);
	// The above code is what was causing issues in Safari on iOS and OSX.
	const person = parsedData[parsedData.length - 1];

	return (
		<Center>
			<Head>
				<title>Summary</title>
			</Head>

			<ShowSummaryLink
				isOpen={isOpen}
				onClose={onClose}
				linkId={props.cont}
			/>

			<Box w={["70vw", "60vw", "40wv"]}>
				<Flex flexDir="column" width="100%">
					<Steps
						activeStep={step}
						responsive={false}
						labelOrientation="vertical"
						colorScheme="teal"
						p={3}
						size="md"
					>
						{/* Add items to the recycling list */}
						<Step
							// label={false && 'Add Items'}
							icon={AddIcon}
							// description={stepLabels[0].description}
							key="0"
						>
							<Heading as="h2" fontSize="xl" textAlign="center">
								Add Items
							</Heading>
						</Step>

						{/* Verify that the items are empty, rinsed or dried  */}
						<Step
							// label={stepLabels[1].label}
							icon={EditIcon}
							// description={stepLabels[1].description}
							key="1"
						></Step>

						{/* Decide what action to take: either house pickup or self-disposal */}
						<Step
							// label={stepLabels[2].label}
							icon={DeleteIcon}
							// description={stepLabels[2].description}
							key="2"
						></Step>

						{/* Final Confirmation and Summary List*/}
						<Step
							// label={stepLabels[3].label}
							icon={CheckIcon}
							// description={stepLabels[3].description}
							key="3"
						>
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

									<Stack direction="row" spacing={4}>
										<Button
											leftIcon={<LinkIcon />}
											colorScheme="teal"
											variant="solid"
											onClick={onOpen}
										>
											Save this summary!
										</Button>

										<Link
											href="/recycle-and-reuse"
											passHref
										>
											<Button
												rightIcon={<RepeatIcon />}
												colorScheme="teal"
												variant="outline"
											>
												Restart
											</Button>
										</Link>
									</Stack>
									<br />

									{parsedData.map((prop, index) =>
										prop.isPerson ? (
											<p></p>
										) : prop.organisation_name ? (
											<div>
												<NonBlueBinCard
													data={prop}
													person={person}
													key={`bluebin${index}`}
												/>
												<br />
											</div>
										) : (
											//   <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' p='6'>
											//   <p>Item {index + 1}</p>
											//   <strong>{prop.itemname}</strong>
											//   <hr/>
											//   <p>{prop.channel_name} by {prop.organisation_name}</p>
											//   <p>({prop.address})</p>
											//   <hr/>
											//   <p><b>Items Accepted: </b> {prop.categories_accepted}</p>
											//   <p><b>Operating Hours: </b>{prop.operating_hours}</p>
											//   <p><b>Condition: </b>{prop.type}</p>
											//   <p><b>Contact: </b>{prop.contact}</p>
											//   <p>({prop.distance}km from your location)</p>
											//   <a href={prop.website}>{prop.website}</a><br/>
											//   <b>+5 points</b>
											// </Box>
											<div>
												<BlueBinCard
													data={prop}
													key={`bluebin${index}`}
												/>
												<br />
											</div>
											// <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' p='6'>
											//   <p>Item {index + 1}</p>
											//   <strong>{prop.itemname}</strong>
											//   <hr/>
											//   <p>Recycling Bin @ Blk {prop.block_number}, S{prop.postal}</p>

											//   <p>{prop.latitude}</p>
											//   <p>{prop.longitude}</p>
											//   <p>({Math.round(prop.distance)} km from your location)</p>
											//   <b>+2 points</b>
											//   <br/>

											// </Box>
										),
									)}

									{/* BLUEBIN */}
									{/* {
                      bluebinDummyData ? bluebinDummyData.map((data, idx) => {
                        return (
                          <BlueBinCard data={data} key={`bluebin${idx}`} />
                        )
                      })
                      : ""
                    }

                    <br />
                    <Heading size="md">For non-blue bin recycling</Heading>
                    <br /> */}

									{/* NONBLUEBIN */}
									{/* {
                    nonBluebinDummyData ? nonBluebinDummyData.map( (data, idx) => {
                      return (
                          <>
                            <NonBlueBinCard data={data} key={`nonbluebin${idx}`} />
                            <br />
                          </>
                          )
                    })
                    : ""
                   } */}
								</Flex>
							</Flex>
						</Step>
					</Steps>
				</Flex>
			</Box>
		</Center>
	);
}
export async function getServerSideProps(context) {
	return {
		props: { cont: context.query.code }, // will be passed to the page component as props
	};
}
