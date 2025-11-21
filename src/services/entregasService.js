import axiosInstancia from './axiosInstancia';

/**
 * 📄 Obtiene las entregas del estudiante autenticado (incluye notas)
 */
export const getEntregasEstudiante = () => {
  return axiosInstancia.get('/api/estudiante/entregas'); // ✅ corregido
};

/**
 * 🧑‍🏫 Obtiene todas las entregas gestionadas por el docente (incluye notas)
 */
export const getEntregasDocente = () => {
  return axiosInstancia.get('/api/docente/entregas'); // ✅ corregido
};

/**
 * 📌 Obtiene entregas por actividad
 * @param {string} actividadId
 */
export const getEntregasByActividad = (actividadId) => {
  return axiosInstancia.get(`/api/docente/entregas/${actividadId}`); // ✅ corregido
};

/**
 * 📊 Obtiene entregas por curso
 * @param {string} cursoId
 */
export const getEntregasByCurso = (cursoId) => {
  return axiosInstancia.get(`/api/docente/entregas/curso/${cursoId}`); // ✅ corregido
};

/**
 * 🆕 Crea una nueva entrega (solo estudiante)
 * @param {Object} data - { archivoUrl, observaciones }
 */
export const createEntrega = (data) => {
  return axiosInstancia.post('/api/estudiante/entregas', data); // ✅ corregido
};

/**
 * ✏️ Actualiza una entrega con nota y revisión (solo docente)
 * @param {string} idEntrega
 * @param {Object} payload - { calificacion, fechaRevision, observaciones, estado }
 */
export const updateEntrega = (idEntrega, payload) => {
  return axiosInstancia.put(`/api/docente/entregas/${idEntrega}`, payload); // ✅ corregido
};

/**
 * 📤 Exporta las entregas/notas del docente como CSV
 */
export const exportEntregasCSV = () => {
  return axiosInstancia.get('/api/docente/entregas/exportar', {
    responseType: 'blob',
  }); // ✅ corregido
};
