import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: [
      'f8ed-2607-fb91-20ce-4925-cc0-643-d16d-946f.ngrok-free.app'
    ]
  }
});