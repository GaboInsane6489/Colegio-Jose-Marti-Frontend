import axios from 'axios';

// 📦 URL base desde entorno institucional
const API_URL = import.meta.env.VITE_API_URL?.trim();

if (!API_URL) {
  console.warn('⚠️ VITE_API_URL no está definido. Verifica tu entorno.');
  // Opcional: puedes lanzar error si es crítico
  // throw new Error("VITE_API_URL no definido");
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

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn('⚠️ Token no encontrado en almacenamiento.');
  }

  return config;
});

// ⚠️ Interceptor para manejar errores comunes
axiosInstancia.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      console.warn('🔐 Token inválido o expirado. Considera limpiar sesión.');
      // Opcional: limpieza defensiva
      // localStorage.removeItem("token");
      // sessionStorage.removeItem("token");
    }

    if (status === 403) {
      console.warn('🚫 Acceso denegado. Verifica permisos.');
    }

    return Promise.reject(error);
  }
);

export default axiosInstancia;
