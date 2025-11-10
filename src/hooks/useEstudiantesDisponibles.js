import { useState, useEffect, useCallback } from 'react';
import axiosInstancia from '@/services/axiosInstancia';

// 🧠 Validación robusta de ObjectId
const esObjectIdValido = (id) => typeof id === 'string' && /^[a-f\d]{24}$/i.test(id.trim());

/**
 * 🧑‍🎓 Hook para obtener estudiantes disponibles
 * Modularizado para uso en panel docente (asignación de estudiantes a clases)
 */
const useEstudiantesDisponibles = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEstudiantes = useCallback(async () => {
    console.log('📡 Iniciando carga de estudiantes disponibles...');

    try {
      const res = await axiosInstancia.get('/api/docente/estudiantes');

      if (Array.isArray(res.data.estudiantes)) {
        const limpias = res.data.estudiantes.filter((e) => esObjectIdValido(e._id));
        setEstudiantes(limpias);
        console.log(`✅ Estudiantes válidos recibidos (${limpias.length}):`, limpias);
        setError(null);
      } else {
        console.warn('⚠️ Respuesta inesperada al obtener estudiantes:', res.data);
        setEstudiantes([]);
        setError('Respuesta inesperada del servidor');
      }
    } catch (err) {
      console.error('❌ Error al obtener estudiantes:', err.message);
      setError('No se pudieron cargar los estudiantes');
      setEstudiantes([]);
    } finally {
      setLoading(false);
      console.log('⏹️ Finalizó la carga de estudiantes.');
    }
  }, []);

  useEffect(() => {
    fetchEstudiantes();
  }, [fetchEstudiantes]);

  return {
    estudiantes,
    loading,
    error,
    refetchEstudiantes: fetchEstudiantes,
    setEstudiantes,
  };
};

export default useEstudiantesDisponibles;
