import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const GEMINI_KEY = env.VITE_GEMINI_API_KEY || env.GEMINI_API_KEY || '';

  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    envPrefix: 'VITE_',
    plugins: [
      react(),
      compression({
        algorithm: 'brotliCompress',
        ext: '.br',
      }),
      compression({
        algorithm: 'gzip',
        ext: '.gz',
      })
    ],
    define: {
      'process.env.API_KEY': JSON.stringify(GEMINI_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(GEMINI_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    },
    build: {
      minify: 'esbuild',
      sourcemap: false,
      chunkSizeWarningLimit: 700,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
          }
        }
      }
    }
  };
});
