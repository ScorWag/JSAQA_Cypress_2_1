const selectors = require("../fixtures/selectors.json");

Cypress.Commands.add("login", (email, password) => {
  cy.get(selectors.loginInput).type(email);
  cy.get(selectors.passwordInput).type(password);
  cy.get("form").submit();
});

Cypress.Commands.add("selectSeats", (seats) => {
  seats.forEach((seat) => {
    cy.get(
      `.buying-scheme__row:nth-child(${seat.row})>.buying-scheme__chair:nth-child(${seat.seat})`
    ).click();
  });
  cy.get(selectors.selectSeatsButton).click();
  cy.get(selectors.ticketCheckTitle).should("be.visible");
});

Cypress.Commands.add("getSeatsInfo", (seats) => {
  let seatsInfo = "";
  for (let i = 0; i < seats.length; i++) {
    if (seats.length === i + 1) {
      seatsInfo += seats[i].row + "/" + seats[i].seat;
    } else {
      seatsInfo += seats[i].row + "/" + seats[i].seat + ", ";
    }
  }
  return seatsInfo;
});
