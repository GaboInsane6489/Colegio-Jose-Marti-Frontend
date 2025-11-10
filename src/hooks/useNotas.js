import { useState, useEffect, useCallback } from 'react';
import axiosInstancia from '@/services/axiosInstancia';

// 🧠 Validación ligera de ObjectId (24 caracteres hexadecimales)
const esObjectIdValido = (id) => typeof id === 'string' && /^[a-f\d]{24}$/i.test(id);

/**
 * 🧠 Hook institucional para obtener entregas (notas) por curso, con filtros académicos
 */
const useNotas = (cursoId, filtros = {}) => {
  const [entregas, setEntregas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchNotas = useCallback(async () => {
    if (!esObjectIdValido(cursoId)) {
      console.warn('⚠️ cursoId inválido o no definido:', cursoId);
      setError('ID de curso inválido o no especificado.');
      setEntregas([]);
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

      console.log('📤 Solicitando entregas con filtros:', params);

      const { data } = await axiosInstancia.get(`/api/entregas/curso/${cursoId}`, {
        params,
      });

      if (Array.isArray(data.entregas)) {
        const limpias = data.entregas.filter((e) => typeof e._id === 'string');
        setEntregas(limpias);
        console.log('✅ Entregas válidas recibidas:', limpias);
      } else {
        console.warn('⚠️ Respuesta inesperada del backend:', data);
        setEntregas([]);
        setError(data.msg || 'Respuesta inesperada del servidor');
      }
    } catch (err) {
      const mensaje =
        err.response?.data?.msg || err.message || 'No se pudieron cargar las entregas.';
      console.error('❌ Error al obtener entregas:', mensaje);
      setError(mensaje);
      setEntregas([]);
    } finally {
      setLoading(false);
    }
  }, [cursoId, filtros]);

  useEffect(() => {
    fetchNotas();
  }, [fetchNotas]);

  return { entregas, loading, error, refetchNotas: fetchNotas, setEntregas };
};

export default useNotas;
