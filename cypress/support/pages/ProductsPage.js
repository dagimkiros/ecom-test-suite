class ProductsPage {
  assertOnProductsPage() {
    cy.get('.title').should('have.text', 'Products');
  }

  sortBy(option) {
    cy.get('[data-test="product-sort-container"]').select(option);
  }

  getProductNames() {
    return cy.get('.inventory_item_name');
  }

  getProductPrices() {
    return cy.get('.inventory_item_price');
  }

  getCartBadge() {
    return cy.get('.shopping_cart_badge');
  }

  addToCartByName(productName) {
    cy.get('.inventory_item')
      .contains(productName)
      .closest('.inventory_item')
      .find('button')
      .click();
  }

  removeFromCartByName(productName) {
    cy.get('.inventory_item')
      .contains(productName)
      .closest('.inventory_item')
      .find('button')
      .click();
  }

  goToCart() {
    cy.get('.shopping_cart_link').click();
  }

  logout() {
    cy.get('#react-burger-menu-btn').click();
    cy.get('#logout_sidebar_link').click();
  }
}

export default new ProductsPage();