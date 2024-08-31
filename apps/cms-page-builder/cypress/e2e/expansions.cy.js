describe('# Expansions', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.openModal()
  })

  it('should display correct', () => {
    cy.get('.modal').contains('Text').click()

    cy.get('.expansions .details:first').should('have.class', 'open')
  })

  it('should collapse other details when click another details', () => {
    cy.get('.modal').contains('Text').click()
    cy.get('.modal').contains('Images').click()

    cy.get('.expansions .details:nth-child(2)').should('have.class', 'open')
    cy.get('.expansions .details:nth-child(1)').should('not.have.class', 'open')
  })

  it('should collapse the details when click a detail again', () => {
    cy.get('.modal').contains('Images').click()
    cy.get('.expansions .details:nth-child(2)').should('have.class', 'open')

    cy.get('.modal').contains('Images').click()
    cy.get('.expansions .details:nth-child(2)').should('not.have.class', 'open')
  })
})
