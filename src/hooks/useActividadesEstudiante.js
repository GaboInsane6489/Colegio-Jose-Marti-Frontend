import { useState, useEffect } from 'react';
import axiosInstancia from '@/services/axiosInstancia';

/**
 * 🎓 Hook institucional para cargar actividades asignadas al estudiante
 */
const useActividadesEstudiante = () => {
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActividades = async () => {
      try {
        const res = await axiosInstancia.get('/api/estudiante/actividades');
        console.log('✅ Actividades recibidas:', res.data);
        setActividades(res.data.actividades || []);
      } catch (err) {
        console.error('❌ Error al cargar actividades:', err);
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
