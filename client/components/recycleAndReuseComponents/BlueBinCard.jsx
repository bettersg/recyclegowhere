import { Box, Text } from "@chakra-ui/react";

const BlueBinCard = ({ data }) => {
	return (
		<Box
			maxW="md"
			borderWidth="1px"
			borderRadius="lg"
			overflow="hidden"
			p="6"
		>
			The nearest blue bin to you is at:
			{/* address */}
			<Text fontSize="4xl" fontWeight="bold">
				Blk {data.block_number}
			</Text>
			{/* location */}
			<Text fontWeight="bold" color="dodgerblue">
				{data.distance}km away
			</Text>
			{/* timings */}
			<Text fontSize="xs">Available 24/7</Text>
			<br />
			{/* items */}
			<Text fontWeight="bold">Your Items</Text>
			{/* item list */}
			<Text marginLeft="20px">
				<ul>
					{data.items
						? data.items.map((item, idx) => {
								return <li key={idx}> {item} </li>;
						  })
						: ""}
				</ul>
			</Text>
		</Box>
	);
};

export default BlueBinCard;
