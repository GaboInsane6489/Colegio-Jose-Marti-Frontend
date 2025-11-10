import { useState, useEffect, useCallback } from 'react';
import axiosInstancia from '@/services/axiosInstancia';

/**
 * 📦 Hook institucional para cargar entregas del estudiante
 */
const useEntregasEstudiante = () => {
  const [entregas, setEntregas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEntregas = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axiosInstancia.get('/api/estudiante/entregas');
      console.log('✅ Entregas recibidas:', res.data);

      const limpias = Array.isArray(res.data.entregas)
        ? res.data.entregas.filter((e) => typeof e._id === 'string')
        : [];

      if (limpias.length !== res.data.entregas?.length) {
        console.warn('⚠️ Algunas entregas no tienen _id válido:', res.data.entregas);
      }

      setEntregas(limpias);
    } catch (err) {
      console.error('❌ Error al cargar entregas del estudiante:', err.message);
      setError('No se pudieron cargar las entregas realizadas.');
      setEntregas([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntregas();
  }, [fetchEntregas]);

  return {
    entregas,
    loading,
    error,
    refetchEntregasEstudiante: fetchEntregas,
    setEntregas,
  };
};

export default useEntregasEstudiante;
