import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

// 📦 Resolución de ruta absoluta para alias "@"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(), // Soporte para React
    tailwindcss(), // Integración con Tailwind CSS
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Permite usar "@/..." para importar desde src/
    },
  },
  build: {
    outDir: 'dist', // Carpeta de salida para producción
    emptyOutDir: true, // Limpia carpeta antes de compilar
  },
  base: '/', // Ruta base absoluta para Render
});
