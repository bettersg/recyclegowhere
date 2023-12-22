import {
	Box,
	HStack,
	Text,
	Slider,
	SliderTrack,
	SliderFilledTrack,
	SliderThumb,
	Modal,
	ModalContent,
	ModalOverlay,
	Divider,
	Button,
	Flex,
	useCheckbox,
	chakra,
	CheckboxProps,
	useCheckboxGroup,
	Spacer,
	useRadio,
	UseRadioProps,
	useRadioGroup,
} from "@chakra-ui/react";
import { COLORS } from "theme";
import { TItemSelection, TEmptyItem } from "app-context/SheetyContext/types";
import { OptionType } from "spa-pages";
import React, { ChangeEvent, PropsWithChildren } from "react";
import { Methods } from "api/sheety/enums";
import { useSheetyData } from "hooks/useSheetyData";

type FilterProps = {
	isOpen: boolean;
	filterApply: () => void;
	handleSliderChange: (val: number) => void;
	range: number;
	itemState: (TItemSelection | TEmptyItem)[];
	selectOptions: OptionType[];
	handleCheckboxChange: (e: ChangeEvent<HTMLInputElement>) => void;
	selectAllItems: () => void;
};

export const FilterPanel = ({
	isOpen,
	filterApply,
	handleSliderChange,
	range,
	itemState,
	selectOptions,
	handleCheckboxChange,
	selectAllItems,
}: FilterProps) => {
	const selectedOptionsWithCheckedState = selectOptions.map((option) => {
		const isChecked = itemState.some(
			(item) => item.name === option.value && item.method === option.method,
		);
		return { ...option, isChecked };
	});

	return (
		<Modal isOpen={isOpen} onClose={() => undefined}>
			<ModalOverlay />
			<ModalContent maxWidth="calc(768px - 32px)" marginTop="140px" marginInline="4">
				<FilterSection
					title="Your items"
					button={
						<Button
							size="sm"
							color="white"
							bgColor={COLORS.Button.primary}
							onClick={filterApply}
						>
							Apply
						</Button>
					}
				>
					<CheckboxGroup
						items={selectedOptionsWithCheckedState}
						onChange={handleCheckboxChange}
						onSelectAll={selectAllItems}
					/>
				</FilterSection>

				{/* Implementation still in consideration... */}
				{/* <FilterSection title="Sort by">
					<ChipRadioGroup items={["Nearest", "Most items"]} />
				</FilterSection> */}

				<FilterSection title="Max Distance" hideDivider={true}>
					<HStack justify="space-between">
						<Text>3km</Text>
						<Text>10km</Text>
					</HStack>
					<Slider
						min={30}
						max={100}
						aria-label="slider-ex-1"
						defaultValue={range}
						onChangeEnd={(val) => handleSliderChange(val)}
					>
						<SliderTrack>
							<SliderFilledTrack background="#31979566" />
						</SliderTrack>
						<SliderThumb background={COLORS.Button.primary} />
					</Slider>
				</FilterSection>
			</ModalContent>
		</Modal>
	);
};

export function FilterSection({
	title,
	hideDivider,
	button,
	children,
}: React.PropsWithChildren<{ title: string; hideDivider?: boolean; button?: JSX.Element }>) {
	return (
		<Box w="100%" p={2} pb={0}>
			<HStack justify="space-between" mb={3}>
				<Text fontWeight={"bold"}>{title}</Text>
				{button}
			</HStack>
			{children}
			{hideDivider ? (
				<Spacer mb={4} />
			) : (
				<Divider background="gray.200" h="1px" marginBlock={4} />
			)}
		</Box>
	);
}

export const CheckboxGroup = ({
	items,
	onChange,
	onSelectAll,
}: {
	items: Array<{
		value: string;
		method?: Methods;
		isChecked: boolean;
	}>;
	onChange: (item: any) => void;
	onSelectAll: () => void;
}) => {
	const { getCheckboxProps } = useCheckboxGroup({
		value: items.filter((item) => item.isChecked).map((item) => item.value),
	});

	return (
		<Flex flex={1} gap={2} flexWrap="wrap" maxH="70px" overflow="auto" alignItems="center">
			{items.map((item) => (
				<ChipCheckbox
					key={item.value}
					{...getCheckboxProps({
						value: item.value,
						name: item.method,
					})}
					onChange={onChange}
				/>
			))}
			<Text
				color="black"
				fontSize="12px"
				fontWeight="bold"
				cursor="pointer"
				onClick={onSelectAll}
			>
				Select All
			</Text>
		</Flex>
	);
};

const ChipCheckbox = (props: CheckboxProps) => {
	const { state, getInputProps, htmlProps } = useCheckbox(props);

	return (
		<chakra.label {...htmlProps}>
			<input {...getInputProps()} hidden />
			<Chip value={props.value as string} isChecked={state.isChecked}>
				{props.value}
			</Chip>
		</chakra.label>
	);
};

const ChipRadioGroup = ({ items }: { items: Array<string> }) => {
	const { getRootProps, getRadioProps } = useRadioGroup({
		name: "sortBy",
		defaultValue: "Nearest",
	});

	const group = getRootProps();

	return (
		<HStack {...group}>
			{items.map((value) => {
				const radio = getRadioProps({ value });
				return (
					<ChipRadio key={value} {...radio}>
						{value}
					</ChipRadio>
				);
			})}
		</HStack>
	);
};

const ChipRadio = (props: PropsWithChildren<UseRadioProps>) => {
	const { getInputProps, getRadioProps, state } = useRadio(props);

	const input = getInputProps();

	return (
		<Box as="label">
			<input {...input} />
			<Chip isChecked={state.isChecked} darkBackground={true}>
				{props.children}
			</Chip>
		</Box>
	);
};

export const Chip = ({
	value,
	children,
	isChecked,
	darkBackground,
}: React.PropsWithChildren<{ isChecked: boolean; darkBackground?: boolean; value?: string }>) => {
	const selectedColor = darkBackground ? "teal.500" : "teal.50";
	const selectedTextColor = darkBackground ? "white" : "black";
	const { getItemCategory } = useSheetyData();
	const category = getItemCategory(value as string);
	return (
		<Flex
			align="center"
			bg="white"
			borderRadius="full"
			paddingX="10px"
			paddingY="5px"
			background={isChecked ? selectedColor : "white"}
			color={selectedTextColor && isChecked ? selectedTextColor : "black"}
			border="1px solid #D6EAEA"
			cursor="pointer"
			whiteSpace="nowrap"
		>
			{category && (
				<img
					src={`/icons/${category}.png`}
					alt={`${category} icon`}
					style={{ width: "15px", height: "15px", marginRight: "8px" }}
				/>
			)}
			<Text fontSize="12px">{children}</Text>
		</Flex>
	);
};
