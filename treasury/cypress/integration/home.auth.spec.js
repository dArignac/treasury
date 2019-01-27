describe('Landing Page Authenticated', function() {

  before(() => {
    cy.login()
  });

  it('successfully loads', function() {
    cy.visit('/');
    // wait a little for firebase
    cy.wait(1000);

    // main content
    cy.get('#home h1').contains('Welcome to treasury, your library of movies and series!');
    cy.get('#home p').should('not.exist');


    cy.get('app-menu mdc-list').children().should('have.length', 9);
    cy.get('app-menu mdc-list').within(() => {
      cy.get('a[data-cy="menu-link-home"]').should('exist');
      cy.get('a[data-cy="menu-link-login"]').should('not.exist');
      cy.get('a[data-cy="menu-link-imprint"]').should('exist');
      cy.get('a[data-cy="menu-link-add-movie"]').should('exist');
      cy.get('a[data-cy="menu-link-movies"]').should('exist');
      cy.get('a[data-cy="menu-link-settings"]').should('exist');
      cy.get('a[data-cy="menu-link-logout"]').should('exist');
    });
  });
});
