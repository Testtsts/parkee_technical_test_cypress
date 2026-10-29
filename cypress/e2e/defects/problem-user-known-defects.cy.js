const LoginPage = require('@pages/LoginPage');
const InventoryPage = require('@pages/InventoryPage');
const ProductDetailsPage = require('@pages/ProductDetailsPage');
const { problemUser } = require('@utils/test-data');

describe('Known-defect probes - problem_user (expected to expose issues)', () => {
  beforeEach(() => {
    const login = new LoginPage();
    login.visit();
    login.login(problemUser.username, problemUser.password);
    cy.url().should('include', '/inventory.html');
  });

  it('defect-01 - backpack card uses the backpack image asset', () => {
    const inventory = new InventoryPage();
    inventory.productName('Sauce Labs Backpack')
      .parents('.inventory_item')
      .find('img.inventory_item_img')
      .should('have.attr', 'src')
      .and('include', 'sauce-backpack');
  });

  it('defect-02 - selecting the backpack opens the matching product detail', () => {
    const inventory = new InventoryPage();
    inventory.openProduct('Sauce Labs Backpack');
    new ProductDetailsPage().title().should('have.text', 'Sauce Labs Backpack');
  });

  it('defect-03 - add-to-cart on a product detail updates the cart badge', () => {
    const inventory = new InventoryPage();
    inventory.openProduct('Sauce Labs Backpack');
    const details = new ProductDetailsPage();
    details.addToCartButton().click();
    details.cartBadge().should('have.text', '1');
    details.removeButton().should('be.visible');
  });
});
