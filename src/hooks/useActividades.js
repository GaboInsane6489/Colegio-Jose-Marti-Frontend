import { useState, useEffect, useCallback } from 'react';
import axiosInstancia from '@/services/axiosInstancia';
import isActividadValida from '@/utils/validadores/isActividadValida.js';
import { esObjectIdValido } from '@/utils/helpers.js';

/**
 * 🎓 Hook institucional para gestionar actividades académicas por curso y filtros.
 * Soporta filtros: cursoId, claseId, tipo, estado, materia, lapso, anio, seccion
 */
const useActividades = (filtros = {}, rol = 'docente') => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchActividades = useCallback(async () => {
    // Validación de cursoId
    if (filtros.cursoId && !esObjectIdValido(filtros.cursoId)) {
      const msg = `ID de curso inválido: ${filtros.cursoId}`;
      console.warn('⚠️', msg);
      setError(msg);
      setData([]);
      return;
    }

    setLoading(true);
    try {
      // Construcción de parámetros, descartando valores vacíos o "todos"
      const params = Object.entries(filtros).reduce((acc, [key, value]) => {
        if (value && value !== 'todos') acc[key] = value;
        return acc;
      }, {});

      console.log('📤 Enviando filtros al backend:', params);

      // ✅ Rutas alineadas con backend
      const ruta = rol === 'estudiante' ? '/actividades/estudiante' : '/actividades';

      const { data: response, headers } = await axiosInstancia.get(ruta, {
        params,
        headers: { 'Cache-Control': 'no-cache' }, // fuerza no usar cache
      });

      // Validación de tipo de respuesta
      const contentType = headers?.['content-type'] || '';
      if (contentType && !contentType.includes('application/json')) {
        console.error('❌ Tipo de respuesta no es JSON:', contentType);
        setError('Respuesta no válida del servidor');
        setData([]);
        return;
      }

      // Manejo de respuesta con error explícito
      if (response?.ok === false) {
        const msg = response.msg || 'Acceso denegado por permisos';
        console.warn('🚫 Backend rechazó la solicitud:', msg);
        setData([]);
        setError(msg);
        return;
      }

      // Procesamiento de actividades
      if (Array.isArray(response.actividades)) {
        const limpias = response.actividades.filter(isActividadValida);
        setData(limpias);
        setError(null);
        console.log(
          limpias.length === 0
            ? '⚠️ Curso válido pero sin actividades registradas'
            : `✅ ${limpias.length} actividades válidas recibidas`
        );
      } else {
        const msg = response.msg || 'Respuesta inesperada del servidor';
        console.warn('⚠️', msg);
        setData([]);
        setError(msg);
      }
    } catch (err) {
      const msg = err.response?.data?.msg || err.message || 'No se pudieron cargar las actividades';
      console.error('❌ Error al cargar actividades:', msg);
      setError(msg);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [
    rol,
    filtros.cursoId,
    filtros.materia,
    filtros.lapso,
    filtros.tipo,
    filtros.estado,
    filtros.anio,
    filtros.seccion,
    filtros.claseId,
  ]);

  // Efecto para cargar actividades al montar o cambiar filtros/rol
  useEffect(() => {
    fetchActividades();
  }, [fetchActividades]);

  return {
    data,
    setData,
    loading,
    error,
    refetch: fetchActividades,
  };
};

export default useActividades;
