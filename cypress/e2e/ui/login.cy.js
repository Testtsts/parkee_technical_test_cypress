const LoginPage = require('@pages/LoginPage');
const { standardUser, lockedOutUser } = require('@utils/test-data');

describe('Login page', () => {
  let loginPage;

  beforeEach(() => {
    loginPage = new LoginPage();
    loginPage.visit();
  });

  it('positive - logs in with valid credentials', () => {
    loginPage.login(standardUser.username, standardUser.password);
    cy.url().should('include', '/inventory.html');
    cy.get('.title').should('have.text', 'Products');
  });

  it('negative - rejects an incorrect password', () => {
    loginPage.login(standardUser.username, 'wrong-password');
    loginPage.errorMessage().should('be.visible').and('contain.text', 'Username and password do not match');
    cy.url().should('not.include', '/inventory.html');
  });

  it('negative - blocks a locked-out account with a clear message', () => {
    loginPage.login(lockedOutUser.username, lockedOutUser.password);
    loginPage.errorMessage().should('be.visible').and('contain.text', 'locked out');
    cy.url().should('not.include', '/inventory.html');
  });
});
