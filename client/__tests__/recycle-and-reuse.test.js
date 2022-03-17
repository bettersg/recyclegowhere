import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RecycleAndReuse from "../pages/recycle-and-reuse";
import { options } from "../../mockData/data";
// import {describe, expect} from '@jest/globals';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";

const theme = extendTheme({
	components: {
		Steps,
	},
});

describe("RecycleAndReuse", () => {
	// it("can render", () => {
	// 	render(
	// 		<ChakraProvider theme={theme}>
	// 			<RecycleAndReuse
	// 				data={{
	// 					items: [],
	// 					generalWasteItemDetails: [],
	// 				}}
	// 			/>
	// 			,
	// 		</ChakraProvider>,
	// 	);
	// });

	const { getAllByTestId } = render(
		<ChakraProvider theme={theme}>
			<RecycleAndReuse
				data={{
					items: [],
					generalWasteItemDetails: [],
				}}
			/>
			,
		</ChakraProvider>,
	);
	const tabs = getAllByTestId("tab");
	it("renders 4 tabs", () => {
		// const tabNames = ["Add Item", "Item List", "Dispose Items"];

		// tabNames.forEach((name) => {
		// 	const tab = getAllByTestId("tab", { name });
		// 	expect(tab).toBeInTheDocument();
		// });

		// tabs are add item, verify item, action, confirmation
		expect(tabs).toHaveLength(4);
	});

	it("starts with 1 enabled", () => {
		expect(tabs[0].attributes.getNamedItem("aria-disabled").value).toBe(
			"false",
		);
		for (let index = 1; index <= 3; index++) {
			expect(
				tabs[index].attributes.getNamedItem("aria-disabled").value,
			).toBe("true");
		}
	});

	// it("has all 3 enabled with valid item", () => {
	// 	const tabs = [
	// 		{ name: "Add Item", enabled: true },
	// 		{ name: "Item List", enabled: true },
	// 		{ name: "Dispose Items", enabled: true },
	// 	];
	// 	const item = "Newspaper";
	// 	render(
	// 		<ChakraProvider theme={theme}>
	// 			<RecycleAndReuse
	// 				data={{
	// 					items: [],
	// 					generalWasteItemDetails: [],
	// 				}}
	// 			/>
	// 			,
	// 		</ChakraProvider>,
	// 	);
	// 	userEvent.type(screen.getByRole("combobox"), `${item}{enter}`);

	// 	tabs.forEach((tab) => {
	// 		const element = screen.getByRole("tab", { name: tab.name });
	// 		if (tab.enabled) {
	// 			expect(element).toBeEnabled();
	// 		} else {
	// 			expect(element).toBeDisabled();
	// 		}
	// 	});
	// });
});
