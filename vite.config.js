import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import linkPreviews from './scripts/linkPreviews.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), linkPreviews()],
  build: {
    // The question bank ships in the main bundle on purpose (instant, works offline).
    chunkSizeWarningLimit: 4000,
  },
})
