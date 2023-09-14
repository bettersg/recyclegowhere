import {Button, Box , IconButton,
	Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverCloseButton} from "@chakra-ui/react";
import { useState, useRef } from "react";
import MarkedSlider from "./slider";
import { BsFilter } from "react-icons/bs";
import { Icon } from "@chakra-ui/icons";

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
					<IconButton
						icon={<Icon as={BsFilter} />}
						variant="outline"
						size="lg"
						aria-label={"Filter"} />
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

							<Button mt={4} colorScheme="teal" onClick={onClose} ref={initRef as React.RefObject<HTMLButtonElement>}>
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
