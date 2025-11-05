import { useState, useEffect, useCallback } from 'react';
import axiosInstancia from '@/services/axiosInstancia';

/**
 * 🧠 Hook institucional para obtener entregas (notas) por curso, con filtros académicos
 */
const useNotas = (cursoId, filtros = {}) => {
  const [entregas, setEntregas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchNotas = useCallback(async () => {
    if (!cursoId) {
      setError('No se especificó el curso.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const params = {};

      Object.entries(filtros).forEach(([key, value]) => {
        if (value && value !== 'todos') {
          params[key] = value;
        }
      });

      const { data } = await axiosInstancia.get(`/api/entregas/curso/${cursoId}`, {
        params,
      });

      if (Array.isArray(data.entregas)) {
        setEntregas(data.entregas);
      } else {
        setEntregas([]);
        console.warn('⚠️ Respuesta inesperada:', data);
      }
    } catch (err) {
      console.error('❌ Error al obtener entregas:', err.message);
      setError('No se pudieron cargar las entregas.');
    } finally {
      setLoading(false);
    }
  }, [cursoId, filtros]);

  useEffect(() => {
    fetchNotas();
  }, [fetchNotas]);

  return { entregas, loading, error };
};

export default useNotas;
