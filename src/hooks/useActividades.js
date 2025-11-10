import { useState, useEffect, useCallback } from 'react';
import axiosInstancia from '@/services/axiosInstancia';
import isActividadValida from '@/utils/validadores/isActividadValida.js';

// 🧠 Validación básica de ObjectId
const esObjectIdValido = (id) => typeof id === 'string' && /^[a-f\d]{24}$/i.test(id);

/**
 * 🎓 Hook institucional para gestionar actividades académicas por curso y filtros.
 * Soporta filtros: cursoId, tipo, estado, materia, lapso, anio, seccion
 */
const useActividades = (tokenProp, filtros = {}) => {
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchActividades = useCallback(async () => {
    const token = tokenProp || localStorage.getItem('token') || sessionStorage.getItem('token');

    if (!token) {
      const msg = 'Token no proporcionado';
      console.warn('⚠️', msg);
      setError(msg);
      return;
    }

    const cursoIdValido = esObjectIdValido(filtros.cursoId);
    if (filtros.cursoId && !cursoIdValido) {
      const msg = `ID de curso inválido: ${filtros.cursoId}`;
      console.warn('⚠️', msg);
      setError(msg);
      return;
    }

    setLoading(true);
    try {
      const params = Object.entries(filtros).reduce((acc, [key, value]) => {
        if (value && value !== 'todos') acc[key] = value;
        return acc;
      }, {});

      if (cursoIdValido) params.cursoId = filtros.cursoId;

      console.log('📤 Enviando filtros al backend:', params);

      const { data } = await axiosInstancia.get('/api/actividades', { params });

      if (data?.ok === false) {
        const msg = data.msg || 'Acceso denegado por permisos';
        console.warn('🚫 Backend rechazó la solicitud:', msg);
        setActividades([]);
        setError(msg);
        return;
      }

      if (Array.isArray(data.actividades)) {
        const limpias = data.actividades.filter(isActividadValida);
        setActividades(limpias);
        setError(null);

        if (limpias.length === 0) {
          console.log('⚠️ Curso válido pero sin actividades registradas');
        } else {
          console.log(`✅ ${limpias.length} actividades válidas recibidas`);
        }
      } else {
        const msg = data.msg || 'Respuesta inesperada del servidor';
        console.warn('⚠️', msg);
        setActividades([]);
        setError(msg);
      }
    } catch (err) {
      const msg = err.response?.data?.msg || err.message || 'No se pudieron cargar las actividades';
      console.error('❌ Error al cargar actividades:', msg);
      setError(msg);
      setActividades([]);
    } finally {
      setLoading(false);
    }
  }, [tokenProp, ...Object.values(filtros)]);

  useEffect(() => {
    fetchActividades();
  }, [fetchActividades]);

  return {
    actividades,
    setActividades,
    loading,
    error,
    refetchActividades: fetchActividades,
  };
};

export default useActividades;
