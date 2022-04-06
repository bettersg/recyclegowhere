import { Button, Flex, Text, Alert, AlertIcon } from "@chakra-ui/react";
import React from "react";
import Select from "react-select";

import { selectStylesForColorModes } from "../../../DarkModeSwitch";

const AddItemMultiSelect = ({ data, setItems, openDialog }) => {
	const [selectedOptions, setSelectedOptions] = React.useState([]);

	const options = parseItemsIntoOptions(data.items);

	const handleChange = (event) => {
		setSelectedOptions(event);
	};

	const getSelectedItems = (selectedElements) => {
		const selectedItems = [];
		for (const selected of selectedElements) {
			if (selected.nodeName === "INPUT" && selected.name === "items") {
				const selectedItem = data.items.filter(
					(item) => item.id === parseInt(selected.value),
				);
				selectedItems.push(selectedItem[0]);
			}
		}
		return selectedItems;
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const selectedItems = getSelectedItems(event.target.elements);
		setItems(selectedItems);
		openDialog();
	};

	return (
		<form onSubmit={handleSubmit} style={{ width: "100%" }}>
			{!!selectedOptions && selectedOptions.length ? (
				<Alert size="1rem" mb="1rem" status="success">
					<AlertIcon />
					Please feel free to select more than one item from the list.
				</Alert>
			) : null}
			<Select
				isMulti
				closeMenuOnSelect={false}
				name="items"
				options={options}
				className="basic-multi-select"
				classNamePrefix="select"
				instanceId="postType"
				onChange={handleChange}
				styles={selectStylesForColorModes}
			/>
			<Flex
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
			>
				<Text fontWeight="lighter" textAlign="left" width="100%" mt="2">
					Let us know if your item is{" "}
					<a href="https://better-sg.typeform.com/to/wIiJlLKe" target="_blank" rel="noreferrer">
						<Text as="u">not in our list.</Text>
					</a>
				</Text>
				<Button
					backgroundColor="#319795"
					color="white"
					mt="11%"
					type="submit"
					isDisabled={selectedOptions.length === 0}
				>
					Submit
				</Button>
			</Flex>
		</form>
	);
};

export default AddItemMultiSelect;

const parseItemsIntoOptions = (items) => {
	const categories = [];
	const itemsGroupedByCategory = items.reduce((accumulator, item) => {
		let itemCategory = item.category;
		if (!accumulator[itemCategory]) {
			accumulator[itemCategory] = [];
			categories.push(itemCategory);
		}
		accumulator[itemCategory].push(item);
		return accumulator;
	}, {});

	return categories.map((category) => {
		const itemsInCategory = itemsGroupedByCategory[category];
		const itemOptions = itemsInCategory.map((itemInCategory) => {
			const option = {
				label: itemInCategory.description,
				value: itemInCategory.id,
			};
			return option;
		});

		const categoryOptions = {
			label: category,
			options: itemOptions,
		};
		return categoryOptions;
	});
};
