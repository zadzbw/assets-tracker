import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import reactSWC from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

const isDev = process.env.NODE_ENV === 'development'

export default defineConfig({
  define: {
    __DEV__: isDev,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  plugins: [reactSWC(), tailwindcss()],
  server: {
    open: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          chart: ['echarts'],
          jotai: ['jotai'],
        },
      },
    },
  },
})
