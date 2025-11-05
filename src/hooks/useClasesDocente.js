import { useState, useEffect } from 'react';
import axiosInstancia from '@/services/axiosInstancia';

/**
 * 🎓 Hook para obtener clases del docente y asignar estudiantes
 * Modularizado para uso en panel docente institucional
 */
const useClasesDocente = () => {
  const [clases, setClases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔄 Carga inicial de clases
  useEffect(() => {
    console.log('📡 Iniciando carga de clases del docente...');

    const fetchClases = async () => {
      try {
        const res = await axiosInstancia.get('/api/docente/clases');

        if (res.data?.ok && Array.isArray(res.data.clases)) {
          setClases(res.data.clases);
          console.log(`✅ Clases recibidas (${res.data.clases.length}):`, res.data.clases);
        } else {
          console.warn('⚠️ Respuesta inesperada al obtener clases:', res.data);
          setClases([]);
        }
      } catch (err) {
        console.error('❌ Error al obtener clases del docente:', err.message);
        setError('No se pudieron cargar las clases');
      } finally {
        setLoading(false);
        console.log('⏹️ Finalizó la carga de clases.');
      }
    };

    fetchClases();
  }, []);

  // 🧑‍🏫 Asignar estudiantes a una clase
  const asignarEstudiantes = async (claseId, estudiantesIds) => {
    console.log(`📤 Asignando estudiantes a la clase ${claseId}...`);

    try {
      const res = await axiosInstancia.post('/api/clases/asignar-estudiantes', {
        claseId,
        estudiantesIds,
      });

      if (res.data?.ok) {
        console.log('✅ Estudiantes asignados correctamente:', res.data);
        return res.data;
      } else {
        console.warn('⚠️ Respuesta inesperada al asignar estudiantes:', res.data);
        throw new Error('No se pudo asignar estudiantes');
      }
    } catch (err) {
      console.error('❌ Error al asignar estudiantes:', err.message);
      throw new Error('No se pudo asignar estudiantes');
    }
  };

  return { clases, loading, error, asignarEstudiantes };
};

export default useClasesDocente;
