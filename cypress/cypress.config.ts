import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',  // Make sure Vite is correctly configured
    },
  },
  e2e: {
    baseUrl: 'http://localhost:3001', // Ensure your app is running at this URL
  },
});
