context('Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should redirect to home page when path is not recognized', () => {
    cy.visit('/invalidUrl');
    cy.url().should('be', '/');
    cy.get('h1').should('contain', 'The Sapphire Testnet');
  });

  it('Clicking brand logo should redirect to home page', () => {
    cy.visit('/participate');
    cy.get('#brand-logo').click();
    cy.url().should('be', '/');
  });

  it('Should load participate page', () => {
    cy.get('#participate-link').click();
    cy.url().should('contain', '/participate');
    cy.get('h1').should('contain', 'Want to try Ethereum 2.0?');
  });
});
