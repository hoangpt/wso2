import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/pizzashack': {
        target: 'https://localhost:8243',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
