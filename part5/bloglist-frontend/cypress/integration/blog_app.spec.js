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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('#username').type('gudsson')
      cy.get('#password').type('password')
      cy.get('#login-btn').click()

      cy.contains('create new blog').click()

      cy.get('#title').type('new blog')
      cy.get('#author').type('authorName')
      cy.get('#url').type('www.test.com')
      cy.get('#submit-btn').click()
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()

      cy.get('#title').type('new blog2')
      cy.get('#author').type('authorName2')
      cy.get('#url').type('www.test2.com')
      cy.get('#submit-btn').click()

      cy.get('.notice').should('contain', 'a new blog')
      cy.get('.blogs').find('.blog').should('have.length', 2)
    })

    it('A blog can be deleted', function() {

      cy.get('.blog').first().find('.show-btn').click()
      cy.get('.blog').first().find('.like-btn').click()

      cy.get('.blog').first().find('.likes').should('contain', '1')
    })

    it('A blog can be deleted', function() {
      cy.get('.blog').first().find('.show-btn').click()
      cy.get('.blog').first().find('.remove-btn').click()

      cy.on('window:confirm', () => true)

      cy.get('.blogs').find('.blog').should('have.length', 0)
    })

  })

  // will keep text from title element
  // let titleText

  // cy.get('.company-details')
  //   .find('.title')
  //   .then(($title) => {
  //     // save text from the first element
  //     titleText = $title.text(); //original uses normalizeText($title.text())
  //   })

  // cy.get('.company-details')
  //   .find('.identifier')
  //   .should(($identifier) => {
  //     // we can massage text before comparing
  //     const idText = $identifier.text(); //original uses normalizeText($identifier.text())

  //     // text from the title element should already be set
  //     expect(idText, 'ID').to.equal(titleText)
  //   })
})