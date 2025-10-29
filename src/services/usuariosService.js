import axiosInstancia from "./axiosInstancia";

/**
 * 🧑‍💼 Obtiene todos los usuarios registrados (solo admin)
 */
export const obtenerUsuarios = () => {
  return axiosInstancia.get("/api/admin/usuarios");
};

/**
 * ✅ Valida un usuario pendiente (solo admin)
 */
export const validarUsuario = (idUsuario) => {
  return axiosInstancia.post(`/api/admin/usuarios/${idUsuario}/validar`);
};

/**
 * ✏️ Actualiza datos de un usuario
 */
export const actualizarUsuario = (idUsuario, datosActualizados) => {
  return axiosInstancia.put(
    `/api/admin/usuarios/${idUsuario}`,
    datosActualizados
  );
};

/**
 * 🗑️ Elimina un usuario
 */
export const eliminarUsuario = (idUsuario) => {
  return axiosInstancia.delete(`/api/admin/usuarios/${idUsuario}`);
};
