// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Changed from '/bitcoinwala-website/' for custom domain
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Keep PDF files in root with original name
          if (assetInfo.name && assetInfo.name.endsWith('.pdf')) {
            return '[name][extname]'
          }
          // Other assets go to assets folder with hash
          return 'assets/[name]-[hash][extname]'
        }
      }
    }
  },
  assetsInclude: ['**/*.pdf']
})
