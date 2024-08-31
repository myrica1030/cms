import Button from 'src/components/Button.vue'

describe('<Button />', () => {
  describe('click link button', () => {
    it('should trigger link jump', () => {
      // see: https://on.cypress.io/mounting-vue
      cy.mount(Button, {
        props: { link: '#link', text: 'text' },
      })
    })
  })

  describe.skip('click event button', () => {
    it('should trigger click event', () => {
      cy.mount(Button, {
        props: { onClick: () => {} },
      })
    })
  })
})
