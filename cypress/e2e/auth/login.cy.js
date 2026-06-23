import LoginPage from '../../support/pages/LoginPage';

describe('Authentication', () => {
  beforeEach(() => { LoginPage.visit(); });

  it('TC-AUTH-01: Valid user logs in', () => {
    LoginPage.login('standard_user', 'secret_sauce');
    cy.url().should('include', 'inventory');
  });

  it('TC-AUTH-02: Locked user sees error', () => {
    LoginPage.login('locked_out_user', 'secret_sauce');
    LoginPage.getErrorMessage().should('contain', 'locked out');
  });

  it('TC-AUTH-03: Wrong credentials show error', () => {
    LoginPage.login('bad_user', 'bad_pass');
    LoginPage.getErrorMessage().should('contain', 'do not match');
  });

  it('TC-AUTH-04: Empty username shows error', () => {
    LoginPage.fillPassword('secret_sauce');
    LoginPage.clickLogin();
    LoginPage.getErrorMessage().should('contain', 'Username is required');
  });

  it('TC-AUTH-05: Empty password shows error', () => {
    LoginPage.fillUsername('standard_user');
    LoginPage.clickLogin();
    LoginPage.getErrorMessage().should('contain', 'Password is required');
  });
});