import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/todo-app-Local/',
  server: {
    host: true,    // Enables access via IP (0.0.0.0)
    port: 5173     // Optional: customize as needed
  },
});
