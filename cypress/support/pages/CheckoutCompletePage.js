class CheckoutCompletePage {
  header() {
    return cy.get('[data-test="complete-header"]');
  }

  message() {
    return cy.get('[data-test="complete-text"]');
  }

  backToProductsButton() {
    return cy.get('[data-test="back-to-products"]');
  }
}

module.exports = CheckoutCompletePage;
