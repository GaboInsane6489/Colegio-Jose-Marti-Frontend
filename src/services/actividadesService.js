import axiosInstancia from './axiosInstancia';

/**
 * 📋 Obtiene actividades del estudiante filtradas por claseIds
 * @param {Array<string>} claseIds - IDs de clases a filtrar
 */
export const getActividadesEstudiante = (claseIds = []) => {
  return axiosInstancia.post('/api/estudiante/actividades', { claseIds }); // ✅ correcto
};

/**
 * 🧑‍🏫 Obtiene actividades gestionadas por el docente con filtros dinámicos
 * @param {Object} filtros - cursoId, claseId, tipo, estado, materia, lapso
 */
export const getActividadesDocente = (filtros = {}) => {
  return axiosInstancia.get('/api/docente/actividades', { params: filtros }); // ✅ corregido
};

/**
 * 🆕 Crea una nueva actividad (solo para docentes)
 * @param {Object} datosActividad - incluye estado, recursos {url,tipo}, notificadaA
 */
export const createActividadDocente = (datosActividad) => {
  return axiosInstancia.post('/api/docente/actividades', datosActividad); // ✅ corregido
};

/**
 * ✏️ Actualiza una actividad existente (docente)
 * @param {string} idActividad
 * @param {Object} datosActualizados
 */
export const updateActividadDocente = (idActividad, datosActualizados) => {
  return axiosInstancia.put(`/api/docente/actividades/${idActividad}`, datosActualizados); // ✅ corregido
};

/**
 * 🗑️ Elimina una actividad (docente)
 * @param {string} idActividad
 */
export const deleteActividadDocente = (idActividad) => {
  return axiosInstancia.delete(`/api/docente/actividades/${idActividad}`); // ✅ corregido
};
