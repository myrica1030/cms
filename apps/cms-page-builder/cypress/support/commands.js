// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('openModal', (nth = 1) => {
  cy.get(`.section-container > section:nth-child(${nth})`).trigger('mouseenter')
  cy.findByRole('button', { name: 'Settings' }).click()
})
