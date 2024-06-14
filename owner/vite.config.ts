import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '#assets': '/src/assets',
      '#components': '/src/components',
      '#interfaces': '/src/interfaces',
      '#layouts': '/src/layouts',
      '#pages': '/src/pages',
      '#routes': '/src/routes',
      '#store': '/src/store',
      '#utils': '/src/utils',
      '#hooks': '/src/hooks',
    }
  }
})
