import axiosInstancia from './axiosInstancia';

/**
 * 📊 Obtiene métricas institucionales (solo admin)
 */
export const obtenerEstadisticas = () => {
  return axiosInstancia.get('/admin/estadisticas');
};
