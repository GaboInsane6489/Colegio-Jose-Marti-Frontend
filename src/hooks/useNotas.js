import { useState, useEffect, useCallback } from 'react';
import axiosInstancia from '@/services/axiosInstancia';
import { esObjectIdValido } from '@/utils/helpers.js';

/**
 * 🧠 Hook institucional para obtener entregas (notas) por curso, con filtros académicos
 * Incluye campos: estado, calificacion, fechaRevision, observaciones
 */
const useNotas = (cursoId, filtros = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchNotas = useCallback(async () => {
    if (!esObjectIdValido(cursoId)) {
      console.warn('⚠️ cursoId inválido o no definido:', cursoId);
      setError('ID de curso inválido o no especificado.');
      setData([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Construcción de filtros dinámicos
      const params = {};
      Object.entries(filtros).forEach(([key, value]) => {
        if (value && value !== 'todos') {
          params[key] = value;
        }
      });

      console.log('📤 Solicitando entregas con filtros:', params);

      const { data: response } = await axiosInstancia.get(
        `/api/docente/entregas/curso/${cursoId}`,
        {
          params,
        }
      );

      if (Array.isArray(response.entregas)) {
        // Normalizamos IDs: siempre usar "id"
        const limpias = response.entregas
          .filter(
            (e) =>
              (typeof e._id === 'string' || typeof e.id === 'string') &&
              typeof e?.estado === 'string' &&
              typeof e?.calificacion !== 'undefined'
          )
          .map((e) => ({
            ...e,
            id: e.id || e._id, // preferimos id, fallback a _id
          }));

        setData(limpias);
        console.log('✅ Entregas válidas recibidas:', limpias);
      } else {
        console.warn('⚠️ Respuesta inesperada del backend:', response);
        setData([]);
        setError(response.msg || 'Respuesta inesperada del servidor');
      }
    } catch (err) {
      const mensaje =
        err.response?.data?.msg || err.message || 'No se pudieron cargar las entregas.';
      console.error('❌ Error al obtener entregas:', mensaje);
      setError(mensaje);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [cursoId, filtros]);

  useEffect(() => {
    fetchNotas();
  }, [fetchNotas]);

  return { data, loading, error, refetch: fetchNotas, setData };
};

export default useNotas;
