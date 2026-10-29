const CheckoutCompletePage = require('@pages/CheckoutCompletePage');
const InventoryPage = require('@pages/InventoryPage');
const LoginPage = require('@pages/LoginPage');
const { completeBackpackOrder } = require('@utils/workflows');

describe('Checkout Complete page', () => {
  it('positive - confirms a completed order and returns to products', () => {
    completeBackpackOrder();
    cy.url().should('include', '/checkout-complete.html');

    const complete = new CheckoutCompletePage();
    complete.header().should('be.visible').and('contain.text', 'Thank you for your order');
    complete.message().should('be.visible').and('contain.text', 'dispatched');
    complete.backToProductsButton().click();
    cy.url().should('include', '/inventory.html');
    new InventoryPage().itemCards().should('have.length', 6);
  });

  it('negative - does not display an order confirmation when the completion URL is opened directly', () => {
    cy.visit('/checkout-complete.html',{
      failOnStatusCode:false
    });

    const complete = new CheckoutCompletePage();
    complete.header().should('not.exist');
    cy.url().should('not.include', '/checkout-complete.html');
    const login = new LoginPage()
    login.errorMessage().should('be.visible')
  });
});
