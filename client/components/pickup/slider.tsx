import { Slider, SliderTrack, SliderFilledTrack, SliderThumb, SliderMark } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { COLORS } from "theme";

interface MarkedSliderProps {
	value: number;
	onSliderChange: (val: number) => void;
}

const MarkedSlider: React.FC<MarkedSliderProps> = ({ value, onSliderChange }) => {
	const [sliderValue, setSliderValue] = useState(value);

	const labelStyles = {
		mt: "2",
		ml: "-2.5",
		fontSize: "sm",
	};
	return (
		<Box pt={6} pb={2} px={5}>
			<Slider
				isDisabled={true}
				defaultValue={sliderValue}
				onChange={(val) => setSliderValue(val)}
				colorScheme="teal"
				aria-label="slider-ex-6"
			>
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
					textAlign="center"
					bg="teal"
					color="white"
					mt="-10"
					ml="-5"
					w="12"
				>
					{sliderValue}
				</SliderMark>
				<SliderTrack>
					<SliderFilledTrack background="#31979566" />
				</SliderTrack>
				<SliderThumb background={COLORS.Button.primary} />
			</Slider>
		</Box>
	);
};

export default MarkedSlider;
