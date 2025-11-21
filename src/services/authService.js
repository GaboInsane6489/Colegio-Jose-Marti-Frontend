import axiosInstancia from './axiosInstancia';

/**
 * 🔐 Login universal para estudiantes, docentes y administradores
 * @param {string} email - Correo institucional
 * @param {string} password - Contraseña
 * @param {boolean} mantenerSesion - Si se debe guardar en localStorage
 */
export const loginUsuario = async (email, password, mantenerSesion = false) => {
  if (!email || !password) {
    throw new Error('Email y contraseña son obligatorios.');
  }

  try {
    const res = await axiosInstancia.post('/auth/login', { email, password });
    console.log('🔍 Respuesta del backend:', res.data);

    const { token, role, usuario } = res.data || {};
    if (!token || !usuario?.id || !usuario?.email || !role) {
      throw new Error('Respuesta inválida del backend en login.');
    }

    // ✅ Guardar sesión institucional con usuario completo
    const storage = mantenerSesion ? localStorage : sessionStorage;
    storage.setItem('token', token);
    storage.setItem('userRole', role);
    storage.setItem('usuario', JSON.stringify(usuario));

    document.cookie = `userRole=${role}; path=/`;

    return { token, ...usuario, role };
  } catch (err) {
    console.error('❌ Error en loginUsuario:', err);
    localStorage.clear();
    sessionStorage.clear();
    document.cookie = 'userRole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    throw err;
  }
};

/**
 * 📝 Registro de usuario (rol estudiante por defecto)
 * Queda pendiente de validación por el administrador.
 * @param {Object} payload - { nombre, email, password }
 */
export const registerUsuario = async ({ nombre, email, password }) => {
  if (!nombre || !email || !password) {
    throw new Error('Todos los campos son obligatorios.');
  }

  try {
    const res = await axiosInstancia.post('/auth/register', {
      nombre,
      email,
      password,
      role: 'estudiante',
    });
    return res.data;
  } catch (err) {
    console.error('❌ Error en registerUsuario:', err);
    throw err;
  }
};

/**
 * 📡 Verificación de sesión activa
 * Devuelve { id, email, role, isValidated, active, nombre, ... }
 */
export const pingUsuario = async () => {
  try {
    const res = await axiosInstancia.get('/auth/ping');
    console.log('🔍 Ping recibido:', res.data);

    const { role, usuario } = res.data || {};
    if (!usuario?.id || !usuario?.email || !role) {
      throw new Error('Respuesta inválida del backend en ping.');
    }

    // ✅ devolver usuario completo
    return { ...usuario, role };
  } catch (err) {
    console.error('❌ Error en pingUsuario:', err);
    throw err;
  }
};

/**
 * 🚪 Cierre de sesión institucional
 * Limpia token, rol y cookies
 */
export const logoutUsuario = () => {
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('usuario');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('usuario');
    document.cookie = 'userRole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    return { ok: true, msg: 'Sesión cerrada correctamente' };
  } catch (err) {
    console.error('❌ Error en logoutUsuario:', err);
    return { ok: false, msg: 'Error al cerrar sesión' };
  }
};
