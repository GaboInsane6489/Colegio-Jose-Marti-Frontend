import axios from "axios";

// 🌐 URL base del backend
// Recomendado: usar import.meta.env.VITE_API_URL para entornos productivos
const API_URL = "http://localhost:3000";

/**
 * 🔐 Login universal para estudiantes, docentes y administradores
 * Envia solo email y password, como espera el backend.
 */
export const loginUsuario = (email, password) =>
  axios.post(`${API_URL}/api/auth/login`, { email, password });

/**
 * 📝 Registro de usuario desde frontend
 * Crea un usuario con rol "estudiante" por defecto.
 * Queda pendiente de validación por el administrador.
 */
export const registerUsuario = (nombre, email, password) =>
  axios.post(`${API_URL}/api/auth/register`, {
    nombre,
    email,
    password,
    role: "estudiante",
  });

/**
 * 📡 Verificación de sesión activa
 * Utiliza el token para validar sesión y obtener rol del usuario.
 */
export const pingUsuario = (token) =>
  axios.get(`${API_URL}/api/auth/ping`, {
    headers: { Authorization: `Bearer ${token}` },
  });
