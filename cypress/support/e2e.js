// Runs before every Cypress test

Cypress.Commands.add('login', (username = 'standard_user', password = 'secret_sauce') => {
  cy.visit('/');
  cy.get('[data-test="username"]').type(username);
  cy.get('[data-test="password"]').type(password);
  cy.get('[data-test="login-button"]').click();
});

Cypress.Commands.add('addToCart', (productName) => {
  cy.get('.inventory_item')
    .contains(productName)
    .closest('.inventory_item')
    .find('button')
    .click();
});