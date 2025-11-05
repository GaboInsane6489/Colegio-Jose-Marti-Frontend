import { useState, useEffect } from 'react';
import axiosInstancia from '@/services/axiosInstancia';

/**
 * 🧑‍🎓 Hook para obtener estudiantes disponibles
 * Modularizado para uso en panel docente (asignación de estudiantes a clases)
 */
const useEstudiantesDisponibles = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEstudiantes = async () => {
      try {
        const res = await axiosInstancia.get('/api/admin/estudiantes');
        console.log('✅ Estudiantes disponibles:', res.data);
        setEstudiantes(res.data.estudiantes || []);
      } catch (err) {
        console.error('❌ Error al obtener estudiantes:', err);
        setError('No se pudieron cargar los estudiantes');
      } finally {
        setLoading(false);
      }
    };

    fetchEstudiantes();
  }, []);

  return { estudiantes, loading, error };
};

export default useEstudiantesDisponibles;
