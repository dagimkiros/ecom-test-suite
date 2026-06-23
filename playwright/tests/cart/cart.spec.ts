import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';

test.describe('Shopping Cart', () => {
  let productsPage: ProductsPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
  });

  test('TC-CART-01: Cart is empty on fresh login', async () => {
    await productsPage.goToCart();
    expect(await cartPage.getCartItemCount()).toBe(0);
  });

  test('TC-CART-02: Added product appears in cart', async () => {
    await productsPage.addToCartByName('Sauce Labs Backpack');
    await productsPage.goToCart();
    expect(await cartPage.getCartItemNames()).toContain('Sauce Labs Backpack');
  });

  test('TC-CART-03: Product price is correct in cart', async () => {
    await productsPage.addToCartByName('Sauce Labs Backpack');
    await productsPage.goToCart();
    const prices = await cartPage.getCartItemPrices();
    expect(prices[0]).toBe(29.99);
  });

  test('TC-CART-04: Multiple products appear in cart', async () => {
    await productsPage.addToCartByName('Sauce Labs Backpack');
    await productsPage.addToCartByName('Sauce Labs Bike Light');
    await productsPage.goToCart();
    expect(await cartPage.getCartItemCount()).toBe(2);
  });

  test('TC-CART-05: Removing item from cart works', async () => {
    await productsPage.addToCartByName('Sauce Labs Backpack');
    await productsPage.addToCartByName('Sauce Labs Bike Light');
    await productsPage.goToCart();
    await cartPage.removeItem('Sauce Labs Backpack');
    const names = await cartPage.getCartItemNames();
    expect(names).not.toContain('Sauce Labs Backpack');
    expect(names).toContain('Sauce Labs Bike Light');
  });

  test('TC-CART-06: Continue Shopping returns to products', async () => {
    await productsPage.goToCart();
    await cartPage.continueShopping();
    expect(await productsPage.isOnProductsPage()).toBeTruthy();
  });
});