describe('Tech Quiz End-to-End', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/questions/random', { fixture: 'questions.json' }).as('getQuestions');
    cy.visit('http://127.0.0.1:3001');
  });

  it('completes the quiz and shows the score', () => {
    cy.get('.btn-primary').contains('Start Quiz').click();
    cy.wait('@getQuestions');

    cy.get('.card').contains('What is JavaScript?').should('be.visible');
    cy.get('.btn-primary').contains('1').click();
    cy.get('.card').contains('What is React?').should('be.visible');
    cy.get('.btn-primary').contains('1').click();
    cy.get('.card').contains('What does CSS stand for?').should('be.visible');
    cy.get('.btn-primary').contains('1').click();
    cy.get('.card').contains('What is Git used for?').should('be.visible');
    cy.get('.btn-primary').contains('1').click();
    cy.get('.card').contains('What is an API?').should('be.visible');
    cy.get('.btn-primary').contains('1').click();
    cy.get('.card').contains('What is TypeScript?').should('be.visible');
    cy.get('.btn-primary').contains('1').click();

    cy.get('.alert-success', { timeout: 10000 }).contains('Your score: 6/6').should('be.visible');
    cy.get('.btn-primary').contains('Take New Quiz').should('be.visible');
    cy.get('.btn-primary').contains('Take New Quiz').click();
    cy.get('.card').contains('What is JavaScript?').should('be.visible');
  });
});