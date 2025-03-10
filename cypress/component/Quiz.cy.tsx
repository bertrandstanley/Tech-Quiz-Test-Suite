import { mount } from '@cypress/react'; // Import Cypress's mount function for testing React components
import Quiz from '../../client/src/components/Quiz'; // Import the Quiz component to be tested
import { getQuestions } from '../../client/src/services/questionApi'; // Import the named export "getQuestions" from the question API service

// Interface defining the shape of a single question and its answers
interface Question {
  question: string; 
  answers: { text: string; isCorrect: boolean }[]; // Array of possible answers, with a flag indicating if each is correct
}

// Mock data for quiz questions
const mockQuestions: Question[] = [
  {
    question: 'What is JavaScript?', // The question text
    answers: [
      { text: 'A programming language', isCorrect: true }, // The correct answer
      { text: 'A type of coffee', isCorrect: false }, // Incorrect answer
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
      body: mockQuestions, // Provide the mock questions as a response to the request
    }).as('getQuestions'); // Alias the intercepted request for easy reference
  });

  it('renders the start button initially and starts quiz on click', () => {
    mount(<Quiz />);
    // Click the "Start Quiz" button to begin the quiz
    cy.get('.btn-primary').contains('Start Quiz').click();
    // Check if the first question is displayed
    cy.get('.card').contains('What is JavaScript?').should('be.visible');
  });

  it('displays next question after answering', () => {
    mount(<Quiz />);
    // Start the quiz by clicking the "Start Quiz" button
    cy.get('.btn-primary').contains('Start Quiz').click();
    // Answer the first question by clicking the answer button
    cy.get('.btn-primary').contains('1').click();
    // Check if the next question is displayed
    cy.get('.card').contains('What is React?').should('be.visible');
  });

  it('shows score and restart option when quiz is completed', () => {
    mount(<Quiz />);
    cy.get('.btn-primary').contains('Start Quiz').click();
    // Simulate answering all questions in the quiz
    cy.get('.btn-primary').contains('1').click();
    cy.get('.btn-primary').contains('1').click();
    cy.get('.btn-primary').contains('1').click();
    cy.get('.btn-primary').contains('1').click();
    cy.get('.btn-primary').contains('1').click();
    cy.get('.btn-primary').contains('1').click();
    // Verify that the score and restart button appear when quiz is finished
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
    // Click the "Start Quiz" button to start the quiz
    cy.get('.btn-primary').contains('Start Quiz').click();
    // Verify that the loading spinner is shown
    cy.get('.spinner-border').should('be.visible');
  });
});
