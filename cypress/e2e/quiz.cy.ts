describe('Tech Quiz End-to-End', () => {
  // The beforeEach hook runs before every test in this suite
  beforeEach(() => {
    // Intercept the GET request to '/api/questions/random' and use a fixture 'questions.json' as the mock response
    cy.intercept('GET', '/api/questions/random', { fixture: 'questions.json' }).as('getQuestions');
    // Visit the application at the provided local server URL
    cy.visit('http://127.0.0.1:3001');
  });

  it('completes the quiz and shows the score', () => {
    // Start the quiz by clicking the "Start Quiz" button
    cy.get('.btn-primary').contains('Start Quiz').click();
    // Wait for the intercepted API call to complete and mock the questions
    cy.wait('@getQuestions');

    // Check that the first question is visible
    cy.get('.card').contains('What is JavaScript?').should('be.visible');
    // Answer the first question by clicking the first option
    cy.get('.btn-primary').contains('1').click();
    
    // Check that the second question is now visible
    cy.get('.card').contains('What is React?').should('be.visible');
    // Answer the second question
    cy.get('.btn-primary').contains('1').click();
    
    // Check for the third question
    cy.get('.card').contains('What does CSS stand for?').should('be.visible');
    // Answer the third question
    cy.get('.btn-primary').contains('1').click();
    
    // Check for the fourth question
    cy.get('.card').contains('What is Git used for?').should('be.visible');
    // Answer the fourth question
    cy.get('.btn-primary').contains('1').click();
    
    // Check for the fifth question
    cy.get('.card').contains('What is an API?').should('be.visible');
    // Answer the fifth question
    cy.get('.btn-primary').contains('1').click();
    
    // Check for the sixth and final question
    cy.get('.card').contains('What is TypeScript?').should('be.visible');
    // Answer the sixth question
    cy.get('.btn-primary').contains('1').click();

    // After answering all questions, check if the score alert is visible
    cy.get('.alert-success', { timeout: 10000 }).contains('Your score: 6/6').should('be.visible');
    // Check if the "Take New Quiz" button is now visible
    cy.get('.btn-primary').contains('Take New Quiz').should('be.visible');
    // Click the "Take New Quiz" button to restart the quiz
    cy.get('.btn-primary').contains('Take New Quiz').click();
    // Verify that the first question is displayed again
    cy.get('.card').contains('What is JavaScript?').should('be.visible');
  });
});
