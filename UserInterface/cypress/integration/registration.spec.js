describe("clicking the register button", () => {
  it("adds a  user to the database", () => {
    const firstName = 'Joe';
    const lastName ='Smith';
    const password ='testpassword@123';
    const emailID = 'joes@gmail.com';
    
    cy.visit("http://localhost:3000");    
    cy.get('[data-test="firstName"]')
    .type(firstName);
    cy.get('[data-test="lastName"]')
    .type(lastName);
    cy.get('[data-test="emailID"]')
    .type(emailID);
    cy.get('[data-test="password"]')
    .type(password);
    cy.get('[data-test="confirmPassword"]')
    .type(password);
    cy.get('[data-test="RegisterButton"]')
    .click();
    cy.contains(firstName);
    cy.contains(lastName);
    cy.contains(emailID);
    cy.contains(password);
  });
});
