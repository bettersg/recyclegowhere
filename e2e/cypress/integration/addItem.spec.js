/// <reference types="Cypress" />

import faker from "faker"; 

const URL = "/recycle-and-reuse";
const ITEMS = Object.freeze(["Newspaper", "Slippers"]);

describe("Add Recycle Item", () => {
  it("can choose 1 existing item", () => {
    const item = faker.random.arrayElement(ITEMS);
    cy.visit(URL);
    cy.findByRole("combobox").type(`${item}{enter}`);
    cy.findByRole("combobox").should("have.value", "");
  });

  it("can choose some existing items", () => {
    cy.visit(URL);

    ITEMS.forEach(item => {
      cy.findByRole("combobox").type(`${item}{enter}`);
      cy.findByRole("combobox").should("have.value", "");
    })
  });

  it("cannot choose non-existing item", () => {
    const item = faker.name.findName();
    cy.visit(URL);
    cy.findByRole("combobox").type(`${item}{enter}`);
    cy.findByRole("combobox").should("have.value", item);
  });
});
