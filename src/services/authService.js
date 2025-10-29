import axios from "axios";

// 🌐 URL base del backend desde entorno
const API_URL = import.meta.env.VITE_API_URL?.trim();

if (!API_URL) {
  console.warn("⚠️ VITE_API_URL no está definido en el entorno.");
}

/**
 * 🔐 Login universal para estudiantes, docentes y administradores
 * Envia solo email y password, como espera el backend.
 */
export const loginUsuario = (email, password) => {
  if (!API_URL) throw new Error("API_URL no está definido.");
  return axios.post(`${API_URL}/api/auth/login`, { email, password });
};

/**
 * 📝 Registro de usuario desde frontend
 * Crea un usuario con rol "estudiante" por defecto.
 * Queda pendiente de validación por el administrador.
 */
export const registerUsuario = (nombre, email, password) => {
  if (!API_URL) throw new Error("API_URL no está definido.");
  return axios.post(`${API_URL}/api/auth/register`, {
    nombre,
    email,
    password,
    role: "estudiante",
  });
};

/**
 * 📡 Verificación de sesión activa
 * Utiliza el token para validar sesión y obtener rol del usuario.
 */
export const pingUsuario = (token) => {
  if (!API_URL) throw new Error("API_URL no está definido.");
  if (!token) throw new Error("Token no proporcionado.");
  return axios.get(`${API_URL}/api/auth/ping`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
