import { Button, Box } from "@chakra-ui/react";
import { UpDownIcon } from "@chakra-ui/icons";
import { useState, useRef } from "react";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	PopoverCloseButton,
} from "@chakra-ui/react";
// import { RefObject } from "react";
// import { FocusableElement } from "@chakra-ui/utils";
import MarkedSlider from "./slider";

const FilterButton = () => {
	const initRef = useRef<HTMLElement | null>(null); // Specify the correct type for initRef

	const [priceValue, setPriceValue] = useState(100);
	const [quantityValue, setQuantityValue] = useState(100);

	const PriceManager = (val: number) => {
		setPriceValue(val);
	};
	const QuantityManager = (val: number) => {
		setQuantityValue(val);
	};

	return (
		<Popover initialFocusRef={initRef}>
			{({ isOpen, onClose }) => (
				<>
					<PopoverTrigger>
						<Button leftIcon={<UpDownIcon />} colorScheme={"teal"} size={"md"}>
							Filter
						</Button>
					</PopoverTrigger>
					<PopoverContent>
						<PopoverHeader>Filter Results</PopoverHeader>
						<PopoverCloseButton />
						<PopoverBody p={5}>
							<Box>
								Max Price
								<MarkedSlider value={priceValue} onSliderChange={PriceManager} />
							</Box>
							<br />
							<Box>
								Min Quantity
								<MarkedSlider
									value={quantityValue}
									onSliderChange={QuantityManager}
								/>
							</Box>

							<Button mt={4} colorScheme="teal" onClick={onClose} ref={initRef}>
								Apply
							</Button>
						</PopoverBody>
					</PopoverContent>
				</>
			)}
		</Popover>
	);
};

export default FilterButton;
