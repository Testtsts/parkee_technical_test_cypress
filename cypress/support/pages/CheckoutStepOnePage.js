class CheckoutStepOnePage {
  firstNameInput() {
    return cy.get('[data-test="firstName"]');
  }

  lastNameInput() {
    return cy.get('[data-test="lastName"]');
  }

  postalCodeInput() {
    return cy.get('[data-test="postalCode"]');
  }

  continueButton() {
    return cy.get('[data-test="continue"]');
  }

  cancelButton() {
    return cy.get('[data-test="cancel"]');
  }

  errorMessage() {
    return cy.get('[data-test="error"]');
  }

  fillCustomerInformation({ firstName, lastName, postalCode }) {
    if (firstName !== undefined) this.firstNameInput().clear().type(firstName);
    if (lastName !== undefined) this.lastNameInput().clear().type(lastName);
    if (postalCode !== undefined) this.postalCodeInput().clear().type(postalCode);
  }

  continue() {
    this.continueButton().click();
  }
}

module.exports = CheckoutStepOnePage;
