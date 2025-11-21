import { useState, useEffect, useCallback } from 'react';
import axiosInstancia from '@/services/axiosInstancia';
import { esObjectIdValido } from '@/utils/helpers.js';

/**
 * 📦 Hook institucional para obtener entregas de una actividad específica
 * Incluye campos: estado, calificacion, fechaRevision, observaciones, archivoUrl
 */
const useEntregas = (actividadId) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEntregas = useCallback(async () => {
    if (!esObjectIdValido(actividadId)) {
      console.warn('⚠️ ID de actividad inválido:', actividadId);
      setError('ID de actividad inválido o no especificado.');
      setData([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log('📡 Solicitando entregas para actividad:', actividadId);
      const { data: response } = await axiosInstancia.get(`/api/docente/entregas/${actividadId}`);

      if (response?.ok && Array.isArray(response.entregas)) {
        // Normalizamos IDs: siempre usar "id"
        const limpias = response.entregas
          .filter((e) => e && (typeof e._id === 'string' || typeof e.id === 'string'))
          .map((e) => ({
            ...e,
            id: e.id || e._id, // preferimos id, fallback a _id
          }));

        setData(limpias);
        console.log('✅ Entregas válidas recibidas:', limpias);
      } else {
        throw new Error(response.msg || 'Respuesta inesperada del servidor');
      }
    } catch (err) {
      console.error('❌ Error al cargar entregas:', err.message);
      setError('No se pudieron cargar las entregas');
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [actividadId]);

  useEffect(() => {
    fetchEntregas();
  }, [fetchEntregas]);

  return {
    data, // entregas válidas con id normalizado
    loading,
    error,
    refetch: fetchEntregas,
    setData,
  };
};

export default useEntregas;
