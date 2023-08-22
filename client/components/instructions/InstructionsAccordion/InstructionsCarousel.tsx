import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useState } from "react";

type CarouselProps = {
	items: string[];
};

const Carousel = ({ items: props }: CarouselProps) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const handlePrevClick = () => {
		setCurrentIndex((prevIndex) => (prevIndex === 0 ? props.length - 1 : prevIndex - 1));
	};

	const handleNextClick = () => {
		setCurrentIndex((prevIndex) => (prevIndex === props.length - 1 ? 0 : prevIndex + 1));
	};

	return (
		<>
			<Flex align="center">
				<Box flexGrow={1}>
					<Text as="b" fontSize="lg">
						Step {props.indexOf(props[currentIndex]) + 1} of {props.length}
					</Text>
					<Text>{props[currentIndex]}</Text>
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

export default Carousel;
