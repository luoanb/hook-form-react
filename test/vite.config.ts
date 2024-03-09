import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // proxy: {
    //   '/api/app': 'http://161.189.24.245:8088'
    // }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'hook-form-react': path.resolve(__dirname, '../src/index.ts')
    }
  }
})
