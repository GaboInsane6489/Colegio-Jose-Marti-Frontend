import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

// ✅ Adaptación para ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(), // Soporte para React
    tailwindcss(), // Integración con Tailwind CSS v4
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Importaciones limpias desde src/
    },
  },
  build: {
    outDir: 'dist', // Carpeta de salida para producción
    emptyOutDir: true, // Limpia carpeta antes de compilar
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'), // 🔑 Entrada explícita para Vite
      },
    },
  },
  base: '/', // Ruta base absoluta para Render

  // 🔄 Proxy para redirigir llamadas a /api hacia el backend en desarrollo
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
