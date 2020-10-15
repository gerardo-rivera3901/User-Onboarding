define('New Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })
  const nameInput = () => cy.get('input[name=name]')
  const emailInput = () => cy.get('input[name=email]')
  const pwInput = () => cy.get('input[name=password]')
  const tosBoxInput = () => cy.get('input[name=termsOfService]')
  const submitBtn = () => cy.get('#submitButton')
  const errors = () => cy.get('.errors')

  it('Name Input Checker', () => {
    nameInput().type('Earl')
    nameInput().should('have.value', 'Earl')
  })

  it('Email Input Checker', () => {
    emailInput().type('earl@earl.com')
  })

  it('Password Input Checker', () => {
    pwInput().type('superSecretPassword')
  })

  it('Terms Of Service Input Checker', () => {
    tosBoxInput().check()
    tosBoxInput().uncheck()
  })

  it('Submit Button Checker', () => {
    submitBtn().should('be.disabled')
    nameInput().type('Earl')
    emailInput().type('earl@earl.com')
    pwInput().type('superSecretPassword')
    tosBoxInput().check()
    submitBtn().should('be.enabled')
  })

  it('Error Checker', () => {
    nameInput().type('E')
    errors().should('be.visible')
    nameInput().clear()
    nameInput().type('Earl')
    errors().should('not.be.visible')
  })

})