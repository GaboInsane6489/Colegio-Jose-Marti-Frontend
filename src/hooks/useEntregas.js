import { useState, useEffect } from 'react';
import axiosInstancia from '@/services/axiosInstancia';

/**
 * 📦 Hook institucional para obtener entregas de una actividad específica
 */
const useEntregas = (actividadId) => {
  const [entregas, setEntregas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!actividadId || typeof actividadId !== 'string') return;

    const fetchEntregas = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstancia.get(`/api/entregas/${actividadId}`);

        if (data?.ok && Array.isArray(data.entregas)) {
          setEntregas(data.entregas);
          setError(null);
        } else {
          throw new Error(data.message || 'Respuesta inesperada del servidor');
        }
      } catch (err) {
        console.error('❌ Error al cargar entregas:', err.message);
        setError('No se pudieron cargar las entregas');
      } finally {
        setLoading(false);
      }
    };

    fetchEntregas();
  }, [actividadId]);

  return { entregas, loading, error };
};

export default useEntregas;
