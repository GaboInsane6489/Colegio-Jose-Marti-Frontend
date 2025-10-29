import axiosInstancia from "./axiosInstancia";

/**
 * 📋 Obtiene todas las actividades del estudiante
 */
export const obtenerActividadesEstudiante = () => {
  return axiosInstancia.get("/api/estudiante/actividades");
};

/**
 * 🧑‍🏫 Obtiene todas las actividades gestionadas por el docente
 */
export const obtenerActividadesDocente = () => {
  return axiosInstancia.get("/api/docente/actividades");
};

/**
 * 🆕 Crea una nueva actividad (solo para docentes)
 */
export const crearActividad = (datosActividad) => {
  return axiosInstancia.post("/api/actividades", datosActividad);
};

/**
 * ✏️ Actualiza una actividad existente
 */
export const actualizarActividad = (idActividad, datosActualizados) => {
  return axiosInstancia.put(
    `/api/actividades/${idActividad}`,
    datosActualizados
  );
};

/**
 * 🗑️ Elimina una actividad
 */
export const eliminarActividad = (idActividad) => {
  return axiosInstancia.delete(`/api/actividades/${idActividad}`);
};
