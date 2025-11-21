import axios from 'axios';

// 📦 URL base institucional dinámica con prefijo /api
const API_URL =
  import.meta.env?.VITE_API_URL?.trim() ||
  (window.location.hostname === 'localhost'
    ? 'http://localhost:3000'
    : 'https://backend-render-url.onrender.com');

if (!API_URL) {
  console.warn('⚠️ VITE_API_URL no está definido. Verifica tu entorno.');
}

const axiosInstancia = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // asegura envío de cookies si backend las usa
});

// 🔐 Interceptor para agregar token automáticamente
axiosInstancia.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  if (token && typeof token === 'string' && token.length > 10) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    if (
      import.meta.env.MODE === 'development' &&
      !config.url.includes('/auth/login') &&
      !config.url.includes('/auth/register')
    ) {
      console.warn('⚠️ Token no encontrado o inválido en almacenamiento.');
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

    // 🧹 Limpieza defensiva
    const limpiarSesion = () => {
      localStorage.clear();
      sessionStorage.clear();
      document.cookie = 'userRole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    };

    if (status === 401) {
      console.warn(`🔐 Token inválido o expirado → ${ruta}`);
      limpiarSesion();
      window.location.href = '/login';
    }

    if (status === 403) {
      console.warn(`🚫 Acceso denegado por permisos → ${ruta}`);
      limpiarSesion();
      window.location.href = '/login'; // Evita pop-up y bug visual
    }

    if (import.meta.env.MODE === 'development') {
      console.error('❌ Error en Axios:', error);
    }

    return Promise.reject(error);
  }
);

export default axiosInstancia;
