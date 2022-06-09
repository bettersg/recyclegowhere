import { AddIcon, CheckIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Center, Flex } from "@chakra-ui/react";
// STEPPER IMPORTS
import { Step, Steps } from "chakra-ui-steps";
import dynamic from "next/dynamic";
import { useState } from "react";
import Head from "../components/Head";
import AddItem from "../components/AddItem";
import GeneralWaste from "../jsonfiles/General-Waste.json";
import Item from "../jsonfiles/Item.json";

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

export interface DataType {
	items: {
		[key: string]: Item
	};
	generalWasteItemDetails: {
		[key: string]: GeneralWasteItemDetails
	};
}

interface Item {
	id: number;
	description: string;
	category: string;
	bluebinrecyclable: number;
}

interface GeneralWasteItemDetails {
	id: number;
	description: string;
	category: string;
	reason: string;
	suggestion: string;
}

const Home = (data:DataType) => {
	const [items, setItems] = useState([]);
	const [step, setStep] = useState(0);
	const [geolocation, setGeolocation] = useState(false);
	const [location, setLocation] = useState(false);
	return (
		<div >
			<Head>
				<title>RecycleGoWhere</title>
				<meta
					name="description"
					content="Singapore's first recycling planner"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Center>
				<Box w={["70vw", "60vw", "40wv"]}>
					<Flex flexDir="column" width="100%">
						<AddItem
							setNextStep={() => setStep(1)}
							data={data}
							setItems={setItems}
						/>
					</Flex>
				</Box>
			</Center>

			<footer></footer>
		</div>
	);
};

export default Home;
