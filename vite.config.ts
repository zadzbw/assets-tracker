import * as path from 'node:path'
import { defineConfig } from 'vite'
import reactSWC from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

const isDev = process.env.NODE_ENV === 'development'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [reactSWC(), tailwindcss()],
  define: {
    __DEV__: isDev,
  },
})
