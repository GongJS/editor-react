import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import viteCompression from 'vite-plugin-compression';
import { dependencies } from './package.json';

function renderChunks(deps: Record<string, string>) {
  const chunks: Record<string, string[]> = {};
  Object.keys(deps).forEach((key) => {
    if (['react', 'react-router-dom', 'react-dom', 'antd'].includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteCompression()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-router-dom', 'react-dom', 'antd'],
          ...renderChunks(dependencies),
        },
      },
    },
  },
});
