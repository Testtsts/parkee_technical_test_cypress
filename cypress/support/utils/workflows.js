const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const CartPage = require('../pages/CartPage');
const CheckoutStepOnePage = require('../pages/CheckoutStepOnePage');
const CheckoutStepTwoPage = require('../pages/CheckoutStepTwoPage');
const CheckoutCompletePage = require('../pages/CheckoutCompletePage');
const { standardUser, customer } = require('./test-data');

function loginAsStandardUser() {
  const loginPage = new LoginPage();
  loginPage.visit();
  loginPage.login(standardUser.username, standardUser.password);
  cy.url().should('include', '/inventory.html');
}

function addBackpackAndOpenCart() {
  const inventoryPage = new InventoryPage();
  inventoryPage.addButton('sauce-labs-backpack').click();
  inventoryPage.openCart();
}

function beginCheckoutWithBackpack() {
  loginAsStandardUser();
  addBackpackAndOpenCart();
  const cartPage = new CartPage();
  cartPage.checkoutButton().click();
}

function advanceCheckoutWithValidCustomer() {
  const stepOne = new CheckoutStepOnePage();
  stepOne.fillCustomerInformation(customer);
  stepOne.continue();
}

function completeBackpackOrder() {
  beginCheckoutWithBackpack();
  advanceCheckoutWithValidCustomer();
  const stepTwo = new CheckoutStepTwoPage();
  stepTwo.finish();
}

module.exports = {
  loginAsStandardUser,
  addBackpackAndOpenCart,
  beginCheckoutWithBackpack,
  advanceCheckoutWithValidCustomer,
  completeBackpackOrder,
};
