import axios from 'axios';

// 📦 URL base institucional dinámica
const API_URL =
  import.meta.env?.VITE_API_URL?.trim() ||
  (window.location.hostname === 'localhost'
    ? 'http://localhost:3000'
    : 'https://backend-render-url.onrender.com'); // ← fallback seguro para producción

if (!API_URL) {
  console.warn('⚠️ VITE_API_URL no está definido. Verifica tu entorno.');
  // throw new Error("VITE_API_URL no definido"); // ← opcional si quieres bloquear
}

// 🧠 Instancia institucional de Axios
const axiosInstancia = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔐 Interceptor para agregar token automáticamente
axiosInstancia.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  if (token && typeof token === 'string' && token.length > 10) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    if (!window.__axiosTokenWarningShown) {
      console.warn('⚠️ Token no encontrado o inválido en almacenamiento.');
      window.__axiosTokenWarningShown = true;
    }
  }

  return config;
});

// ⚠️ Interceptor para manejar errores comunes
axiosInstancia.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const ruta = error.config?.url || 'ruta desconocida';

    if (status === 401) {
      console.warn(`🔐 Token inválido o expirado → ${ruta}`);
      // Opcional: limpieza automática
      // localStorage.clear();
      // sessionStorage.clear();
    }

    if (status === 403) {
      console.warn(`🚫 Acceso denegado por permisos → ${ruta}`);
    }

    return Promise.reject(error);
  }
);

export default axiosInstancia;
