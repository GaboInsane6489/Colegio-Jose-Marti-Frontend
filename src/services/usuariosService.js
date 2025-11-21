import axiosInstancia from './axiosInstancia';

/**
 * 📝 Registrar un nuevo usuario
 * @param {Object} datos - { nombre, email, password, role }
 */
export const registerUsuario = async (datos) => {
  try {
    const res = await axiosInstancia.post('/auth/register', datos);
    return res;
  } catch (error) {
    console.error('❌ Error en registerUsuario:', error.message);
    throw error;
  }
};

/**
 * 🧑‍💼 Obtiene todos los usuarios registrados
 * ⚠️ Solo accesible para admin
 * @param {string} role - opcional, filtra por rol (admin|docente|estudiante)
 */
export const obtenerUsuarios = (role) => {
  return axiosInstancia.get('/admin/usuarios', {
    params: role ? { role } : {},
  });
};

/**
 * 📋 Obtiene usuarios pendientes de validación
 * ⚠️ Solo accesible para admin
 */
export const obtenerPendientes = () => {
  return axiosInstancia.get('/admin/usuarios', {
    params: { isValidated: false },
  });
};

/**
 * ✅ Valida un usuario pendiente
 * ⚠️ Solo accesible para admin
 * @param {string} idUsuario
 */
export const validarUsuarioPendiente = (idUsuario) => {
  if (!idUsuario) {
    console.error('❌ Error: idUsuario no proporcionado a validarUsuarioPendiente');
    throw new Error('ID de usuario inválido para validación');
  }
  return axiosInstancia.patch(`/admin/validar/${idUsuario}`);
};

/**
 * ✏️ Actualiza datos de un usuario
 * ⚠️ Solo accesible para admin
 * @param {string} idUsuario
 * @param {Object} datosActualizados
 */
export const actualizarUsuario = (idUsuario, datosActualizados) => {
  if (!idUsuario) {
    console.error('❌ Error: idUsuario no proporcionado a actualizarUsuario');
    throw new Error('ID de usuario inválido para actualización');
  }
  return axiosInstancia.put(`/admin/actualizar/${idUsuario}`, datosActualizados);
};

/**
 * 🗑️ Rechaza (elimina) un usuario pendiente
 * ⚠️ Solo accesible para admin
 * @param {string} idUsuario
 */
export const rechazarUsuarioPendiente = (idUsuario) => {
  if (!idUsuario) {
    console.error('❌ Error: idUsuario no proporcionado a rechazarUsuarioPendiente');
    throw new Error('ID de usuario inválido para eliminación');
  }
  return axiosInstancia.delete(`/admin/rechazar/${idUsuario}`);
};

/**
 * 📥 Obtiene docentes activos y validados
 * ⚠️ Solo accesible para admin
 */
export const getDocentes = async () => {
  try {
    const res = await axiosInstancia.get('/usuarios', {
      params: { role: 'docente', isValidated: true },
    });
    const lista = Array.isArray(res.data.docentes || res.data.usuarios)
      ? (res.data.docentes || res.data.usuarios).map((u) => ({ ...u, id: u.id || u._id }))
      : [];
    console.log('📥 Docentes obtenidos:', lista);
    return { ok: true, docentes: lista };
  } catch (error) {
    console.error('❌ Error al obtener docentes:', error.message);
    return {
      ok: false,
      msg: error.response?.data?.msg || 'Error al obtener docentes',
    };
  }
};

/**
 * 👨‍🎓 Obtiene estudiantes activos y validados
 * ✅ Accesible para admin y docente
 */
export const getEstudiantes = async () => {
  try {
    const res = await axiosInstancia.get('/usuarios', {
      params: { role: 'estudiante', isValidated: true }, // ✅ filtro añadido
    });
    const lista = Array.isArray(res.data.estudiantes || res.data.usuarios)
      ? (res.data.estudiantes || res.data.usuarios).map((u) => ({ ...u, id: u.id || u._id }))
      : [];
    console.log('👨‍🎓 Estudiantes obtenidos:', lista);
    return { ok: true, estudiantes: lista };
  } catch (error) {
    console.error('❌ Error al obtener estudiantes:', error.message);
    return {
      ok: false,
      msg: error.response?.data?.msg || 'Error al obtener estudiantes',
    };
  }
};
