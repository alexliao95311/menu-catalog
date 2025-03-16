import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: [
      '5e8c-24-130-140-119.ngrok-free.app'
    ]
  }
});