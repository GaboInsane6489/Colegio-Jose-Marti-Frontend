import { useState, useEffect, useCallback } from 'react';
import axiosInstancia from '@/services/axiosInstancia';

// 🧠 Validación ligera de ObjectId (24 caracteres hexadecimales)
const esObjectIdValido = (id) => typeof id === 'string' && /^[a-f\d]{24}$/i.test(id);

/**
 * 📦 Hook institucional para obtener entregas de una actividad específica
 */
const useEntregas = (actividadId) => {
  const [entregas, setEntregas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEntregas = useCallback(async () => {
    if (!esObjectIdValido(actividadId)) {
      console.warn('⚠️ ID de actividad inválido:', actividadId);
      setError('ID de actividad inválido o no especificado.');
      setEntregas([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log('📡 Solicitando entregas para actividad:', actividadId);
      const { data } = await axiosInstancia.get(`/api/entregas/${actividadId}`);

      if (data?.ok && Array.isArray(data.entregas)) {
        const limpias = data.entregas.filter((e) => typeof e._id === 'string');
        setEntregas(limpias);
        console.log('✅ Entregas válidas recibidas:', limpias);
      } else {
        throw new Error(data.message || 'Respuesta inesperada del servidor');
      }
    } catch (err) {
      console.error('❌ Error al cargar entregas:', err.message);
      setError('No se pudieron cargar las entregas');
      setEntregas([]);
    } finally {
      setLoading(false);
    }
  }, [actividadId]);

  useEffect(() => {
    fetchEntregas();
  }, [fetchEntregas]);

  return {
    entregas,
    loading,
    error,
    refetchEntregas: fetchEntregas,
    setEntregas,
  };
};

export default useEntregas;
