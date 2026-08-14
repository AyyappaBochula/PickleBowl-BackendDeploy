import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/static/frontend/',
  build: {
    // Django/WhiteNoise serves the production React bundle.
    outDir: '../Backend/static/frontend',
    emptyOutDir: true,
  },
  plugins: [react()],

  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: true
  }
})
