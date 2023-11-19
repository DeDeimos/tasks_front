import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/task_front/',
  plugins: [react()],
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src",
      "@app": "/src/app",
      "@assets": "/src/assets",
      "@pages": "/src/pages",
      "@widgets": "/src/widgets",
      "@features": "/src/features",
      "@entities": "/src/entities",
      "@shared": "/src/shared",
    },
  },
})
