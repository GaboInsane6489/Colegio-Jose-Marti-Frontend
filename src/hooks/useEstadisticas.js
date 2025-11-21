import { useState, useEffect, useCallback } from 'react';
import axiosInstancia from '@/services/axiosInstancia';

/**
 * 📊 Hook institucional para obtener estadísticas administrativas
 * Devuelve { data, loading, error, refetch }
 */
const useEstadisticas = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔄 Obtener estadísticas
  const fetchEstadisticas = useCallback(async () => {
    setLoading(true);
    try {
      const { data: response } = await axiosInstancia.get('/admin/estadisticas');

      if (response?.ok && response?.estadisticas) {
        setData(response.estadisticas);
        setError(null);
        console.log('✅ Estadísticas recibidas:', response.estadisticas);
      } else {
        console.warn('⚠️ Respuesta inesperada al obtener estadísticas:', response);
        setData(null);
        setError('Respuesta inesperada del servidor');
      }
    } catch (err) {
      console.error('❌ Error al obtener estadísticas:', err.message);
      setError('No se pudieron cargar las estadísticas');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEstadisticas();
  }, [fetchEstadisticas]);

  return {
    data, // estadísticas institucionales
    loading,
    error,
    refetch: fetchEstadisticas,
    setData,
  };
};

export default useEstadisticas;
