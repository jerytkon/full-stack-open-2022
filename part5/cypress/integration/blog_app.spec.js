describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user) 
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
        cy.contains('log in').click()
        cy.contains('username')
        cy.contains('password')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.contains('log in').click()
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()
        
            cy.contains('Matti Luukkainen logged in')
        })
    
        it('fails with wrong credentials', function() {
            cy.contains('log in').click()
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()
        
            cy.get('.error')
    })
  })
  describe('When logged in', function() {
      beforeEach(function() {
        cy.contains('log in').click()
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('salainen')
        cy.get('#login-button').click()
      })

    it('A blog can be created', function() {
      cy.contains('new note').click()
      cy.get('#title').type('a note created by cypress')
      cy.get('#author').type('Jape')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })
  })
})
