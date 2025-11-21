import { useState, useEffect, useCallback } from 'react';
import axiosInstancia from '@/services/axiosInstancia';

/**
 *  Hook institucional para obtener las clases asignadas al estudiante autenticado
 * Incluye información de materia, horario, docente y compañeros
 */
const useClasesEstudiante = () => {
  const [clases, setClases] = useState([]); // siempre array seguro
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carga inicial de clases del estudiante
  const fetchClases = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axiosInstancia.get('/estudiante/clases');
      const recibidas = Array.isArray(res.data?.clases) ? res.data.clases : [];

      setClases(recibidas);

      if (recibidas.length > 0) {
        console.log(`✅ Clases del estudiante recibidas (${recibidas.length})`);
      } else {
        console.warn('⚠️ El estudiante no tiene clases asignadas actualmente.');
      }
    } catch (err) {
      console.error('❌ Error al obtener clases del estudiante:', err.message);
      setError('No se pudieron cargar tus clases.');
      setClases([]); // fallback seguro
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClases();
  }, [fetchClases]);

  return {
    clases, // array de clases asignadas
    loading, // estado de carga
    error, // mensaje de error si ocurre
    refetch: fetchClases, // recargar manualmente
    setClases, // actualizar manualmente si hace falta
  };
};

export default useClasesEstudiante;
