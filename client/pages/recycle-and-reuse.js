import { AddIcon, CheckIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Center, Flex } from "@chakra-ui/react";
// STEPPER IMPORTS
import { Step, Steps } from "chakra-ui-steps";
import dynamic from "next/dynamic";
import { useState } from "react";
import Head from "../components/head";
import AddItem from "../components/recycleAndReuseComponents/AddItem";
import Location from "../components/recycleAndReuseComponents/Location";
import TakeAction from "../components/recycleAndReuseComponents/TakeAction";
import VerifyItem from "../components/recycleAndReuseComponents/VerifyItem";
import GeneralWaste from "../jsonfiles/General-Waste.json";
import Item from "../jsonfiles/Item.json";

const GeolocationNoSSR = dynamic(
	() => import("../components/recycleAndReuseComponents/Geolocation"),
	{
		loading: () => <p>Map is loading</p>,
		ssr: false,
	},
);

function RecycleAndReuse({ data }) {
	const [items, setItems] = useState([]);
	const [step, setStep] = useState(0);
	const [geolocation, setGeolocation] = useState(false);
	const [location, setLocation] = useState(false);

	return (
		<Center>
			<Head title="Reuse and Recycle" />
			<Box w={["70vw", "60vw", "40wv"]}>
				<Flex flexDir="column" width="100%">
					<Steps
						activeStep={step}
						responsive={false}
						// labelOrientation="vertical"
						colorScheme="teal"
						p={3}
						size="md"
					>
						{/* Add items to the recycling list */}
						<Step
							label={false && "Add Items"}
							icon={AddIcon}
							key="0"
						>
							<AddItem
								setNextStep={() => setStep(1)}
								data={data}
								setItems={setItems}
							/>
						</Step>

						{/* Verify that the items are empty, rinsed or dried  */}
						<Step
							label={false && "Verify Items"}
							icon={EditIcon}
							key="1"
						>
							<VerifyItem
								items={items}
								setItems={setItems}
								generalWasteItemDetails={
									data.generalWasteItemDetails
								}
								navigateToTakeAction={() => setStep(2)}
							/>
						</Step>

						{/* Decide what action to take: either house pickup or self-disposal */}
						<Step
							label={false && "Take Action"}
							icon={DeleteIcon}
							key="2"
						>
							{geolocation ? (
								<GeolocationNoSSR items={items} />
							) : location ? (
								<Location
									items={items}
									setGeolocation={setGeolocation}
									setLocation={setLocation}
								/>
							) : (
								<TakeAction
									items={items}
									setGeolocation={setGeolocation}
									setLocation={setLocation}
									navigateBackToAddItem={() => setStep(0)}
								/>
							)}
						</Step>

						{/* Final Confirmation and Summary List*/}
						<Step
							label={false && "Complete"}
							icon={CheckIcon}
							key="3"
						></Step>
					</Steps>
				</Flex>
			</Box>
		</Center>
	);
}

export async function getStaticProps() {
	let items = Item || [];
	let generalWasteItemDetails = GeneralWaste || [];

	return {
		props: {
			data: {
				items: items,
				generalWasteItemDetails: generalWasteItemDetails,
			},
		},
	};
}

export default RecycleAndReuse;
