import axiosInstancia from "./axiosInstancia";

/**
 * 📄 Obtiene las notas del estudiante autenticado
 */
export const obtenerNotasEstudiante = () => {
  return axiosInstancia.get("/api/estudiante/notas");
};

/**
 * 🧑‍🏫 Obtiene todas las notas gestionadas por el docente
 */
export const obtenerNotasDocente = () => {
  return axiosInstancia.get("/api/docente/notas");
};

/**
 * ✏️ Actualiza una nota específica
 */
export const actualizarNota = (idNota, nuevaCalificacion) => {
  return axiosInstancia.put(`/api/notas/${idNota}`, {
    calificacion: nuevaCalificacion,
  });
};

/**
 * 📤 Exporta las notas del docente como CSV (respuesta es un blob)
 */
export const exportarNotasCSV = () => {
  return axiosInstancia.get("/api/docente/notas/exportar", {
    responseType: "blob",
  });
};
