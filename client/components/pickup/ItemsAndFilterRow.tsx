import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { Flex, theme, useDisclosure } from "@chakra-ui/react";
import { TEmptyItem, TItemSelection } from "app-context/SheetyContext/types";
import FilterButton from "./filterPopover";
import { SelectAndFilterBar, multiselectOnChange, OptionType, checkboxChange } from "spa-pages";
import { ActionMeta, MultiValue } from "react-select";
import { OrgProps } from "spa-pages";

type Props = {
	items: (TItemSelection | TEmptyItem)[];
	setOrgs: Dispatch<SetStateAction<OrgProps[]>>;
	sortPickups: (itemEntry: (TItemSelection | TEmptyItem)[]) => OrgProps[];
};

const ItemsAndFilterRow = ({ items, setOrgs, sortPickups }: Props) => {
	const colors = theme.colors;

	// Multiselect Box
	const selectOptions: OptionType[] = items.map((item, index) => ({
		value: item.name,
		label: item.name,
		method: item.method,
		idx: index,
	}));

	const [itemState, setItemState] = useState<(TItemSelection | TEmptyItem)[]>(items);
	const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([...selectOptions]);

	const { isOpen: isFilterOpen, onOpen: onFilterOpen, onClose: onFilterClose } = useDisclosure();

	const handleMultiselectOnChange = (
		newValue: MultiValue<OptionType>,
		actionMeta: ActionMeta<OptionType>,
	) => {
		const { updatedOptions, updatedItemState } = multiselectOnChange(
			newValue,
			actionMeta,
			itemState,
			selectedOptions,
		);
		setSelectedOptions(updatedOptions);
		setItemState(updatedItemState);
		setOrgs(sortPickups(updatedItemState));
	};

	// Handle changes in items selected in the Filter panel
	const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { updatedItemState, updatedOptions } = checkboxChange(e, itemState, selectedOptions);
		setSelectedOptions(updatedOptions);
		setItemState(updatedItemState);
		setOrgs(sortPickups(updatedItemState));
	};

	const selectAllItems = () => {
		const selectOptions: OptionType[] = items.map((item, index) => ({
			value: item.name,
			label: item.name,
			method: item.method,
			idx: index,
		}));
		const itemState = items.map((item) => ({
			name: item.name,
			method: item.method,
		}));

		setItemState(itemState);
		setSelectedOptions(selectOptions);
		setOrgs(sortPickups(itemState));
	};

	return (
		<Flex>
			<Flex
				justifyContent="space-between"
				flexGrow={1}
				border="1px"
				borderColor={colors.gray[200]}
				borderRadius="md"
			>
				<SelectAndFilterBar
					selectedOptions={selectedOptions}
					onMultiSelectChange={handleMultiselectOnChange}
					selectOptions={selectOptions}
					onFilterOpen={onFilterOpen}
					enableBoxShadow={false}
				/>
			</Flex>
			{/* Filter Panel */}
			<FilterButton
				isOpen={isFilterOpen}
				onClose={onFilterClose}
				handleCheckboxChange={handleCheckboxChange}
				selectAllItems={selectAllItems}
				itemState={itemState}
				selectOptions={selectOptions}
			/>
		</Flex>
	);
};

export default ItemsAndFilterRow;
