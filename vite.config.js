import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    require("vite-plugin-material-ui")
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [
      "./setupVitest.js"
    ]
  }
})
