import axiosInstancia from './axiosInstancia'; // ✅ Ruta corregida

const obtenerToken = () => localStorage.getItem('token') || sessionStorage.getItem('token');

export const obtenerClasesEstudiante = async () => {
  try {
    const token = obtenerToken();
    const res = await axiosInstancia.get('/api/estudiante/clases', {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('📚 Clases del estudiante:', res.data.clases);
    return { ok: true, clases: res.data.clases };
  } catch (error) {
    console.error('❌ Error al obtener clases del estudiante:', error.message);
    return {
      ok: false,
      msg: error.response?.data?.msg || 'Error al obtener clases del estudiante',
    };
  }
};

export const obtenerClasesDocente = async () => {
  try {
    const token = obtenerToken();
    const res = await axiosInstancia.get('/api/docente/clases', {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('👨‍🏫 Clases del docente:', res.data.clases);
    return { ok: true, clases: res.data.clases };
  } catch (error) {
    console.error('❌ Error al obtener clases del docente:', error.message);
    return {
      ok: false,
      msg: error.response?.data?.msg || 'Error al obtener clases del docente',
    };
  }
};

export const crearClase = async (datosClase) => {
  try {
    const token = obtenerToken();
    const res = await axiosInstancia.post('/api/clases', datosClase, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('✅ Clase creada:', res.data.clase);
    return { ok: true, clase: res.data.clase };
  } catch (error) {
    console.error('❌ Error al crear clase:', error.message);
    return {
      ok: false,
      msg: error.response?.data?.msg || 'Error al crear clase',
    };
  }
};

export const actualizarClase = async (idClase, datosActualizados) => {
  try {
    const token = obtenerToken();
    const res = await axiosInstancia.put(`/api/clases/${idClase}`, datosActualizados, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('✏️ Clase actualizada:', res.data.clase);
    return { ok: true, clase: res.data.clase };
  } catch (error) {
    console.error('❌ Error al actualizar clase:', error.message);
    return {
      ok: false,
      msg: error.response?.data?.msg || 'Error al actualizar clase',
    };
  }
};

export const eliminarClase = async (idClase) => {
  try {
    const token = obtenerToken();
    const res = await axiosInstancia.delete(`/api/clases/${idClase}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('🗑️ Clase eliminada:', res.data.clase);
    return { ok: true, msg: res.data.msg };
  } catch (error) {
    console.error('❌ Error al eliminar clase:', error.message);
    return {
      ok: false,
      msg: error.response?.data?.msg || 'Error al eliminar clase',
    };
  }
};

export const obtenerDocentes = async () => {
  try {
    const token = obtenerToken();
    const res = await axiosInstancia.get('/api/usuarios?role=docente', {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('📥 Docentes obtenidos:', res.data.usuarios);
    return { ok: true, docentes: res.data.usuarios };
  } catch (error) {
    console.error('❌ Error al obtener docentes:', error.message);
    return {
      ok: false,
      msg: error.response?.data?.msg || 'Error al obtener docentes',
    };
  }
};

export const obtenerEstudiantes = async () => {
  try {
    const token = obtenerToken();
    const res = await axiosInstancia.get('/api/usuarios?role=estudiante', {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('👨‍🎓 Estudiantes obtenidos:', res.data.usuarios);
    return { ok: true, estudiantes: res.data.usuarios };
  } catch (error) {
    console.error('❌ Error al obtener estudiantes:', error.message);
    return {
      ok: false,
      msg: error.response?.data?.msg || 'Error al obtener estudiantes',
    };
  }
};

export const obtenerTodasClases = async () => {
  try {
    const token = obtenerToken();
    const res = await axiosInstancia.get('/api/admin/clases', {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('🧠 Clases obtenidas por admin:', res.data.clases);
    return { ok: true, clases: res.data.clases };
  } catch (error) {
    console.error('❌ Error al obtener todas las clases:', error.message);
    return {
      ok: false,
      msg: error.response?.data?.msg || 'Error al obtener todas las clases',
    };
  }
};
