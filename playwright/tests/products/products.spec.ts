import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';

test.describe('Products Page', () => {
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    productsPage = new ProductsPage(page);
  });

  test('TC-PROD-01: All 6 products display', async () => {
    expect(await productsPage.getProductCount()).toBe(6);
  });

  test('TC-PROD-02: Sort A to Z', async () => {
    await productsPage.sortBy('az');
    const names = await productsPage.getAllProductNames();
    expect(names).toEqual([...names].sort());
  });

  test('TC-PROD-03: Sort Z to A', async () => {
    await productsPage.sortBy('za');
    const names = await productsPage.getAllProductNames();
    expect(names).toEqual([...names].sort().reverse());
  });

  test('TC-PROD-04: Sort price low to high', async () => {
    await productsPage.sortBy('lohi');
    const prices = await productsPage.getAllProductPrices();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('TC-PROD-05: Sort price high to low', async () => {
    await productsPage.sortBy('hilo');
    const prices = await productsPage.getAllProductPrices();
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });

  test('TC-PROD-06: Adding product updates cart badge', async () => {
    await productsPage.addToCartByName('Sauce Labs Backpack');
    expect(await productsPage.getCartCount()).toBe(1);
  });

  test('TC-PROD-07: Adding 3 products shows badge count 3', async () => {
    await productsPage.addToCartByName('Sauce Labs Backpack');
    await productsPage.addToCartByName('Sauce Labs Bike Light');
    await productsPage.addToCartByName('Sauce Labs Bolt T-Shirt');
    expect(await productsPage.getCartCount()).toBe(3);
  });

  test('TC-PROD-08: Removing product clears badge', async () => {
    await productsPage.addToCartByName('Sauce Labs Backpack');
    await productsPage.removeFromCartByName('Sauce Labs Backpack');
    expect(await productsPage.getCartCount()).toBe(0);
  });
});