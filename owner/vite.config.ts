import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '#assets': '/src/assets',
      '#components': '/src/components',
      '#hooks': '/src/hooks',
      '#http': '/src/http',
      '#interfaces': '/src/interfaces',
      '#layouts': '/src/layouts',
      '#pages': '/src/pages',
      '#routes': '/src/routes',
      '#services': '/src/services',
      '#store': '/src/store',
      '#utils': '/src/utils',
    }
  }
})
