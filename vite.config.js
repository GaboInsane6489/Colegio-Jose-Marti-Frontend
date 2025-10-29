import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Permite usar "@/..." para importar desde src/
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  base: "/", // Recomendado para despliegue en Render: asegura rutas internas correctas
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // Proxy local para desarrollo backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
