import ProductsPage from '../../support/pages/ProductsPage';

describe('Products Page', () => {
  beforeEach(() => { cy.login(); });

  it('TC-PROD-01: All 6 products display', () => {
    cy.get('.inventory_item').should('have.length', 6);
  });

  it('TC-PROD-02: Sort A to Z', () => {
    ProductsPage.sortBy('az');
    ProductsPage.getProductNames().then(($items) => {
      const names = [...$items].map(el => el.innerText);
      expect(names).to.deep.equal([...names].sort());
    });
  });

  it('TC-PROD-03: Sort price low to high', () => {
    ProductsPage.sortBy('lohi');
    ProductsPage.getProductPrices().then(($prices) => {
      const prices = [...$prices].map(el => parseFloat(el.innerText.replace('$', '')));
      expect(prices).to.deep.equal([...prices].sort((a, b) => a - b));
    });
  });

  it('TC-PROD-04: Adding product updates badge', () => {
    ProductsPage.addToCartByName('Sauce Labs Backpack');
    ProductsPage.getCartBadge().should('have.text', '1');
  });

  it('TC-PROD-05: Adding 3 products shows badge 3', () => {
    cy.addToCart('Sauce Labs Backpack');
    cy.addToCart('Sauce Labs Bike Light');
    cy.addToCart('Sauce Labs Bolt T-Shirt');
    ProductsPage.getCartBadge().should('have.text', '3');
  });

  it('TC-PROD-06: Removing product clears badge', () => {
    ProductsPage.addToCartByName('Sauce Labs Backpack');
    ProductsPage.removeFromCartByName('Sauce Labs Backpack');
    ProductsPage.getCartBadge().should('not.exist');
  });
});