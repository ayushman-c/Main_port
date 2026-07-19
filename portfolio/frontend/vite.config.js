import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@':            path.resolve(__dirname, './src'),
      '@components':  path.resolve(__dirname, './src/components'),
      '@pages':       path.resolve(__dirname, './src/pages'),
      '@hooks':       path.resolve(__dirname, './src/hooks'),
      '@utils':       path.resolve(__dirname, './src/utils'),
      '@data':        path.resolve(__dirname, './src/data'),
      '@context':     path.resolve(__dirname, './src/context'),
      '@styles':      path.resolve(__dirname, './src/styles'),
    },
  },

  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },

  build: {
    outDir: 'dist',
    sourcemap: true,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Core React
          if (id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/react-router-dom/')) {
            return 'vendor'
          }
          // Three.js
          if (id.includes('node_modules/three/') ||
              id.includes('node_modules/@react-three/')) {
            return 'three'
          }
          // Animations
          if (id.includes('node_modules/gsap/') ||
              id.includes('node_modules/framer-motion/') ||
              id.includes('node_modules/@studio-freight/lenis/')) {
            return 'animations'
          }
          // Icons
          if (id.includes('node_modules/react-icons/')) {
            return 'icons'
          }
        },
      },
    },
  },
})
