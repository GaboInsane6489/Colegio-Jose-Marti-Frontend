import axiosInstancia from './axiosInstancia';

/**
 * 📚 Obtiene todos los cursos (vista general, docente)
 */
export const getCursosDocente = async () => {
  try {
    const res = await axiosInstancia.get('/docente/cursos');
    return { ok: true, cursos: res.data.cursos || [] };
  } catch (error) {
    console.error('❌ Error al obtener cursos docente:', error.message);
    return {
      ok: false,
      msg: error.response?.data?.msg || 'Error al obtener cursos docente',
    };
  }
};

/**
 * 🧑‍💼 Obtiene cursos administrados (solo admin)
 */
export const getCursosAdmin = async () => {
  try {
    const res = await axiosInstancia.get('/admin/cursos');
    return { ok: true, cursos: res.data.cursos || [] };
  } catch (error) {
    console.error('❌ Error al obtener cursos admin:', error.message);
    return {
      ok: false,
      msg: error.response?.data?.msg || 'Error al obtener cursos admin',
    };
  }
};

/**
 * 🆕 Crear curso (docente)
 */
export const createCursoDocente = async (data) => {
  try {
    const res = await axiosInstancia.post('/docente/cursos', {
      nombre: data.nombre,
      anioAcademico: data.anioAcademico,
      anioEstudiantil: data.anioEstudiantil,
      seccion: data.seccion,
      descripcion: data.descripcion,
      materias: data.materias || [],
      estudiantes: data.estudiantes || [],
    });
    return { ok: true, curso: res.data.curso };
  } catch (error) {
    console.error('❌ Error al crear curso docente:', error.message);
    return {
      ok: false,
      msg: error.response?.data?.msg || 'Error al crear curso docente',
    };
  }
};

/**
 * 🆕 Crear curso (admin)
 */
export const createCursoAdmin = async (data) => {
  try {
    const res = await axiosInstancia.post('/admin/cursos', {
      nombre: data.nombre,
      anioAcademico: data.anioAcademico,
      anioEstudiantil: data.anioEstudiantil,
      seccion: data.seccion,
      descripcion: data.descripcion,
      materias: data.materias || [],
      estudiantes: data.estudiantes || [],
    });
    return { ok: true, curso: res.data.curso };
  } catch (error) {
    console.error('❌ Error al crear curso admin:', error.message);
    return {
      ok: false,
      msg: error.response?.data?.msg || 'Error al crear curso admin',
    };
  }
};

/**
 * ✏️ Actualizar curso (docente)
 */
export const updateCursoDocente = async (idCurso, data) => {
  try {
    const res = await axiosInstancia.put(`/docente/cursos/${idCurso}`, {
      nombre: data.nombre,
      anioAcademico: data.anioAcademico,
      anioEstudiantil: data.anioEstudiantil,
      seccion: data.seccion,
      descripcion: data.descripcion,
      materias: data.materias || [],
      estudiantes: data.estudiantes || [],
    });
    return { ok: true, curso: res.data.curso };
  } catch (error) {
    console.error('❌ Error al actualizar curso docente:', error.message);
    return {
      ok: false,
      msg: error.response?.data?.msg || 'Error al actualizar curso docente',
    };
  }
};

/**
 * ✏️ Actualizar curso (admin)
 */
export const updateCursoAdmin = async (idCurso, data) => {
  try {
    const res = await axiosInstancia.put(`/admin/cursos/${idCurso}`, {
      nombre: data.nombre,
      anioAcademico: data.anioAcademico,
      anioEstudiantil: data.anioEstudiantil,
      seccion: data.seccion,
      descripcion: data.descripcion,
      materias: data.materias || [],
      estudiantes: data.estudiantes || [],
    });
    return { ok: true, curso: res.data.curso };
  } catch (error) {
    console.error('❌ Error al actualizar curso admin:', error.message);
    return {
      ok: false,
      msg: error.response?.data?.msg || 'Error al actualizar curso admin',
    };
  }
};

/**
 * 🗑️ Eliminar curso (docente)
 */
export const deleteCursoDocente = async (idCurso) => {
  try {
    const res = await axiosInstancia.delete(`/docente/cursos/${idCurso}`);
    return { ok: true, msg: res.data.msg };
  } catch (error) {
    console.error('❌ Error al eliminar curso docente:', error.message);
    return {
      ok: false,
      msg: error.response?.data?.msg || 'Error al eliminar curso docente',
    };
  }
};

/**
 * 🗑️ Eliminar curso (admin)
 */
export const deleteCursoAdmin = async (idCurso) => {
  try {
    const res = await axiosInstancia.delete(`/admin/cursos/${idCurso}`);
    return { ok: true, msg: res.data.msg };
  } catch (error) {
    console.error('❌ Error al eliminar curso admin:', error.message);
    return {
      ok: false,
      msg: error.response?.data?.msg || 'Error al eliminar curso admin',
    };
  }
};
