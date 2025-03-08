import { mount } from '@cypress/react';
import Quiz from '../../client/src/components/Quiz';
import { getQuestions } from '../../client/src/services/questionApi'; // Import the named export

interface Question {
  question: string;
  answers: { text: string; isCorrect: boolean }[];
}

const mockQuestions: Question[] = [
  {
    question: 'What is JavaScript?',
    answers: [
      { text: 'A programming language', isCorrect: true },
      { text: 'A type of coffee', isCorrect: false },
    ],
  },
  {
    question: 'What is React?',
    answers: [
      { text: 'A JavaScript library', isCorrect: true },
      { text: 'A database', isCorrect: false },
    ],
  },
  {
    question: 'What does CSS stand for?',
    answers: [
      { text: 'Cascading Style Sheets', isCorrect: true },
      { text: 'Computer Style System', isCorrect: false },
    ],
  },
  {
    question: 'What is Git used for?',
    answers: [
      { text: 'Version control', isCorrect: true },
      { text: 'Graphic editing', isCorrect: false },
    ],
  },
  {
    question: 'What is an API?',
    answers: [
      { text: 'Application Programming Interface', isCorrect: true },
      { text: 'Advanced Processor Instruction', isCorrect: false },
    ],
  },
  {
    question: 'What is TypeScript?',
    answers: [
      { text: 'A superset of JavaScript', isCorrect: true },
      { text: 'A styling language', isCorrect: false },
    ],
  },
];

describe('Quiz Component', () => {
  beforeEach(() => {
    // Intercept the API request and mock the response
    cy.intercept('/api/questions/random', {
      statusCode: 200,
      body: mockQuestions,
    }).as('getQuestions');
  });

  it('renders the start button initially and starts quiz on click', () => {
    mount(<Quiz />);
    cy.get('.btn-primary').contains('Start Quiz').click();
    cy.get('.card').contains('What is JavaScript?').should('be.visible');
  });

  it('displays next question after answering', () => {
    mount(<Quiz />);
    cy.get('.btn-primary').contains('Start Quiz').click();
    cy.get('.btn-primary').contains('1').click();
    cy.get('.card').contains('What is React?').should('be.visible');
  });

  it('shows score and restart option when quiz is completed', () => {
    mount(<Quiz />);
    cy.get('.btn-primary').contains('Start Quiz').click();
    cy.get('.btn-primary').contains('1').click();
    cy.get('.btn-primary').contains('1').click();
    cy.get('.btn-primary').contains('1').click();
    cy.get('.btn-primary').contains('1').click();
    cy.get('.btn-primary').contains('1').click();
    cy.get('.btn-primary').contains('1').click();
    cy.get('.alert-success').contains('Your score: 6/6').should('be.visible');
    cy.get('.btn-primary').contains('Take New Quiz').should('be.visible');
  });

  it('shows loading spinner when questions are not yet loaded', () => {
    // Intercept with an empty response for loading state
    cy.intercept('/api/questions/random', {
      statusCode: 200,
      body: [],
    }).as('getQuestionsEmpty');
    mount(<Quiz />);
    cy.get('.btn-primary').contains('Start Quiz').click();
    cy.get('.spinner-border').should('be.visible');
  });
});
