class InventoryPage {
  itemCards() {
    return cy.get('.inventory_item');
  }

  itemNames() {
    return cy.get('.inventory_item_name');
  }

  productName(name) {
    return cy.contains('.inventory_item_name', name);
  }

  addButton(productSlug) {
    return cy.get(`[data-test="add-to-cart-${productSlug}"]`);
  }

  removeButton(productSlug) {
    return cy.get(`[data-test="remove-${productSlug}"]`);
  }

  sortSelect() {
    return cy.get('[data-test="product-sort-container"]');
  }

  cartLink() {
    return cy.get('[data-test="shopping-cart-link"]');
  }

  cartBadge() {
    return cy.get('.shopping_cart_badge');
  }

  openProduct(name) {
    this.productName(name).click();
  }

  openCart() {
    this.cartLink().click();
  }
}

module.exports = InventoryPage;
