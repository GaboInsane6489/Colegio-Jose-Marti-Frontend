import { useState, useEffect, useCallback } from 'react';
import axiosInstancia from '@/services/axiosInstancia';

// 🧠 Validación ligera de ObjectId
const esObjectIdValido = (id) => typeof id === 'string' && /^[a-f\d]{24}$/i.test(id);

/**
 * 🔔 Hook institucional para obtener y gestionar notificaciones por usuario
 */
const useNotificaciones = (usuarioId) => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchNotificaciones = useCallback(async () => {
    if (!esObjectIdValido(usuarioId)) {
      console.warn('⚠️ ID de usuario inválido:', usuarioId);
      setError('ID de usuario inválido o no especificado.');
      setNotificaciones([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('📡 Solicitando notificaciones para usuario:', usuarioId);
      const { data } = await axiosInstancia.get(`/api/notificaciones/usuario/${usuarioId}`);

      if (Array.isArray(data.notificaciones)) {
        const limpias = data.notificaciones.filter((n) => typeof n._id === 'string');
        setNotificaciones(limpias);
        console.log('✅ Notificaciones válidas recibidas:', limpias);
      } else {
        console.warn('⚠️ Respuesta inesperada del backend:', data);
        setNotificaciones([]);
        setError(data.msg || 'Respuesta inesperada del servidor');
      }
    } catch (err) {
      const mensaje =
        err.response?.data?.msg || err.message || 'No se pudieron cargar las notificaciones.';
      console.error('❌ Error al obtener notificaciones:', mensaje);
      setError(mensaje);
      setNotificaciones([]);
    } finally {
      setLoading(false);
    }
  }, [usuarioId]);

  const marcarComoLeida = async (notificacionId) => {
    try {
      await axiosInstancia.put(`/api/notificaciones/${notificacionId}/leido`);
      setNotificaciones((prev) =>
        prev.map((n) => (n._id === notificacionId ? { ...n, leido: true } : n))
      );
      console.log(`📨 Notificación ${notificacionId} marcada como leída.`);
    } catch (err) {
      console.error('❌ Error al marcar como leída:', err.message);
    }
  };

  useEffect(() => {
    fetchNotificaciones();
  }, [fetchNotificaciones]);

  return {
    notificaciones,
    loading,
    error,
    marcarComoLeida,
    recargar: fetchNotificaciones,
    setNotificaciones,
  };
};

export default useNotificaciones;
