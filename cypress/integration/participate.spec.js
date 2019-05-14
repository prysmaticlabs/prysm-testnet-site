context('participate', () => {
  beforeEach(() => {
    cy.visit('/participate');
  });

  it('Get Prysm option should be selected by default', () => {
    cy.get('#cdk-step-label-0-0 .mat-step-label')
      .should('have.class', 'mat-step-label-active');
  });

  it('Should properly select Get GöETH option', () => {
    cy.get('#cdk-step-label-0-0 .mat-step-icon-content mat-icon')
      .should('not.exist');
    cy.get('#cdk-step-label-0-1 .mat-step-label')
      .should('not.have.class', 'mat-step-label-active');

    cy.get('#cdk-step-label-0-1').click();

    cy.get('#cdk-step-label-0-0 .mat-step-icon-content mat-icon')
      .should('contain', 'check');
    cy.get('#cdk-step-label-0-1 .mat-step-label')
      .should('have.class', 'mat-step-label-active');
  });

  it('Should not be able to select remaining options', () => {
    for (let i = 2; i <= 5; i++) {
      const id = `#cdk-step-label-0-${i}`;
      cy.get(id)
        .should('not.have.class', 'cdk-focused');

      cy.get(id).click();

      cy.get(id)
        .should('have.class', 'cdk-focused');

      cy.get(`${id} .mat-step-label`)
        .should('not.have.class', 'mat-step-label-active');
    }
  });
});
