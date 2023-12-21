import { Flex, theme, useDisclosure } from "@chakra-ui/react";
import { TEmptyItem, TItemSelection } from "app-context/SheetyContext/types";
import FilterButton from "./filterPopover";
import { SelectAndFilterBar, SelectedItemChips } from "spa-pages";

type Props = {
	items: (TItemSelection | TEmptyItem)[];
};

const ItemsAndFilterRow = ({ items }: Props) => {
	const colors = theme.colors;

	const { isOpen: isFilterOpen, onOpen: onFilterOpen, onClose: onFilterClose } = useDisclosure();

	return (
		<Flex px={4}>
			<Flex
				justifyContent="space-between"
				flexGrow={1}
				border="1px"
				borderColor={colors.gray[200]}
				borderRadius="md"
			>
				<SelectAndFilterBar
					selectedOptions={items.map((item, idx) => ({
						label: item.name,
						value: item.name,
						method: item.method,
						idx,
					}))}
					onMultiSelectChange={() => void 0}
					selectOptions={items.map((item, idx) => ({
						label: item.name,
						value: item.name,
						method: item.method,
						idx,
					}))}
					onFilterOpen={onFilterOpen}
				/>
			</Flex>
			<FilterButton items={items} isOpen={isFilterOpen} onClose={onFilterClose} />
		</Flex>
	);
};

export default ItemsAndFilterRow;
