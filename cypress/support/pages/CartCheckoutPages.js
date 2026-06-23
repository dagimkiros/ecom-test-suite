export class CartPage {
  assertOnCartPage() {
    cy.get('.title').should('have.text', 'Your Cart');
  }

  getCartItems() {
    return cy.get('.cart_item');
  }

  getCartItemNames() {
    return cy.get('.inventory_item_name');
  }

  removeItem(productName) {
    cy.get('.cart_item')
      .contains(productName)
      .closest('.cart_item')
      .find('button')
      .click();
  }

  continueShopping() {
    cy.get('[data-test="continue-shopping"]').click();
  }

  proceedToCheckout() {
    cy.get('[data-test="checkout"]').click();
  }
}

export class CheckoutPage {
  fillShippingInfo(firstName, lastName, postalCode) {
    if (firstName) cy.get('[data-test="firstName"]').type(firstName);
    if (lastName) cy.get('[data-test="lastName"]').type(lastName);
    if (postalCode) cy.get('[data-test="postalCode"]').type(postalCode);
  }

  continue() { cy.get('[data-test="continue"]').click(); }
  cancel() { cy.get('[data-test="cancel"]').click(); }
  finish() { cy.get('[data-test="finish"]').click(); }

  getError() {
    return cy.get('[data-test="error"]');
  }

  getSubtotal() {
    return cy.get('.summary_subtotal_label');
  }

  assertOrderConfirmed() {
    cy.get('.complete-header').should('have.text', 'Thank you for your order!');
  }
}