import { Button, Box } from "@chakra-ui/react";
import {  UpDownIcon } from "@chakra-ui/icons";
import { useState, useRef} from "react";
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverCloseButton } from '@chakra-ui/react';
import MarkedSlider from "./slider";


const FilterButton= () => {

    const initRef = useRef();

    const [priceValue, setPriceValue] = useState(100);
    const [quantityValue, setQuantityValue] = useState(100);
    
    const PriceManager = (val) => {
        setPriceValue(val);
    }
    const QuantityManager = (val) => {
        setQuantityValue(val);
    }
    const exportedPrice = () =>{
        return priceValue;
    }
    const exportedQuantity = () => {
        return quantityValue;
    }

    return (
        <Popover
            initialFocusRef={initRef}>
            {({isOpen, onClose}) => (
                <>
                    <PopoverTrigger>
                        <Button
                            leftIcon={<UpDownIcon />}
                            colorScheme={"teal"}
                            size={"md"}>
                            Filter
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverHeader>
                            Filter Results
                        </PopoverHeader>
                        <PopoverCloseButton />
                        <PopoverBody>
                            <Box>
                                Max Price
                                <MarkedSlider
                                    value={priceValue} onSliderChange={PriceManager}/>
                            </Box>
                            <br />
                            <Box>
                                Min Quantity
                                <MarkedSlider 
                                    value={quantityValue} onSliderChange={QuantityManager}/>
                            </Box>

                            <Button
                                mt={4} colorScheme="teal" onClick={onClose} ref={initRef}>
                                    Apply
                            </Button>

                        </PopoverBody>

                    </PopoverContent>
                </>
            )}
        </Popover>
    );
}

export default FilterButton;