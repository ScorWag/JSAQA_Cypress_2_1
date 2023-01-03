const validLoginData = require("../../fixtures/valid_loginData_admin.json");
const invalidLoginData = require("../../fixtures/invalid_loginData_admin.json");
const selectors = require("../../fixtures/selectors.json");
const expectedText = require("../../fixtures/expectedText.json");

describe.only("Seances manager", () => {
  beforeEach(() => {
    cy.visit("http://qamid.tmweb.ru/admin");
    cy.contains("h2", expectedText.loginTitle).should("be.visible");
  });
  it("Should create the new hall", () => {
    const hallName = "3DMax";
    cy.login(validLoginData.email, validLoginData.password);
    cy.contains("h2", expectedText.firstHeaderOnAdminPage).should("be.visible");
    cy.contains("Создать зал").click();
    cy.contains("h2", expectedText.headerAddHallOnAdminPage).should(
      "be.visible"
    );
    cy.get(selectors.addHallInput).type(hallName);
    cy.contains("Добавить зал").click();
    cy.contains(hallName).should("be.visible");
    cy.get(`[data-hall-name=${hallName}]`).click();
    cy.contains("Удалить").click();
    cy.contains(hallName).should("not.be.exist");
  });
});
