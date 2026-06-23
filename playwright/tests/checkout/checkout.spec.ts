import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('Checkout Flow', () => {
  let productsPage: ProductsPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    await productsPage.addToCartByName('Sauce Labs Backpack');
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
  });

  test('TC-CHKOUT-01: Full checkout completes successfully', async () => {
    await checkoutPage.fillShippingInfo('Dagim', 'Kiros', '98101');
    await checkoutPage.continue();
    expect(await checkoutPage.getSubtotal()).toContain('$');
    await checkoutPage.finish();
    expect(await checkoutPage.isOrderConfirmed()).toBeTruthy();
  });

  test('TC-CHKOUT-02: Empty first name shows error', async () => {
    await checkoutPage.fillShippingInfo('', 'Kiros', '98101');
    await checkoutPage.continue();
    expect(await checkoutPage.getErrorMessage()).toContain('First Name is required');
  });

  test('TC-CHKOUT-03: Empty last name shows error', async () => {
    await checkoutPage.fillShippingInfo('Dagim', '', '98101');
    await checkoutPage.continue();
    expect(await checkoutPage.getErrorMessage()).toContain('Last Name is required');
  });

  test('TC-CHKOUT-04: Empty postal code shows error', async () => {
    await checkoutPage.fillShippingInfo('Dagim', 'Kiros', '');
    await checkoutPage.continue();
    expect(await checkoutPage.getErrorMessage()).toContain('Postal Code is required');
  });

  test('TC-CHKOUT-05: Cancel returns to cart', async () => {
    await checkoutPage.cancel();
    expect(await cartPage.isOnCartPage()).toBeTruthy();
  });

  test('TC-CHKOUT-06: Two items show correct subtotal', async ({ page }) => {
    await checkoutPage.cancel();
    await cartPage.continueShopping();
    await productsPage.addToCartByName('Sauce Labs Bike Light');
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.fillShippingInfo('Dagim', 'Kiros', '98101');
    await checkoutPage.continue();
    expect(await checkoutPage.getSubtotal()).toContain('39.98');
  });
});