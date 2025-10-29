import axiosInstancia from "./axiosInstancia";

/**
 * 🔐 Login universal para estudiantes, docentes y administradores
 * Envia solo email y password, como espera el backend.
 */
export const loginUsuario = (email, password) => {
  if (!email || !password)
    throw new Error("Email y contraseña son obligatorios.");
  return axiosInstancia.post("/api/auth/login", { email, password });
};

/**
 * 📝 Registro de usuario desde frontend
 * Crea un usuario con rol "estudiante" por defecto.
 * Queda pendiente de validación por el administrador.
 */
export const registerUsuario = (nombre, email, password) => {
  if (!nombre || !email || !password)
    throw new Error("Todos los campos son obligatorios.");
  return axiosInstancia.post("/api/auth/register", {
    nombre,
    email,
    password,
    role: "estudiante",
  });
};

/**
 * 📡 Verificación de sesión activa
 * Utiliza el token para validar sesión y obtener rol del usuario.
 * El token ya es gestionado por el interceptor.
 */
export const pingUsuario = () => {
  return axiosInstancia.get("/api/auth/ping");
};
