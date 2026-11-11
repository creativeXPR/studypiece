import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import catalog from './scripts/catalog.js'
import linkPreviews from './scripts/linkPreviews.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), catalog(), linkPreviews()],
  build: {
    // Each course's questions and each tutorial's lessons are their own chunk (scripts/catalog.js),
    // so only the Java editor and Firebase are large.
    chunkSizeWarningLimit: 700,
  },
})
