import { useState, useEffect, useCallback, useMemo } from 'react';
import axiosInstancia from '@/services/axiosInstancia';

/**
 * 🎓 Hook institucional para cargar actividades del estudiante
 * 👉 Recibe todas las actividades activas desde el backend, sin exigir vínculo con clases o cursos
 */
const useActividadesEstudiante = (filtros = {}) => {
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🧠 Estabiliza filtros para evitar regeneración en cada render
  const filtrosEstables = useMemo(() => filtros, []);

  const fetchActividades = useCallback(async () => {
    console.log('🚀 Iniciando carga de actividades con filtros:', filtrosEstables);
    setLoading(true);

    try {
      const params = {};
      if (filtrosEstables.materia && filtrosEstables.materia !== 'todos') {
        params.materia = filtrosEstables.materia;
      }
      if (filtrosEstables.lapso && filtrosEstables.lapso !== 'todos') {
        params.lapso = filtrosEstables.lapso;
      }
      if (filtrosEstables.tipo && filtrosEstables.tipo !== 'todos') {
        params.tipo = filtrosEstables.tipo;
      }
      if (filtrosEstables.estado && filtrosEstables.estado !== 'todos') {
        params.estado = filtrosEstables.estado;
      }

      console.log('📤 Enviando filtros al backend:', params);

      const actividadesRes = await axiosInstancia.get('/estudiante/actividades', {
        params,
      });

      const recibidas = actividadesRes.data.actividades || [];
      console.log('✅ Actividades válidas recibidas:', recibidas);

      const normalizadas = recibidas.map((act) => ({
        ...act,
        id: act._id || act.id,
        docente: act.docenteId || act.docente || null,
      }));

      setActividades(normalizadas);
      setError(null);
    } catch (err) {
      console.error('❌ Error al cargar actividades:', err);
      setError(err.response?.data?.msg || 'No se pudieron cargar las actividades.');
      setActividades([]);
    } finally {
      setLoading(false);
      console.log('⏹️ Finalizó carga de actividades.');
    }
  }, [filtrosEstables]); // ✅ función estable, dependiente solo de filtros memorizados

  useEffect(() => {
    fetchActividades(); // ✅ se ejecuta una vez al montar
  }, [fetchActividades]); // ✅ no se regenera si filtros no cambian

  return {
    actividades,
    loading,
    error,
    refetchActividades: fetchActividades,
    setActividades,
  };
};

export default useActividadesEstudiante;
