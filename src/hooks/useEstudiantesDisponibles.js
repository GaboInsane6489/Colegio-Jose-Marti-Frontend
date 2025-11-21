import { useState, useEffect, useCallback } from 'react';
import axiosInstancia from '@/services/axiosInstancia';
import { esObjectIdValido } from '@/utils/helpers.js';

/**
 * 🧑‍🎓 Hook institucional para obtener estudiantes disponibles
 * Modularizado para uso en panel docente (asignación de estudiantes a clases)
 */
const useEstudiantesDisponibles = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEstudiantes = useCallback(async () => {
    console.log('📡 Iniciando carga de estudiantes disponibles...');

    try {
      const { data: response } = await axiosInstancia.get('/usuarios', {
        params: { role: 'estudiante' },
      });

      if (Array.isArray(response.usuarios)) {
        const limpias = response.usuarios.filter((e) => esObjectIdValido(e._id));
        setData(limpias);
        console.log(`✅ Estudiantes válidos recibidos (${limpias.length}):`, limpias);
        setError(null);
      } else {
        console.warn('⚠️ Respuesta inesperada al obtener estudiantes:', response);
        setData([]);
        setError('Respuesta inesperada del servidor');
      }
    } catch (err) {
      console.error('❌ Error al obtener estudiantes:', err.message);
      setError('No se pudieron cargar los estudiantes');
      setData([]);
    } finally {
      setLoading(false);
      console.log('⏹️ Finalizó la carga de estudiantes.');
    }
  }, []);

  useEffect(() => {
    fetchEstudiantes();
  }, [fetchEstudiantes]);

  return {
    data, // estudiantes válidos
    loading,
    error,
    refetch: fetchEstudiantes,
    setData,
  };
};

export default useEstudiantesDisponibles;
