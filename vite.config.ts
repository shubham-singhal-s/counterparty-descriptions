import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react({include: "src/**/*.{js,jsx,ts,tsx}"})],
  server: {
    watch: {
      usePolling: true,
      interval: 100,
    },
    host: true,
    port: 3000,
    open: true,
  },
})
