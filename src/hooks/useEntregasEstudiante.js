import { useState, useEffect, useCallback } from 'react';
import axiosInstancia from '@/services/axiosInstancia';

/**
 * 📦 Hook institucional para cargar entregas del estudiante autenticado
 * Incluye campos: estado, calificacion, fechaRevision, observaciones, archivoUrl
 */
const useEntregasEstudiante = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEntregas = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: response } = await axiosInstancia.get('/estudiante/entregas');
      console.log('✅ Entregas recibidas:', response);

      const limpias = Array.isArray(response.entregas)
        ? response.entregas.filter(
            (e) =>
              typeof e?._id === 'string' &&
              typeof e?.estado === 'string' &&
              typeof e?.calificacion !== 'undefined'
          )
        : [];

      if (limpias.length !== response.entregas?.length) {
        console.warn('⚠️ Algunas entregas no son válidas:', response.entregas);
      }

      setData(limpias);
    } catch (err) {
      console.error('❌ Error al cargar entregas del estudiante:', err.message);
      setError('No se pudieron cargar las entregas realizadas.');
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntregas();
  }, [fetchEntregas]);

  return {
    data, // entregas válidas
    loading,
    error,
    refetch: fetchEntregas,
    setData,
  };
};

export default useEntregasEstudiante;
