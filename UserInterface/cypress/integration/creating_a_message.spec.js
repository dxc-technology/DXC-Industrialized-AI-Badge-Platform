describe('Creating a message', () => {
    it('Displays the message in the list', () => {
      cy.visit('http://localhost:3000');
  
      cy.get('[data-testid="nameText"]')
        .type('New name');
      cy.get('[data-testid="passwordText"]')
        .type('password');
  
      cy.get('[data-testid="sendButton"]')
        .click();
  
      cy.get('[data-testid="nameText"]')
        .should('have.value', '');
  
      cy.contains('New name');
    });
  });