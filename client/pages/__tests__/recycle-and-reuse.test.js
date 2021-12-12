import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RecycleAndReuse from "../recycle-and-reuse";
import { options } from "../../../mockData/data";

describe("RecycleAndReuse", () => {
  it("renders 3 tabs", () => {
    const tabNames = ["Add Item", "Item List", "Dispose Items"];

    render(<RecycleAndReuse options={options} />);

    tabNames.forEach((name) => {
      const tab = screen.getByRole("tab", { name });
      expect(tab).toBeInTheDocument();
    });

    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(tabNames.length);
  });

  it("starts with 1 enabled", () => {
    const tabs = [
      { name: "Add Item", enabled: true },
      { name: "Item List", enabled: false },
      { name: "Dispose Items", enabled: false },
    ];

    render(<RecycleAndReuse options={options} />);

    tabs.forEach((tab) => {
      const element = screen.getByRole("tab", { name: tab.name })
      if (tab.enabled) {
        expect(element).toBeEnabled();
      } else {
        expect(element).toBeDisabled();
      }
    });
  });

  it("has all 3 enabled with valid item", () => {
    const tabs = [
      { name: "Add Item", enabled: true },
      { name: "Item List", enabled: true },
      { name: "Dispose Items", enabled: true },
    ];
    const item = "Newspaper";

    render(<RecycleAndReuse options={options} />);
    userEvent.type(screen.getByRole("combobox"), `${item}{enter}`);

    tabs.forEach((tab) => {
      const element = screen.getByRole("tab", { name: tab.name });
      if (tab.enabled) {
        expect(element).toBeEnabled();
      } else {
        expect(element).toBeDisabled();
      }
    });
  });
});
