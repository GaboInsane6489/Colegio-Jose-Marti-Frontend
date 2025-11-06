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
    console.log('📡 Iniciando carga de estudiantes disponibles...');

    const fetchEstudiantes = async () => {
      try {
        const res = await axiosInstancia.get('/api/docente/estudiantes'); // ✅ endpoint corregido

        if (Array.isArray(res.data.estudiantes)) {
          setEstudiantes(res.data.estudiantes);
          console.log(
            `✅ Estudiantes recibidos (${res.data.estudiantes.length}):`,
            res.data.estudiantes
          );
        } else {
          console.warn('⚠️ Respuesta inesperada al obtener estudiantes:', res.data);
          setEstudiantes([]);
        }
      } catch (err) {
        console.error('❌ Error al obtener estudiantes:', err.message);
        setError('No se pudieron cargar los estudiantes');
      } finally {
        setLoading(false);
        console.log('⏹️ Finalizó la carga de estudiantes.');
      }
    };

    fetchEstudiantes();
  }, []);

  return { estudiantes, loading, error };
};

export default useEstudiantesDisponibles;
