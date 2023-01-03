const seats = require("../../fixtures/seats.json");
const selectors = require("../../fixtures/selectors.json");
const expectedText = require("../../fixtures/expectedText.json");
const movieName = "Логан";
const movieDescription = "Россомаха";
const movieDurationAndCountry = "90 мин. США";

describe("Added content", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(selectors.navigationPanel)
      .should("be.visible")
      .and("have.length", 7);
  });

  it("Should added movie be exist", () => {
    cy.contains(movieName).should("be.exist");
    cy.contains(movieDescription).should("be.exist");
    cy.contains(movieDurationAndCountry).should("be.exist");
  });
});
