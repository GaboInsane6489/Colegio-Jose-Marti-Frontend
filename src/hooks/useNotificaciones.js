import { useState, useEffect, useCallback } from 'react';
import axiosInstancia from '@/services/axiosInstancia';
import { esObjectIdValido } from '@/utils/helpers.js';

/**
 * 🔔 Hook institucional para obtener y gestionar notificaciones por usuario
 */
const useNotificaciones = (usuarioId) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchNotificaciones = useCallback(async () => {
    if (!esObjectIdValido(usuarioId)) {
      console.warn('⚠️ ID de usuario inválido:', usuarioId);
      setError('ID de usuario inválido o no especificado.');
      setData([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('📡 Solicitando notificaciones para usuario:', usuarioId);
      const { data: response } = await axiosInstancia.get(`/notificaciones/usuario/${usuarioId}`);

      if (Array.isArray(response.notificaciones)) {
        const limpias = response.notificaciones.filter((n) => typeof n?._id === 'string');
        setData(limpias);
        console.log('✅ Notificaciones válidas recibidas:', limpias);
      } else {
        console.warn('⚠️ Respuesta inesperada del backend:', response);
        setData([]);
        setError(response.msg || 'Respuesta inesperada del servidor');
      }
    } catch (err) {
      const mensaje =
        err.response?.data?.msg || err.message || 'No se pudieron cargar las notificaciones.';
      console.error('❌ Error al obtener notificaciones:', mensaje);
      setError(mensaje);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [usuarioId]);

  const marcarComoLeida = async (notificacionId) => {
    try {
      await axiosInstancia.put(`/notificaciones/${notificacionId}/leido`);
      setData((prev) => prev.map((n) => (n._id === notificacionId ? { ...n, leido: true } : n)));
      console.log(`📨 Notificación ${notificacionId} marcada como leída.`);
    } catch (err) {
      console.error('❌ Error al marcar como leída:', err.message);
    }
  };

  useEffect(() => {
    fetchNotificaciones();
  }, [fetchNotificaciones]);

  return {
    data, // notificaciones válidas
    loading,
    error,
    marcarComoLeida,
    refetch: fetchNotificaciones,
    setData,
  };
};

export default useNotificaciones;
