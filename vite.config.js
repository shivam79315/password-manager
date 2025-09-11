import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'  // 👈 add this

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      "~": path.resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {},
  },
  optimizeDeps: {},
  preview: {
    port: 5173,
    strictPort: true,
  }
})
