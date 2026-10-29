class ProductDetailsPage {
  title() {
    return cy.get('.inventory_details_name');
  }

  addToCartButton() {
    return cy.get('[data-test="add-to-cart"]');
  }

  removeButton() {
    return cy.get('[data-test="remove"]');
  }

  cartLink() {
    return cy.get('[data-test="shopping-cart-link"]');
  }

  cartBadge() {
    return cy.get('.shopping_cart_badge');
  }
}

module.exports = ProductDetailsPage;
