const CheckoutStepTwoPage = require('@pages/CheckoutStepTwoPage');
const CheckoutCompletePage = require('@pages/CheckoutCompletePage');
const { beginCheckoutWithBackpack, advanceCheckoutWithValidCustomer } = require('@utils/workflows');

function amountFromLabel(text) {
  const match = text.match(/\$([0-9]+(?:\.[0-9]{2})?)/);
  expect(match, `amount extracted from label: ${text}`).not.to.be.null;
  return Number(match[1]);
}

describe('Checkout Step Two - overview', () => {
  beforeEach(() => {
    beginCheckoutWithBackpack();
    advanceCheckoutWithValidCustomer();
  });

  it('positive - shows order items and calculates total as subtotal plus tax', () => {
    const overview = new CheckoutStepTwoPage();
    overview.itemRows().should('have.length', 1);

    let subtotal;
    let tax;
    let total;
    overview.subtotalLabel().invoke('text').then((text) => { subtotal = amountFromLabel(text); });
    overview.taxLabel().invoke('text').then((text) => { tax = amountFromLabel(text); });
    overview.totalLabel().invoke('text').then((text) => {
      total = amountFromLabel(text);
      expect(total).to.be.closeTo(subtotal + tax, 0.001);
    });
  });

  it('negative path - cancel abandons checkout and does not show an order confirmation', () => {
    new CheckoutStepTwoPage().cancelButton().click();
    cy.url().should('include', '/inventory.html');
    new CheckoutCompletePage().header().should('not.exist');
  });
});
