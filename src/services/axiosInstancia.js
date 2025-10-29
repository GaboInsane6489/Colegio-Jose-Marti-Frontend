import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL?.trim();

if (!API_URL) {
  console.warn("⚠️ VITE_API_URL no está definido. Verifica tu entorno.");
}

const axiosInstancia = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Interceptor para agregar token automáticamente
axiosInstancia.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ⚠️ Interceptor para manejar errores comunes
axiosInstancia.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("🔐 Token inválido o expirado.");
    }
    if (error.response?.status === 403) {
      console.warn("🚫 Acceso denegado. Verifica permisos.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstancia;
