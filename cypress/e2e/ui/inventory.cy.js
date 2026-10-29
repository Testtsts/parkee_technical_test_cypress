const InventoryPage = require('@pages/InventoryPage');
const LoginPage = require('@pages/LoginPage');
const { loginAsStandardUser } = require('@utils/workflows');

describe('Inventory page', () => {
  beforeEach(() => loginAsStandardUser());

  it('positive - displays the six expected product cards', () => {
    const inventory = new InventoryPage();
    inventory.itemCards().should('have.length', 6);
    inventory.itemNames().should('have.length', 6);
    cy.get('.inventory_item').each(($card) => {
      cy.wrap($card).find('.inventory_item_name').should('be.visible').and('not.be.empty');
      cy.wrap($card).find('img.inventory_item_img').should('have.length', 1);
    });
  });

  it('positive - sorts products by price low-to-high', () => {
    const inventory = new InventoryPage();
    inventory.sortSelect().select('lohi');
    cy.get('.inventory_item_price').then(($prices) => {
      const values = [...$prices].map((element) => Number(element.innerText.replace('$', '')));
      expect(values).to.have.length.greaterThan(1);
      expect(values).to.deep.equal([...values].sort((a, b) => a - b));
    });
  });
});

describe('Invetory page direct access', () =>{
  it('negative - requires an authenticated session to access inventory directly', () => {
    const login = new LoginPage()
    cy.visit('/inventory.html',{
      failOnStatusCode: false,
    });
    cy.url().should('not.include', '/inventory.html');
    login.usernameInput().should('be.visible')
    login.errorMessage().should('be.visible')
  });
})
