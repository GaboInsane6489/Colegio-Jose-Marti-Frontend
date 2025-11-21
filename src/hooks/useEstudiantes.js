import { useState, useEffect, useCallback } from 'react';
import axiosInstancia from '@/services/axiosInstancia';

/**
 * 🧑‍🎓 Hook institucional para gestionar estudiantes desde el panel administrativo
 * Basado en /usuarios?role=estudiante
 */
const useEstudiantes = (filtros = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔄 Obtener estudiantes con filtros dinámicos
  const fetchEstudiantes = useCallback(async () => {
    setLoading(true);
    try {
      const params = { role: 'estudiante' };

      Object.entries(filtros).forEach(([key, value]) => {
        if (value && value !== 'todos') {
          params[key] = value;
        }
      });

      const { data: response } = await axiosInstancia.get('/usuarios', { params });

      if (Array.isArray(response.usuarios)) {
        setData(response.usuarios);
        setError(null);
        console.log(`✅ Estudiantes recibidos (${response.usuarios.length})`);
      } else {
        console.warn('⚠️ Respuesta inesperada al obtener estudiantes:', response);
        setData([]);
        setError('Respuesta inesperada del servidor');
      }
    } catch (err) {
      console.error('❌ Error al obtener estudiantes:', err.message);
      setError('No se pudo cargar la lista de estudiantes');
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [filtros]);

  useEffect(() => {
    fetchEstudiantes();
  }, [fetchEstudiantes]);

  // 🆕 Crear estudiante
  const createEstudiante = async (nuevo) => {
    try {
      const payload = { ...nuevo, role: 'estudiante' };
      const { data: response } = await axiosInstancia.post('/auth/register', payload);

      if (response?.usuario) {
        setData((prev) => [...prev, response.usuario]);
        return response.usuario;
      } else {
        throw new Error('No se recibió el estudiante creado');
      }
    } catch (err) {
      console.error('❌ Error al crear estudiante:', err.message);
      throw err;
    }
  };

  // ✏️ Actualizar estudiante
  const updateEstudiante = async (id, actualizado) => {
    try {
      const { data: response } = await axiosInstancia.put(`/admin/actualizar/${id}`, actualizado);

      if (response?.usuarioActualizado) {
        setData((prev) => prev.map((e) => (e._id === id ? response.usuarioActualizado : e)));
        return response.usuarioActualizado;
      } else {
        throw new Error('No se recibió el estudiante actualizado');
      }
    } catch (err) {
      console.error('❌ Error al actualizar estudiante:', err.message);
      throw err;
    }
  };

  // 🗑️ Eliminar/Rechazar estudiante
  const deleteEstudiante = async (id) => {
    try {
      await axiosInstancia.delete(`/admin/rechazar/${id}`);
      setData((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.error('❌ Error al eliminar estudiante:', err.message);
      throw err;
    }
  };

  return {
    data, // estudiantes válidos
    loading,
    error,
    refetch: fetchEstudiantes,
    createEstudiante,
    updateEstudiante,
    deleteEstudiante,
    setData,
  };
};

export default useEstudiantes;
