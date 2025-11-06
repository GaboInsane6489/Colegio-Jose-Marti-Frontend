import { useState, useEffect } from 'react';
import axiosInstancia from '@/services/axiosInstancia';

/**
 * 🎓 Hook institucional para cargar actividades asignadas al estudiante
 * Solo se muestran actividades de las clases donde fue asignado
 */
const useActividadesEstudiante = () => {
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActividades = async () => {
      try {
        // 🔍 Paso 1: obtener clases asignadas al estudiante
        const clasesRes = await axiosInstancia.get('/api/estudiante/clases');
        const clases = clasesRes.data.clases || [];

        const claseIds = clases.map((clase) => clase._id);

        if (claseIds.length === 0) {
          setActividades([]);
          setLoading(false);
          return;
        }

        // 📚 Paso 2: obtener actividades filtradas por claseId
        const actividadesRes = await axiosInstancia.post('/api/estudiante/actividades', {
          claseIds,
        });

        console.log('✅ Actividades recibidas:', actividadesRes.data);
        setActividades(actividadesRes.data.actividades || []);
      } catch (err) {
        console.error('❌ Error al cargar actividades del estudiante:', err);
        setError('No se pudieron cargar las actividades asignadas.');
      } finally {
        setLoading(false);
      }
    };

    fetchActividades();
  }, []);

  return { actividades, loading, error };
};

export default useActividadesEstudiante;
