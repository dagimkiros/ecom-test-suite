import { CartPage, CheckoutPage } from '../../support/pages/CartCheckoutPages';

const cart = new CartPage();
const checkout = new CheckoutPage();

describe('Shopping Cart', () => {
  beforeEach(() => { cy.login(); });

  it('TC-CART-01: Cart empty on fresh login', () => {
    cy.get('.shopping_cart_link').click();
    cart.getCartItems().should('have.length', 0);
  });

  it('TC-CART-02: Added product appears in cart', () => {
    cy.addToCart('Sauce Labs Backpack');
    cy.get('.shopping_cart_link').click();
    cart.getCartItemNames().should('contain', 'Sauce Labs Backpack');
  });

  it('TC-CART-03: Multiple products in cart', () => {
    cy.addToCart('Sauce Labs Backpack');
    cy.addToCart('Sauce Labs Bike Light');
    cy.get('.shopping_cart_link').click();
    cart.getCartItems().should('have.length', 2);
  });

  it('TC-CART-04: Remove item from cart', () => {
    cy.addToCart('Sauce Labs Backpack');
    cy.addToCart('Sauce Labs Bike Light');
    cy.get('.shopping_cart_link').click();
    cart.removeItem('Sauce Labs Backpack');
    cart.getCartItemNames().should('not.contain', 'Sauce Labs Backpack');
  });

  it('TC-CART-05: Continue Shopping returns to products', () => {
    cy.get('.shopping_cart_link').click();
    cart.continueShopping();
    cy.get('.title').should('have.text', 'Products');
  });
});

describe('Checkout Flow', () => {
  beforeEach(() => {
    cy.login();
    cy.addToCart('Sauce Labs Backpack');
    cy.get('.shopping_cart_link').click();
    cart.proceedToCheckout();
  });

  it('TC-CHKOUT-01: Full order completes', () => {
    checkout.fillShippingInfo('Dagim', 'Kiros', '98101');
    checkout.continue();
    checkout.getSubtotal().should('contain', '$');
    checkout.finish();
    checkout.assertOrderConfirmed();
  });

  it('TC-CHKOUT-02: Empty first name shows error', () => {
    checkout.fillShippingInfo('', 'Kiros', '98101');
    checkout.continue();
    checkout.getError().should('contain', 'First Name is required');
  });

  it('TC-CHKOUT-03: Empty last name shows error', () => {
    checkout.fillShippingInfo('Dagim', '', '98101');
    checkout.continue();
    checkout.getError().should('contain', 'Last Name is required');
  });

  it('TC-CHKOUT-04: Empty postal code shows error', () => {
    checkout.fillShippingInfo('Dagim', 'Kiros', '');
    checkout.continue();
    checkout.getError().should('contain', 'Postal Code is required');
  });

  it('TC-CHKOUT-05: Cancel returns to cart', () => {
    checkout.cancel();
    cart.assertOnCartPage();
  });
});