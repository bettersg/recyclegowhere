import {
	Box,
	VStack,
	HStack,
	Spacer,
	Button,
	Text,
	Slider,
	SliderTrack,
	SliderFilledTrack,
	SliderThumb,
	Divider,
	CheckboxGroup,
	Checkbox,
	Stack,
} from "@chakra-ui/react";
import { XButton } from "./NearbyFacilitiesPanel";
import { COLORS } from "theme";
import { TItemSelection, TEmptyItem } from "app-context/SheetyContext/types";
import { OptionType } from "spa-pages";
import { ChangeEvent } from "react";

type FilterProps = {
	isMobile: boolean | undefined;
	setFilterShow: () => void;
	filterApply: () => void;
	handleSliderChange: (val: number) => void;
	range: number;
	itemState: (TItemSelection | TEmptyItem)[];
	selectOptions: OptionType[];
	handleCheckboxChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const FilterPanel = ({
	isMobile,
	setFilterShow,
	filterApply,
	handleSliderChange,
	range,
	itemState,
	selectOptions,
	handleCheckboxChange,
}: FilterProps) => {
	return (
		<Box
			position={"fixed"}
			height={isMobile ? "calc(92vh)" : "calc(90vh)"}
			width={"100vw"}
			bg="white"
			zIndex={99999}
			bottom={0}
			overflowY={"scroll"}
			overflowX={"hidden"}
		>
			<VStack p={7} w={"100vw"} gap={5}>
				<HStack w="100%" justify="space-between">
					<XButton onClick={setFilterShow} />
					<Spacer />
					<Button
						color={COLORS.white}
						bgColor={COLORS.Button.primary}
						onClick={filterApply}
					>
						Apply
					</Button>
				</HStack>

				<VStack w="100%">
					<Text w="100%" textAlign={"left"} fontWeight={"bold"}>
						Distance
					</Text>
					<HStack w="80%" justify="space-between">
						<Text>3km</Text>
						<Text>10km</Text>
					</HStack>
					<Slider
						min={30}
						max={100}
						w="80%"
						aria-label="slider-ex-1"
						defaultValue={range}
						onChangeEnd={(val) => handleSliderChange(val)}
					>
						<SliderTrack>
							<SliderFilledTrack />
						</SliderTrack>
						<SliderThumb />
					</Slider>
				</VStack>
				<Divider borderColor="gray.500" borderWidth="1px" />
				<VStack align="flex-start" w="100%">
					<Text textAlign={"left"} fontWeight={"bold"}>
						Items
					</Text>
					<CheckboxGroup
						colorScheme="blue"
						defaultValue={itemState.map((item) => item.name)}
					>
						<Stack pl={1} spacing={3} direction={"column"}>
							{selectOptions.map((item) => (
								<Checkbox
									onChange={(e) => handleCheckboxChange(e)}
									key={item.idx}
									data-key={item.idx}
									value={item.value}
									name={item.method}
								>
									{item.value}
								</Checkbox>
							))}
						</Stack>
					</CheckboxGroup>
				</VStack>
				{/* <VStack align="flex-start" w="100%">
					<Text textAlign={"left"} fontWeight={"bold"}>
						Types of Recycling Points
					</Text>
					<CheckboxGroup colorScheme="blue" defaultValue={[]}>
						<Stack pl={1} spacing={3} direction={"column"}>
							<Checkbox value="naruto">Test</Checkbox>
							<Checkbox value="sasuke">Test</Checkbox>
							<Checkbox value="kakashi">Test</Checkbox>
						</Stack>
					</CheckboxGroup>
				</VStack> */}
			</VStack>
		</Box>
	);
};

export default FilterPanel;
