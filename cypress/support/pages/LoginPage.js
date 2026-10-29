class LoginPage {
  visit() {
    cy.visit('/');
  }

  usernameInput() {
    return cy.get('[data-test="username"]');
  }

  passwordInput() {
    return cy.get('[data-test="password"]');
  }

  loginButton() {
    return cy.get('[data-test="login-button"]');
  }

  errorMessage() {
    return cy.get('[data-test="error"]');
  }

  login(username, password) {
    this.usernameInput().clear().type(username);
    this.passwordInput().clear().type(password, { log: false });
    this.loginButton().click();
  }

  loginAsStandardUser() {
    this.login('standard_user', 'secret_sauce');
  }
}

module.exports = LoginPage;
