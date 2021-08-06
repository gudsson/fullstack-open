describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      username: 'gudsson',
      name: 'Jay',
      password: 'password',
      blogs: []
    }

    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('gudsson')
      cy.get('#password').type('password')
      cy.get('#login-btn').click()

      cy.get('.notice').should('contain', 'successfully logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('gudsson')
      cy.get('#password').type('wrong')
      cy.get('#login-btn').click()

      cy.get('.notice').should('contain', 'Wrong credentials')
    })
  })
})