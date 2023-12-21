import { Button, Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { useState, useRef } from "react";
import MarkedSlider from "./slider";
import { BsFilter } from "react-icons/bs";
import { Icon } from "@chakra-ui/icons";
import { CheckboxGroup, FilterSection } from "components/map";
import { COLORS } from "theme";
import { TEmptyItem, TItemSelection } from "app-context/SheetyContext/types";

const FilterButton = ({
	isOpen,
	onClose,
	items,
}: {
	isOpen: boolean;
	onClose: () => void;
	items: (TItemSelection | TEmptyItem)[];
}) => {
	const initRef = useRef<HTMLElement | null>(null); // Specify the correct type for initRef

	const [priceValue, setPriceValue] = useState(100);
	const [quantityValue, setQuantityValue] = useState(0);

	const PriceManager = (val: number) => {
		setPriceValue(val);
	};
	const QuantityManager = (val: number) => {
		setQuantityValue(val);
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent maxWidth="calc(768px - 32px)" marginTop="330px" marginInline="4">
				<FilterSection
					title="Your items"
					button={
						<Button size="sm" color="white" bgColor={COLORS.Button.primary}>
							Apply
						</Button>
					}
				>
					<CheckboxGroup
						items={items.map((item) => ({
							isChecked: true,
							value: item.name,
							method: item.method,
						}))}
						onChange={() => {
							return void 0;
						}}
						onSelectAll={() => {
							return void 0;
						}}
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
