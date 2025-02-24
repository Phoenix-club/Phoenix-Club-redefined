// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'allowing-utterly-hamster.ngrok-free.app', // Add your ngrok host
      'localhost',
      "https://vast-civil-fawn.ngrok-free.app" // Keep localhost access
    ],
    // Optional: Add proxy configuration if needed
    proxy: {
      '/api': {
        target: 'https://allowing-utterly-hamster.ngrok-free.app',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})