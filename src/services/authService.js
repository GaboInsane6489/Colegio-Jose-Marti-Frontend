import axiosInstancia from './axiosInstancia';

/**
 * 🔐 Login universal para estudiantes, docentes y administradores
 * Envia email y password, recibe token, rol y usuario.
 * Guarda sesión y permite redirección inmediata.
 * @param {string} email - Correo institucional
 * @param {string} password - Contraseña
 * @param {boolean} mantenerSesion - Si se debe guardar en localStorage
 */
export const loginUsuario = async (email, password, mantenerSesion = false) => {
  if (!email || !password) {
    throw new Error('Email y contraseña son obligatorios.');
  }

  try {
    const res = await axiosInstancia.post('/api/auth/login', { email, password });

    // 🔍 Verifica qué responde el backend
    console.log('🔍 Respuesta completa:', res);

    // ✅ Lectura blindada del token, rol y usuario
    const token = res?.data?.token || res?.data?.accessToken || res?.data?.jwt;
    const role = res?.data?.role;
    const usuario = res?.data?.usuario;

    if (!token || !role || !usuario || typeof role !== 'string' || typeof usuario !== 'object') {
      console.warn('⚠️ Login sin token, rol o usuario válido:', res.data);

      // 🧹 Limpieza defensiva si la respuesta es inválida
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      localStorage.removeItem('userRole');
      sessionStorage.removeItem('userRole');
      localStorage.removeItem('usuario');
      sessionStorage.removeItem('usuario');
      document.cookie = 'userRole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

      throw new Error('No se recibió token, rol o usuario válido en la respuesta.');
    }

    // ✅ Guardar sesión institucional antes de retornar
    const storage = mantenerSesion ? localStorage : sessionStorage;
    storage.setItem('token', token);
    storage.setItem('userRole', role);
    storage.setItem('usuario', JSON.stringify(usuario));
    document.cookie = `userRole=${role}; path=/`;

    // 🧠 Confirmación explícita para el interceptor
    console.info('🔐 Token y sesión guardados correctamente.');

    return { token, role, usuario };
  } catch (err) {
    console.error('❌ Error en loginUsuario:', err);

    // 🧹 Limpieza defensiva si el login falla
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    localStorage.removeItem('userRole');
    sessionStorage.removeItem('userRole');
    localStorage.removeItem('usuario');
    sessionStorage.removeItem('usuario');
    document.cookie = 'userRole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    throw err;
  }
};

/**
 * 📝 Registro de usuario desde frontend
 * Crea un usuario con rol "estudiante" por defecto.
 * Queda pendiente de validación por el administrador.
 * @param {Object} payload - { nombre, email, password }
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

    return res.data;
  } catch (err) {
    console.error('❌ Error en registerUsuario:', err);
    throw err;
  }
};

/**
 * 📡 Verificación de sesión activa
 * Utiliza el token para validar sesión y obtener rol y usuario.
 * El token ya es gestionado por el interceptor.
 */
export const pingUsuario = async () => {
  try {
    const res = await axiosInstancia.get('/api/auth/ping');

    const role = res?.data?.role;
    const usuario = res?.data?.usuario;

    if (!role || typeof role !== 'string' || !usuario || typeof usuario !== 'object') {
      console.warn('⚠️ Ping sin rol o usuario válido:', res.data);
      throw new Error('No se recibió rol o usuario válido en la verificación.');
    }

    return res;
  } catch (err) {
    console.error('❌ Error en pingUsuario:', err);
    throw err;
  }
};
