class CheckoutStepTwoPage {
  itemRows() {
    return cy.get('.cart_item');
  }

  subtotalLabel() {
    return cy.get('[data-test="subtotal-label"]');
  }

  taxLabel() {
    return cy.get('[data-test="tax-label"]');
  }

  totalLabel() {
    return cy.get('[data-test="total-label"]');
  }

  finishButton() {
    return cy.get('[data-test="finish"]');
  }

  cancelButton() {
    return cy.get('[data-test="cancel"]');
  }

  finish() {
    this.finishButton().click();
  }
}

module.exports = CheckoutStepTwoPage;
