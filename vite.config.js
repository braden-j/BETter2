import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.JPG'],
  server: {
    host: true, // 👈 this is essential for ngrok to access your dev server
    allowedHosts: ['26db-2607-f470-6-1001-f58f-1432-67a9-d7d8.ngrok-free.app', 
      '7487-2607-f470-6-1001-f58f-1432-67a9-d7d8.ngrok-free.app',
      'a7a2-2607-f470-6-1001-e478-1eac-95af-ecb4.ngrok-free.app']
  }
})
