import db from '../config/connection.js';
import { Question } from '../models/index.js';
import cleanDB from './cleanDb.js';


// Use require to import JSON file
import questionData from './pythonQuestions.json';

try {
  await db();
  await cleanDB();

  // bulk create each model
  await Question.insertMany(questionData);

  console.log('Seeding completed successfully!');
  process.exit(0);
} catch (error) {
  console.error('Error seeding database:', error);
  process.exit(1);
}
