describe('Landing Page', function() {
  it('successfully loads', function() {
    cy.visit('/');

    cy.get('#home h1').contains('Welcome to treasury, your library of movies and series!');
    cy.get('#home p').contains('Please login by selecting the login entry in the menu!');

    // 3 links and one divider
    cy.get('app-menu mdc-list').children().should('have.length', 4);
    cy.get('app-menu mdc-list').within(() => {
      cy.get('a[data-cy="menu-link-home"]').should('exist');
      cy.get('a[data-cy="menu-link-login"]').should('exist');
      cy.get('a[data-cy="menu-link-imprint"]').should('exist');
      cy.get('a[data-cy="menu-link-add-movie"]').should('not.exist');
      cy.get('a[data-cy="menu-link-movies"]').should('not.exist');
      cy.get('a[data-cy="menu-link-settings"]').should('not.exist');
      cy.get('a[data-cy="menu-link-logout"]').should('not.exist');
    });
  });
});
