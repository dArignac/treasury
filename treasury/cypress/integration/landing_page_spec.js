describe('Landing Page', function() {
  it('successfully loads', function() {
    cy.visit('/')

    cy.get('logo').get('strong').contains('Treasury')

    cy.get('links ul li a').contains('Login')
    cy.get('links ul li a').should('not.contain', 'Logout')

    cy.get('h1').contains('Welcome to treasury')
  })
})
