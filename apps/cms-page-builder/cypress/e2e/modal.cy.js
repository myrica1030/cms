describe('# Modal', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.openModal()
  })

  it('should display modal in screen center by default', () => {
    cy.get('.modal')
      .should('be.visible')
      .should(([el]) => {
        const style = getComputedStyle(el)
        const deltaY = Math.abs(Number.parseInt(style.top) - Number.parseInt(style.bottom))
        expect(deltaY).to.be.at.most(1)
        const deltaX = Math.abs(Number.parseInt(style.left) - Number.parseInt(style.right))
        expect(deltaX).to.be.at.most(1)
      })
  })

  it('should display the second panel when click the second tab', () => {
    cy.contains('Design').click()
    cy.get('#panel-1')
      .should('not.have.attr', 'hidden')
  })

  it('should can be move and resize', () => {
    cy.get('.modal header').as('moveHandler')
    cy.get('@moveHandler').trigger('mousedown')
    cy.get('@moveHandler').trigger('mousemove', { movementX: 100, movementY: 100 })
    cy.get('@moveHandler').trigger('mouseup', { eventConstructor: 'MouseEvent' })

    cy.get('.modal').should(([el]) => {
      const style = getComputedStyle(el)
      expect(Number.parseInt(style.bottom)).to.equal(0)
    })

    cy.get('.modal .resize-handle').as('resizeHandler')
    cy.get('@resizeHandler').trigger('mousedown', { force: true })
    cy.get('@resizeHandler').trigger('mousemove', { movementX: 300, movementY: -300, force: true })
    cy.get('@resizeHandler').trigger('mouseup', { eventConstructor: 'MouseEvent', force: true })

    cy.get('.modal').should(([el]) => {
      const style = getComputedStyle(el)

      expect(Number.parseInt(style.right)).to.lte(0)
      expect(Number.parseInt(style.bottom)).to.equal(200)
    })
  })

  it('should can be closed', () => {
    cy.findByRole('button', { name: 'Close modal' }).click()
    cy.get('.modal').should('not.exist')
  })

  it('should remember last position', () => {
    cy.get('.modal header').as('moveHandler')
    cy.get('@moveHandler').trigger('mousedown')
    cy.get('@moveHandler').trigger('mousemove', { movementX: 100, movementY: 100 })
    cy.get('@moveHandler').trigger('mouseup', { eventConstructor: 'MouseEvent' })

    cy.get('.modal .resize-handle').as('resizeHandler')
    cy.get('@resizeHandler').trigger('mousedown', { force: true })
    cy.get('@resizeHandler').trigger('mousemove', { movementX: 300, movementY: -300, force: true })
    cy.get('@resizeHandler').trigger('mouseup', { eventConstructor: 'MouseEvent', force: true })

    cy.findByRole('button', { name: 'Close modal' }).click()
    cy.openModal()

    cy.get('.modal').should(([el]) => {
      const style = getComputedStyle(el)

      expect(Number.parseInt(style.right)).to.equal(0)
      expect(Number.parseInt(style.bottom)).to.equal(200)
    })
  })

  it('should can be closed by ESC keydown', () => {
    cy.get('body').trigger('keydown', { key: 'Escape', force: true })
    cy.get('.modal').should('not.exist')
  })
})
