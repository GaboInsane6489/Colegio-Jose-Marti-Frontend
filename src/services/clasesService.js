import axiosInstancia from './axiosInstancia';

/**
 * 📚 Obtiene clases del estudiante
 */
export const getClasesEstudiante = async () => {
  try {
    const res = await axiosInstancia.get('/estudiante/clases');
    return { ok: true, clases: res.data.clases || [] };
  } catch (error) {
    return {
      ok: false,
      msg: error.response?.data?.msg || 'Error al obtener clases del estudiante',
    };
  }
};

/**
 * 👨‍🏫 Obtiene clases del docente
 */
export const getClasesDocente = async () => {
  try {
    const res = await axiosInstancia.get('/docente/clases');
    return { ok: true, clases: res.data.clases || [] };
  } catch (error) {
    return {
      ok: false,
      msg: error.response?.data?.msg || 'Error al obtener clases del docente',
    };
  }
};

/**
 * 🆕 Crea una nueva clase (solo admin)
 */
export const createClase = async (datosClase) => {
  try {
    const res = await axiosInstancia.post('/admin/clases', datosClase);
    return { ok: true, clase: res.data.clase };
  } catch (error) {
    return {
      ok: false,
      msg: error.response?.data?.msg || 'Error al crear clase',
    };
  }
};

/**
 * ✏️ Actualiza una clase existente (solo admin)
 */
export const updateClase = async (idClase, datosActualizados) => {
  try {
    const res = await axiosInstancia.put(`/admin/clases/${idClase}`, datosActualizados);
    return { ok: true, clase: res.data.clase };
  } catch (error) {
    return {
      ok: false,
      msg: error.response?.data?.msg || 'Error al actualizar clase',
    };
  }
};

/**
 * 🗑️ Elimina una clase (solo admin)
 */
export const deleteClase = async (idClase) => {
  try {
    const res = await axiosInstancia.delete(`/admin/clases/${idClase}`);
    return { ok: true, msg: res.data.msg };
  } catch (error) {
    return {
      ok: false,
      msg: error.response?.data?.msg || 'Error al eliminar clase',
    };
  }
};

/**
 * 📥 Obtiene docentes activos y validados
 */
export const getDocentes = async () => {
  try {
    const res = await axiosInstancia.get('/usuarios', { params: { role: 'docente' } });
    return { ok: true, docentes: res.data.usuarios || [] };
  } catch (error) {
    return {
      ok: false,
      msg: error.response?.data?.msg || 'Error al obtener docentes',
    };
  }
};

/**
 * 👨‍🎓 Obtiene estudiantes activos y validados
 */
export const getEstudiantes = async () => {
  try {
    const res = await axiosInstancia.get('/usuarios', { params: { role: 'estudiante' } });
    return { ok: true, estudiantes: res.data.usuarios || [] };
  } catch (error) {
    return {
      ok: false,
      msg: error.response?.data?.msg || 'Error al obtener estudiantes',
    };
  }
};

/**
 * 🧠 Obtiene todas las clases (solo admin)
 */
export const getClasesAdmin = async () => {
  try {
    const res = await axiosInstancia.get('/admin/clases');
    return { ok: true, clases: res.data.clases || [] };
  } catch (error) {
    return {
      ok: false,
      msg: error.response?.data?.msg || 'Error al obtener todas las clases',
    };
  }
};

/**
 * 📘 Obtiene una clase por ID (solo admin)
 */
export const getClaseById = async (idClase) => {
  try {
    const res = await axiosInstancia.get(`/admin/clases/${idClase}`);
    return { ok: true, clase: res.data.clase };
  } catch (error) {
    return {
      ok: false,
      msg: error.response?.data?.msg || 'Error al obtener clase por ID',
    };
  }
};

/**
 * 📌 Asigna estudiantes a una clase (admin)
 */
export const assignEstudiantesToClaseAdmin = async (claseId, estudiantesIds) => {
  try {
    const res = await axiosInstancia.post('/admin/clases/asignar-estudiantes', {
      claseId,
      estudiantesIds,
    });
    return { ok: true, msg: res.data.msg, clase: res.data.clase };
  } catch (error) {
    return {
      ok: false,
      msg: error.response?.data?.msg || 'Error al asignar estudiantes (admin)',
    };
  }
};

/**
 * 📌 Asigna estudiantes a una clase (docente)
 */
export const assignEstudiantesToClaseDocente = async (claseId, estudiantesIds) => {
  try {
    const res = await axiosInstancia.post('/docente/clases/asignar-estudiantes', {
      claseId,
      estudiantesIds,
    });
    return { ok: true, msg: res.data.msg, clase: res.data.clase };
  } catch (error) {
    return {
      ok: false,
      msg: error.response?.data?.msg || 'Error al asignar estudiantes (docente)',
    };
  }
};
