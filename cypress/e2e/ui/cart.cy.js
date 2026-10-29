const InventoryPage = require('@pages/InventoryPage');
const CartPage = require('@pages/CartPage');
const { loginAsStandardUser } = require('@utils/workflows');

describe('Cart page', () => {
  it('positive - shows the selected item and allows checkout', () => {
    loginAsStandardUser();
    const inventory = new InventoryPage();
    inventory.addButton('sauce-labs-backpack').click();
    inventory.openCart();

    const cart = new CartPage();
    cart.title().should('have.text', 'Your Cart');
    cart.items().should('have.length', 1);
    cart.itemNames().should('contain.text', 'Sauce Labs Backpack');
    cart.checkoutButton().should('be.enabled');
  });

  it('negative - removing the final item leaves an empty cart without a badge', () => {
    loginAsStandardUser();
    const inventory = new InventoryPage();
    inventory.addButton('sauce-labs-backpack').click();
    inventory.openCart();

    const cart = new CartPage();
    cart.removeButton('sauce-labs-backpack').click();
    cart.items().should('have.length', 0);
    cy.get('.shopping_cart_badge').should('not.exist');
    cart.continueShoppingButton().should('be.visible');
  });
});
