const validLoginData = require("../../fixtures/valid_loginData_admin.json");
const invalidLoginData = require("../../fixtures/invalid_loginData_admin.json");
const selectors = require("../../fixtures/selectors.json");
const expectedText = require("../../fixtures/expectedText.json");

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
