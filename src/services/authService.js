import axiosInstancia from './axiosInstancia';

/**
 * 🔐 Login universal para estudiantes, docentes y administradores
 * Envia email y password, recibe token y rol.
 * Guarda sesión y permite redirección inmediata.
 */
export const loginUsuario = async (email, password) => {
  if (!email || !password) {
    throw new Error('Email y contraseña son obligatorios.');
  }

  try {
    const res = await axiosInstancia.post('/api/auth/login', { email, password });

    const { token, role } = res?.data || {};

    if (!token || !role || typeof role !== 'string') {
      console.warn('⚠️ Login sin token o rol válido:', res.data);
      throw new Error('No se recibió token o rol válido en la respuesta.');
    }

    // 🧠 Guardar sesión institucional
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', role);
    document.cookie = `userRole=${role}; path=/`;

    return { token, role };
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
export const registerUsuario = async (payload) => {
  const { nombre, email, password } = payload;

  if (!nombre || !email || !password) {
    throw new Error('Todos los campos son obligatorios.');
  }

  try {
    const res = await axiosInstancia.post('/api/auth/register', {
      nombre,
      email,
      password,
      role: 'estudiante', // 🔐 Rol forzado desde frontend
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

    if (!res?.data?.role || typeof res.data.role !== 'string') {
      console.warn('⚠️ Ping sin rol válido:', res.data);
      throw new Error('No se recibió rol válido en la verificación.');
    }

    return res;
  } catch (err) {
    console.error('❌ Error en pingUsuario:', err);
    throw err;
  }
};
