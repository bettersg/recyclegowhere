/// <reference types="Cypress" />

import faker from "faker";

const URL = "/recycle-and-reuse";
const ITEMS = Object.freeze(["Newspaper", "Slippers"]);

describe("Active Tabs", () => {
  it("starts with only 1 tab enabled", () => {
    const tabs = [
      { name: "Add Item", should: "be.enabled" },
      { name: "Item List", should: "be.disabled" },
      { name: "Dispose Items", should: "be.disabled" },
    ];

    cy.visit(URL);
    tabs.forEach((tab) => {
      cy.findByRole("tab", { name: tab.name }).should(tab.should);
    });
  });

  it("has all tabs enabled after entering valid item", () => {
    const item = faker.random.arrayElement(ITEMS);
    const tabs = [
      { name: "Add Item", should: "be.enabled" },
      { name: "Item List", should: "be.enabled" },
      { name: "Dispose Items", should: "be.enabled" },
    ];

    cy.visit(URL);
    cy.findByRole("combobox").type(`${item}{enter}`);
    tabs.forEach((tab) => {
      cy.findByRole("tab", { name: tab.name }).should(tab.should);
    });
  });
});
