import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
  } from '@chakra-ui/react'
import { Button, Flex, Heading, Spacer, Box, ButtonGroup } from "@chakra-ui/react";
import { ArrowBackIcon, SearchIcon, UpDownIcon } from "@chakra-ui/icons";
import { Dispatch, SetStateAction, useState, useRef} from "react";



function MarkedSlider() {

    const [sliderValue, setSliderValue] = useState(100);

    const changeMade = (val) => {
        setSliderValue(val.target.value);
    }
  
    const labelStyles = {
      mt: '2',
      ml: '-2.5',
      fontSize: 'sm',
    }
  
    return (
      <Box pt={6} pb={2}>
        <Slider
            defaultValue={sliderValue} onChange={(val) => setSliderValue(val)} colorScheme='teal'
            aria-label='slider-ex-6'>
          <SliderMark value={25} {...labelStyles}>
            25
          </SliderMark>
          <SliderMark value={50} {...labelStyles}>
            50
          </SliderMark>
          <SliderMark value={75} {...labelStyles}>
            75
          </SliderMark>
          <SliderMark
            value={sliderValue}
            textAlign='center'
            bg='teal'
            color='white'
            mt='-10'
            ml='-5'
            w='12'
          >
            {sliderValue}
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Box>
    )
  }

  export default MarkedSlider;