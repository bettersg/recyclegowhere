import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useState } from "react";

const InstructionsCarousel = ({ items }: { items: string[] }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const handlePrevClick = () => {
		setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
	};

	const handleNextClick = () => {
		setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
	};

	return (
		<>
			<Flex align="center">
				<Box flexGrow={1}>
					<Text as="b" fontSize="lg">
						Step {items.indexOf(items[currentIndex]) + 1} of {items.length}
					</Text>
					<Text>{items[currentIndex]}</Text>
				</Box>
			</Flex>
			<Center>
				<Button onClick={handlePrevClick} m={2}>
					<ChevronLeftIcon />
				</Button>
				<Button onClick={handleNextClick} m={2}>
					<ChevronRightIcon />
				</Button>
			</Center>
		</>
	);
};

export default InstructionsCarousel;
