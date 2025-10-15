import axios from "axios";

// 🌐 URL base del backend (puedes usar import.meta.env si prefieres)
const API_URL = "http://localhost:3000";

// 🔐 Login de estudiante o usuario general
export const loginUsuario = (correo, password) =>
  axios.post(`${API_URL}/api/auth/login`, { correo, password });

// 🔐 Login exclusivo para docentes
export const loginDocente = (correo, password) =>
  axios.post(`${API_URL}/api/docentes/login`, { correo, password });

// 📝 Registro de usuario (estudiante por defecto)
export const registerUsuario = (nombre, correo, password) =>
  axios.post(`${API_URL}/api/auth/register`, {
    nombre,
    correo,
    password,
    role: "estudiante",
  });

// 📡 Verificación de sesión con token
export const pingUsuario = (token) =>
  axios.get(`${API_URL}/api/auth/ping`, {
    headers: { Authorization: `Bearer ${token}` },
  });
