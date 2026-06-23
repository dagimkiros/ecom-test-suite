import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';

const VALID_USER = { username: 'standard_user', password: 'secret_sauce' };
const LOCKED_USER = { username: 'locked_out_user', password: 'secret_sauce' };

test.describe('Authentication', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('TC-AUTH-01: Valid user logs in successfully', async ({ page }) => {
    await loginPage.login(VALID_USER.username, VALID_USER.password);
    const productsPage = new ProductsPage(page);
    expect(await productsPage.isOnProductsPage()).toBeTruthy();
  });

  test('TC-AUTH-02: Locked out user sees error', async () => {
    await loginPage.login(LOCKED_USER.username, LOCKED_USER.password);
    expect(await loginPage.isErrorVisible()).toBeTruthy();
    expect(await loginPage.getErrorMessage()).toContain('locked out');
  });

  test('TC-AUTH-03: Wrong credentials show error', async () => {
    await loginPage.login('bad_user', 'bad_pass');
    expect(await loginPage.isErrorVisible()).toBeTruthy();
    expect(await loginPage.getErrorMessage()).toContain('do not match');
  });

  test('TC-AUTH-04: Empty username shows validation error', async () => {
    await loginPage.login('', 'secret_sauce');
    expect(await loginPage.getErrorMessage()).toContain('Username is required');
  });

  test('TC-AUTH-05: Empty password shows validation error', async () => {
    await loginPage.login('standard_user', '');
    expect(await loginPage.getErrorMessage()).toContain('Password is required');
  });

  test('TC-AUTH-06: User can log out', async ({ page }) => {
    await loginPage.login(VALID_USER.username, VALID_USER.password);
    const productsPage = new ProductsPage(page);
    await productsPage.logout();
    expect(page.url()).not.toContain('inventory');
  });
});