import { useState, useEffect } from 'react';
import axiosInstancia from '@/services/axiosInstancia';

/**
 * 📦 Hook institucional para cargar entregas del estudiante
 */
const useEntregasEstudiante = () => {
  const [entregas, setEntregas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEntregas = async () => {
      try {
        const res = await axiosInstancia.get('/api/estudiante/entregas');
        console.log('✅ Entregas recibidas:', res.data);
        setEntregas(res.data.entregas || []);
      } catch (err) {
        console.error('❌ Error al cargar entregas:', err);
        setError('No se pudieron cargar las entregas realizadas.');
      } finally {
        setLoading(false);
      }
    };

    fetchEntregas();
  }, []);

  return { entregas, loading, error };
};

export default useEntregasEstudiante;
