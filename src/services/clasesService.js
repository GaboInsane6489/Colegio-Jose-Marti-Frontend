import axiosInstancia from "./axiosInstancia";

/**
 * 📚 Obtiene las clases asignadas al estudiante
 */
export const obtenerClasesEstudiante = () => {
  return axiosInstancia.get("/api/estudiante/clases");
};

/**
 * 👨‍🏫 Obtiene las clases asignadas al docente
 */
export const obtenerClasesDocente = () => {
  return axiosInstancia.get("/api/docente/clases");
};

/**
 * 🆕 Crea una nueva clase (solo para docentes o admin)
 */
export const crearClase = (datosClase) => {
  return axiosInstancia.post("/api/clases", datosClase);
};

/**
 * ✏️ Actualiza una clase existente
 */
export const actualizarClase = (idClase, datosActualizados) => {
  return axiosInstancia.put(`/api/clases/${idClase}`, datosActualizados);
};

/**
 * 🗑️ Elimina una clase
 */
export const eliminarClase = (idClase) => {
  return axiosInstancia.delete(`/api/clases/${idClase}`);
};
