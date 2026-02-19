import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  // Production optimization settings
  build: {
    target: 'es2020',
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    
    // Chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
          charts: ['recharts'],
          faceapi: ['@vladmandic/face-api'],
        },
      },
    },
    
    // Source maps for production debugging
    sourcemap: 'hidden',
    
    // Report compressed size
    reportCompressedSize: true,
    
    // Chunk size warnings
    chunkSizeWarningLimit: 500,
  },

  // Development server settings
  server: {
    port: 5173,
    strictPort: false,
    open: true,
    cors: true,
  },

  // Preview settings (production preview)
  preview: {
    port: 4173,
    strictPort: true,
  },

  // Environment variables
  define: {
    __APP_VERSION__: JSON.stringify('1.0.0'),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
})
