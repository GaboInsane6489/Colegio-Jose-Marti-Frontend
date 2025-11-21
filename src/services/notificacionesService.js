import axiosInstancia from './axiosInstancia';

/**
 * 🔔 Obtiene notificaciones de un usuario
 */
export const getNotificacionesUsuario = (usuarioId) =>
  axiosInstancia.get(`/notificaciones/usuario/${usuarioId}`);

/**
 * 📌 Marca una notificación como leída
 */
export const marcarNotificacionLeida = (idNotificacion) =>
  axiosInstancia.put(`/notificaciones/${idNotificacion}/leido`);
