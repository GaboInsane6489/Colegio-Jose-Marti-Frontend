import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

// 📦 Resolución de ruta absoluta para alias "@"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Permite usar "@/..." para importar desde src/
    },
  },
  build: {
    outDir: 'dist', // Carpeta de salida para producción
    emptyOutDir: true, // Limpia carpeta antes de compilar
  },
  base: command === 'build' ? '/' : './', // "/" para Render, "./" para preview local
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Proxy local para desarrollo backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
}));
