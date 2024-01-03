import { AddIcon, CloseIcon, SmallCloseIcon } from "@chakra-ui/icons";
import {
	Button,
	ButtonGroup,
	Flex,
	HStack,
	IconButton,
	Select,
	Text,
	VStack,
} from "@chakra-ui/react";
import { Methods } from "api/sheety/enums";
import { TEmptyItem, TItemSelection } from "app-context/SheetyContext/types";
import { useSheetyData } from "hooks/useSheetyData";
import { useUserInputs } from "hooks/useUserSelection";
import { ChangeEvent, MouseEventHandler, useCallback } from "react";
import styled from "styled-components";
import { COLORS } from "theme";
import { displayTitleCase } from "./utils";

const emptyItem: TEmptyItem = {
	name: "",
	method: undefined,
};

export const Items = () => {
	const { items, setUserSelection } = useUserInputs();
	const { items: iList, categories } = useSheetyData();
	const itemList = iList.sort((a, b) => {
		// Convert to uppercase for case-insensitive comparison
		const nameA = a.name.toUpperCase();
		const nameB = b.name.toUpperCase();

		if (nameA < nameB) {
			return -1;
		}
		if (nameA > nameB) {
			return 1;
		}
		return 0;
	});

	const getValidMethods = useCallback(
		(itemName: string) => {
			const item = itemList.find((i) => i.name === itemName);
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const category = categories!.find((c) => c.itemCategories === item!.category);
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			return category?.methods || [];
			// TODO: does not work for GENERAL_WASTE
		},
		[categories, itemList],
	);

	// =========================================================================
	// Change handlers
	// =========================================================================
	const handleUpdateItem = useCallback(
		(type: keyof Pick<TItemSelection, "name" | "method">, index: number, value: string) => {
			const _items = [...items];
			const _item = { ..._items[index] };
			/* this is so that typescript doesn't complain */
			if (type === "method") {
				_item[type] = value as Methods;
			} else {
				_item[type] = value;
				_item["method"] = undefined;
			}
			_items[index] = _item;
			setUserSelection(_items);
		},
		[items, setUserSelection],
	);

	const handleAddItem = useCallback(() => {
		const a = [...items, emptyItem];
		setUserSelection(a);
	}, [items, setUserSelection]);

	const handleRemoveItem = useCallback(
		(index: number) => {
			const _items = [...items];
			_items.splice(index, 1);
			setUserSelection(_items);
		},
		[items, setUserSelection],
	);

	const handleClearAll = useCallback(() => {
		setUserSelection([emptyItem]);
	}, [setUserSelection]);

	return (
		<div>
			<Flex justifyContent="space-between" mb="8px">
				<Text verticalAlign="center" fontWeight={500} fontSize="md">
					Items you wish to recycle:
				</Text>
				<ClearAllButton onClick={handleClearAll} />
			</Flex>
			<VStack spacing="10px">
				{items.map((item, index) => (
					<HStack key={`item-${index}`} spacing="6px" width="100%">
						<StyledSelect
							placeholder="Item"
							color={item.name ? COLORS.Select.body : COLORS.Input.placeholder}
							iconColor={COLORS.Select.icon}
							value={item.name}
							onChange={(e: ChangeEvent<HTMLInputElement>) => {
								e.target.value && handleUpdateItem("name", index, e.target.value);
							}}
						>
							{itemList.map((item) => (
								<option key={item["s/n"]} value={item.name}>
									{item.name}
								</option>
							))}
						</StyledSelect>
						<StyledSelect
							flexShrink={1.5}
							placeholder="Method"
							color={item.method ? COLORS.Select.body : COLORS.Select.placeholder}
							iconColor={COLORS.Select.icon}
							value={item.method ? item.method : "Method"}
							onChange={(e: ChangeEvent<HTMLInputElement>) => {
								e.target.value && handleUpdateItem("method", index, e.target.value);
							}}
						>
							{item.name &&
								getValidMethods(item.name).map((method) => (
									<option key={method} value={method}>
										{displayTitleCase(method)}
									</option>
								))}
						</StyledSelect>
						{index === 0 ? (
							<AddLineButton onClick={handleAddItem} />
						) : (
							<RemoveLineButton
								onClick={() => {
									handleRemoveItem(index);
								}}
							/>
						)}
					</HStack>
				))}
			</VStack>
		</div>
	);
};

const StyledSelect = styled(Select)`
	> option:first-child {
		color: var(--chakra-colors-select-placeholder);
	}
	> option:not(:first-child) {
		color: var(--chakra-colors-chakra-body-text);
	}
`;

interface ButtonProps {
	onClick: MouseEventHandler<HTMLButtonElement>;
}
const RemoveLineButton = ({ onClick }: ButtonProps) => (
	<IconButton
		variant="solid"
		color={COLORS.gray[700]}
		background={COLORS.gray[100]}
		aria-label="remove line"
		icon={<CloseIcon boxSize="3" />}
		onClick={onClick}
	/>
);
const AddLineButton = ({ onClick }: ButtonProps) => (
	<IconButton
		variant="solid"
		color={COLORS.gray[700]}
		background={COLORS.gray[100]}
		aria-label="add line"
		icon={<AddIcon />}
		onClick={onClick}
	/>
);
const ClearAllButton = ({ onClick }: ButtonProps) => (
	<ButtonGroup isAttached size="xs">
		<Button
			size="xs"
			variant="solid"
			color={COLORS.gray[700]}
			background={COLORS.gray[100]}
			aria-label="clear all"
			onClick={onClick}
			leftIcon={<SmallCloseIcon />}
		>
			Clear all
		</Button>
	</ButtonGroup>
);
