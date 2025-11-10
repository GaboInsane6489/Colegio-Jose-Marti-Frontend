import { useState, useEffect, useCallback } from 'react';
import axiosInstancia from '@/services/axiosInstancia';

/**
 * 🎓 Hook institucional para cargar actividades asignadas al estudiante
 * Soporta filtros: materia, lapso, tipo, estado, cursoId
 */
const useActividadesEstudiante = (filtros = {}, cursoId = null) => {
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchActividades = useCallback(async () => {
    console.log('🚀 Iniciando carga de actividades con filtros:', filtros, 'y cursoId:', cursoId);
    setLoading(true);

    try {
      let claseIds = [];

      if (cursoId) {
        claseIds = [cursoId];
        console.log('🎯 Usando cursoId proporcionado:', cursoId);
      } else {
        const clasesRes = await axiosInstancia.get('/api/estudiante/clases');
        const clases = clasesRes.data.clases || [];
        console.log('📚 Clases recibidas:', clases);
        claseIds = clases.map((clase) => clase?._id).filter((id) => typeof id === 'string');
        console.log('🧩 IDs de clases válidas:', claseIds);
      }

      if (claseIds.length === 0) {
        console.warn('⚠️ Estudiante sin clases asignadas o cursoId inválido.');
        setActividades([]);
        setLoading(false);
        return;
      }

      const payload = { claseIds };

      if (filtros.materia && filtros.materia !== 'todos') {
        payload.materia = filtros.materia;
      }
      if (filtros.lapso && filtros.lapso !== 'todos') {
        payload.lapso = filtros.lapso;
      }
      if (filtros.tipo && filtros.tipo !== 'todos') {
        payload.tipo = filtros.tipo;
      }
      if (filtros.estado && filtros.estado !== 'todos') {
        payload.estado = filtros.estado;
      }

      console.log('📤 Enviando payload al backend:', payload);

      const actividadesRes = await axiosInstancia.post('/api/estudiante/actividades', payload);
      const recibidas = actividadesRes.data.actividades || [];

      console.log('✅ Actividades recibidas del backend:', recibidas);

      const trazables = recibidas.filter((act) => typeof act?._id === 'string');

      if (trazables.length !== recibidas.length) {
        console.warn('⚠️ Algunas actividades no tienen _id válido:', recibidas);
      }

      setActividades(trazables);
      setError(null);
    } catch (err) {
      console.error('❌ Error al cargar actividades del estudiante:', err);
      setError('No se pudieron cargar las actividades asignadas.');
      setActividades([]);
    } finally {
      setLoading(false);
      console.log('⏹️ Finalizó carga de actividades.');
    }
  }, [cursoId, filtros.materia, filtros.lapso, filtros.tipo, filtros.estado]);

  useEffect(() => {
    fetchActividades();
  }, [fetchActividades]);

  return {
    actividades,
    loading,
    error,
    refetchActividades: fetchActividades,
    setActividades,
  };
};

export default useActividadesEstudiante;
