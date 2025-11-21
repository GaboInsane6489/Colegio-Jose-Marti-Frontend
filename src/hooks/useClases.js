import { useState, useEffect, useCallback } from 'react';
import axiosInstancia from '@/services/axiosInstancia';

/**
 * 🎓 Hook institucional para obtener clases y asignar estudiantes
 * Funciona para roles: admin y docente
 * Incluye cursoId y horario estructurado { dia, horaInicio, horaFin }
 */
const useClases = (role = 'docente') => {
  const [data, setData] = useState([]); // ✅ siempre array seguro
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔄 Carga inicial de clases
  const fetchClases = useCallback(async () => {
    console.log(`📡 Iniciando carga de clases (${role})...`);
    setLoading(true);

    try {
      // 🔧 Corrección: quitar prefijo /api porque axiosInstancia ya lo añade
      const endpoint = role === 'admin' ? '/admin/clases' : '/docente/clases';
      const res = await axiosInstancia.get(endpoint);

      const clases = Array.isArray(res.data?.clases) ? res.data.clases : [];
      setData(clases);

      if (clases.length > 0) {
        console.log(
          `✅ Clases recibidas (${clases.length}):`,
          clases.map((c) => c.nombre)
        );
        setError(null);
      } else {
        console.warn('⚠️ No se recibieron clases o respuesta inesperada:', res.data);
        setError(clases.length === 0 ? null : 'Respuesta inesperada del servidor');
      }
    } catch (err) {
      console.error(`❌ Error al obtener clases (${role}):`, err.message);
      setError('No se pudieron cargar las clases');
      setData([]); // ✅ fallback seguro
    } finally {
      setLoading(false);
      console.log('⏹️ Finalizó la carga de clases.');
    }
  }, [role]);

  useEffect(() => {
    fetchClases();
  }, [fetchClases]);

  /**
   * 🧑‍🏫 Asignar estudiantes a una clase
   * @param {string} claseId
   * @param {Array<string>} estudiantesIds
   */
  const assignEstudiantesToClase = async (claseId, estudiantesIds) => {
    console.log(`📤 Asignando estudiantes a la clase ${claseId} como ${role}...`);

    try {
      // 🔧 Corrección: quitar prefijo /api
      const endpoint =
        role === 'admin'
          ? '/admin/clases/asignar-estudiantes'
          : '/docente/clases/asignar-estudiantes';

      const res = await axiosInstancia.post(endpoint, {
        claseId,
        estudiantesIds,
      });

      if (res.data?.ok) {
        console.log('✅ Estudiantes asignados correctamente:', res.data);
        // Refrescar lista tras asignación
        await fetchClases();
        return { data: res.data.clase, msg: res.data.msg, status: 'success' };
      } else {
        console.warn('⚠️ Respuesta inesperada al asignar estudiantes:', res.data);
        return { data: null, msg: res.data.msg || 'Respuesta inesperada', status: 'error' };
      }
    } catch (err) {
      console.error(`❌ Error al asignar estudiantes (${role}):`, err.message);
      return { data: null, msg: 'No se pudo asignar estudiantes', status: 'error' };
    }
  };

  return {
    clases: data, // ✅ nombre claro para consumir en ClasesDocente
    loading,
    error,
    refetch: fetchClases,
    assignEstudiantesToClase,
  };
};

export default useClases;
