import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000, // Vite dev server will run on http://localhost:3000
        proxy: {
            // Proxy inquiries API calls to the Express server
            '/inquiries': 'http://localhost:8081',
            // Proxy update, delete, and download calls as well
            '/update': 'http://localhost:8081',
            '/delete': 'http://localhost:8081',
            '/download': 'http://localhost:8081',
        }
    }
});
