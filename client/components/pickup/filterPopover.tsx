import { Button, Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { useState, useEffect, ChangeEvent } from "react";
import MarkedSlider from "./slider";
import { CheckboxGroup, FilterSection } from "components/map";
import { COLORS } from "theme";
import { TEmptyItem, TItemSelection } from "app-context/SheetyContext/types";
import { OptionType } from "spa-pages";

const FilterButton = ({
	isOpen,
	onClose,
	handleCheckboxChange,
	selectAllItems,
	selectOptions,
	itemState,
}: {
	isOpen: boolean;
	onClose: () => void;
	handleCheckboxChange: (e: ChangeEvent<HTMLInputElement>) => void;
	selectAllItems: () => void;
	itemState: (TItemSelection | TEmptyItem)[];
	selectOptions: OptionType[];
}) => {
	const [modalTop, setModalTop] = useState(265);

	useEffect(() => {
		const handleScroll = () => {
			// Update the modal top position based on the scroll position
			setModalTop(265 - window.scrollY);
		};

		// Attach the scroll event listener
		window.addEventListener("scroll", handleScroll);

		// Cleanup function to remove the event listener when the component unmounts
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const [priceValue, setPriceValue] = useState(100);
	const [quantityValue, setQuantityValue] = useState(100);

	const PriceManager = (val: number) => {
		setPriceValue(val);
	};
	const QuantityManager = (val: number) => {
		setQuantityValue(val);
	};

	const selectedOptionsWithCheckedState = selectOptions.map((option) => {
		const isChecked = itemState.some(
			(item) => item.name === option.value && item.method === option.method,
		);
		return { ...option, isChecked };
	});

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent
				position={"fixed"}
				maxWidth="calc(768px - 32px)"
				top={`${modalTop}px`}
				marginBottom={0}
				marginRight={3}
			>
				<FilterSection
					title="Your items"
					button={
						<Button
							size="sm"
							color="white"
							bgColor={COLORS.Button.primary}
							onClick={onClose}
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

				<FilterSection title="Min Quantity">
					<MarkedSlider value={quantityValue} onSliderChange={QuantityManager} />{" "}
				</FilterSection>

				<FilterSection title="Max Price" hideDivider={true}>
					<MarkedSlider value={priceValue} onSliderChange={PriceManager} />
				</FilterSection>
			</ModalContent>
		</Modal>
	);
};

export default FilterButton;
