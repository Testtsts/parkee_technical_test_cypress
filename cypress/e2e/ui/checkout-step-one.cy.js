const CheckoutStepOnePage = require('@pages/CheckoutStepOnePage');
const CheckoutStepTwoPage = require('@pages/CheckoutStepTwoPage');
const { beginCheckoutWithBackpack } = require('@utils/workflows');
const { customer } = require('@utils/test-data');

describe('Checkout Step One - customer information', () => {
  beforeEach(() => beginCheckoutWithBackpack());

  it('positive - accepts complete customer information and continues to overview', () => {
    const stepOne = new CheckoutStepOnePage();
    stepOne.fillCustomerInformation(customer);
    stepOne.continue();
    cy.url().should('include', '/checkout-step-two.html');
    new CheckoutStepTwoPage().itemRows().should('have.length', 1);
  });

  it('negative - requires a first name', () => {
    const stepOne = new CheckoutStepOnePage();
    stepOne.fillCustomerInformation({ lastName: customer.lastName, postalCode - customer.postalCode });
    stepOne.continue();
    stepOne.errorMessage().should('be.visible').and('contain.text', 'First Name is required');
    cy.url().should('include', '/checkout-step-one.html');
  });

  it('negative - requires a postal code even when names are supplied', () => {
    const stepOne = new CheckoutStepOnePage();
    stepOne.fillCustomerInformation({ firstName: customer.firstName, lastName: customer.lastName });
    stepOne.continue();
    stepOne.errorMessage().should('be.visible').and('contain.text', 'Postal Code is required');
    cy.url().should('include', '/checkout-step-one.html');
  });
});
