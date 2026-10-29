class CartPage {
  title() {
    return cy.get('.title');
  }

  items() {
    return cy.get('.cart_item');
  }

  itemNames() {
    return cy.get('.inventory_item_name');
  }

  checkoutButton() {
    return cy.get('[data-test="checkout"]');
  }

  continueShoppingButton() {
    return cy.get('[data-test="continue-shopping"]');
  }

  removeButton(productSlug) {
    return cy.get(`[data-test="remove-${productSlug}"]`);
  }
}

module.exports = CartPage;
