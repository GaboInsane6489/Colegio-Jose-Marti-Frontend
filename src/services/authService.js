import axiosInstancia from './axiosInstancia';

/**
 * 🔐 Login universal para estudiantes, docentes y administradores
 * Envia solo email y password, como espera el backend.
 * Devuelve token si las credenciales son válidas.
 */
export const loginUsuario = async (email, password) => {
  if (!email || !password) {
    throw new Error('Email y contraseña son obligatorios.');
  }

  try {
    const res = await axiosInstancia.post('/api/auth/login', { email, password });

    if (!res?.data?.token) {
      console.warn('⚠️ Login sin token recibido:', res.data);
      throw new Error('No se recibió token en la respuesta.');
    }

    return res;
  } catch (err) {
    console.error('❌ Error en loginUsuario:', err);
    throw err;
  }
};

/**
 * 📝 Registro de usuario desde frontend
 * Crea un usuario con rol "estudiante" por defecto.
 * Queda pendiente de validación por el administrador.
 */
export const registerUsuario = async (nombre, email, password) => {
  if (!nombre || !email || !password) {
    throw new Error('Todos los campos son obligatorios.');
  }

  try {
    const res = await axiosInstancia.post('/api/auth/register', {
      nombre,
      email,
      password,
      role: 'estudiante',
    });

    return res;
  } catch (err) {
    console.error('❌ Error en registerUsuario:', err);
    throw err;
  }
};

/**
 * 📡 Verificación de sesión activa
 * Utiliza el token para validar sesión y obtener rol del usuario.
 * El token ya es gestionado por el interceptor.
 */
export const pingUsuario = async () => {
  try {
    const res = await axiosInstancia.get('/api/auth/ping');

    if (!res?.data?.role) {
      console.warn('⚠️ Ping sin rol recibido:', res.data);
      throw new Error('No se recibió rol en la verificación.');
    }

    return res;
  } catch (err) {
    console.error('❌ Error en pingUsuario:', err);
    throw err;
  }
};
