const validLoginData = require("../fixtures/valid_loginData_admin.json");
const invalidLoginData = require("../fixtures/invalid_loginData_admin.json");
const seats = require("../fixtures/seats.json");
const selectors = require("../fixtures/selectors.json");
const expectedText = require("../fixtures/expectedText.json");
const testMovie = "Логан";

describe("Login to admin page", () => {
  beforeEach(() => {
    cy.visit("http://qamid.tmweb.ru/admin");
    cy.contains("h2", expectedText.loginTitle).should("be.visible");
  });
  it("Should have admin text on admin page", () => {
    cy.get(selectors.adminPageSubtitle).should(
      "have.text",
      expectedText.adminPageTitle
    );
  });
  it("Should login with valid login data", () => {
    cy.login(validLoginData.email, validLoginData.password);
    cy.contains("h2", expectedText.firstHeaderOnAdminPage).should("be.visible");
  });
  it("Should not login with invalid login data", () => {
    cy.login(invalidLoginData.email, invalidLoginData.password);
    cy.contains(expectedText.loginError).should("exist");
  });
});

describe("cinema ticket booking tests", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(selectors.navigationPanel)
      .should("be.visible")
      .and("have.length", 7);
  });

  it("Should one seat order", () => {
    const seat = { row: 3, seat: 9 };
    cy.get(selectors.selectedDay).click();
    cy.contains("h2", testMovie).parents(".movie").contains("19:00").click();
    cy.selectSeats([seat]);
    cy.get(selectors.bookingButton).click();
    cy.get(selectors.seatsInfo).should("have.text", `${seat.row}/${seat.seat}`);
    cy.get(selectors.suuccesBookingInfo).should(
      "have.text",
      expectedText.succesBooking
    );
  });

  it("Should some seats order", () => {
    cy.get(selectors.selectedDay).click();
    cy.contains("h2", testMovie).parents(".movie").contains("19:00").click();
    cy.selectSeats(seats);
    cy.get(selectors.bookingButton).click();
    cy.getSeatsInfo(seats).then((expectedSeatsInfo) => {
      cy.get(selectors.seatsInfo).should("have.text", expectedSeatsInfo);
    });
    cy.get(selectors.suuccesBookingInfo).should(
      "have.text",
      expectedText.succesBooking
    );
  });
});
