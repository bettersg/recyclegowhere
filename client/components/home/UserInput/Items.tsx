import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { HStack, IconButton, Input, Select, Text, VStack } from "@chakra-ui/react";
import { ChangeEvent, MouseEventHandler, useCallback } from "react";
import styled from "styled-components";
import { COLORS } from "theme";
import { TItems } from "../types";

interface ItemProps {
	items: TItems[];
	handleUpdateItem: (
		type: keyof Pick<TItems, "name" | "condition">,
		index: number,
		value: string,
	) => void;
	handleAddItem: () => void;
	handleRemoveItem: (index: number) => void;
}
export const Items = ({ items, handleUpdateItem, handleAddItem, handleRemoveItem }: ItemProps) => {
	const isLastItem = useCallback(
		(index: number) => {
			return index === items.length - 1;
		},
		[items.length],
	);
	return (
		<div>
			<Text fontWeight={500} fontSize="md" mb="8px">
				Items you wish to recycle:
			</Text>
			<VStack spacing="10px">
				{items.map((item, index) => (
					<HStack key={`item-${index}`} spacing="6px" width="100%">
						<Input
							placeholder="Item"
							_placeholder={{ color: COLORS.Input.placeholder }}
							value={item.name}
							onChange={(e) => {
								handleUpdateItem("name", index, e.target.value);
							}}
						/>
						<StyledSelect
							flexShrink={1.5}
							placeholder="Condition"
							color={item.condition ? "chakra-body-text" : COLORS.Select.placeholder}
							iconColor={COLORS.Select.icon}
							value={item.condition}
							onChange={(e: ChangeEvent<HTMLInputElement>) => {
								handleUpdateItem("condition", index, e.target.value);
							}}
						>
							<option value="option1">Option 1</option>
							<option value="option2">Option 2</option>
							<option value="option3">Option 3</option>
						</StyledSelect>
						{isLastItem(index) ? (
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
	> option:first-of-type {
		color: var(--chakra-colors-select-placeholder);
	}
	> option:not(:first-of-type) {
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
