import { defineConfig } from 'cypress';  // Importing the Cypress configuration helper

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',  // Specify that the framework used for component testing is React
      bundler: 'vite',  // Set Vite as the bundler for the project. Ensure Vite is correctly configured
    },
  },
  e2e: {
    baseUrl: 'http://localhost:3001',  // Define the base URL for end-to-end tests. Ensure the app is running on this URL
  },
});
