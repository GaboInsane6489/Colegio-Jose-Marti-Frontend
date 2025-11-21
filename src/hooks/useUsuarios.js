import { useState, useEffect, useCallback } from 'react';
import axiosInstancia from '@/services/axiosInstancia';

/**
 * 👥 Hook institucional para gestionar usuarios desde el panel administrativo
 * Soporta validación, actualización y eliminación de usuarios.
 */
const useUsuarios = (filtros = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔄 Obtener usuarios con filtros dinámicos
  const fetchUsuarios = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      Object.entries(filtros).forEach(([key, value]) => {
        if (value && value !== 'todos') {
          params[key] = value;
        }
      });

      const { data: response } = await axiosInstancia.get('/usuarios', { params });

      if (Array.isArray(response.usuarios)) {
        setData(response.usuarios);
        setError(null);
        console.log(`✅ Usuarios recibidos (${response.usuarios.length})`);
      } else {
        console.warn('⚠️ Respuesta inesperada al obtener usuarios:', response);
        setData([]);
        setError('Respuesta inesperada del servidor');
      }
    } catch (err) {
      console.error('❌ Error al obtener usuarios:', err.message);
      setError('No se pudo cargar la lista de usuarios');
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [filtros]);

  useEffect(() => {
    fetchUsuarios();
  }, [fetchUsuarios]);

  // 🆕 Crear usuario
  const createUsuario = async (nuevo) => {
    try {
      const { data: response } = await axiosInstancia.post('/auth/register', nuevo);
      if (response?.usuario) {
        setData((prev) => [...prev, response.usuario]);
        return response.usuario;
      } else {
        throw new Error('No se recibió el usuario creado');
      }
    } catch (err) {
      console.error('❌ Error al crear usuario:', err.message);
      throw err;
    }
  };

  // ✏️ Actualizar usuario
  const updateUsuario = async (id, actualizado) => {
    try {
      const { data: response } = await axiosInstancia.put(`/admin/actualizar/${id}`, actualizado);
      if (response?.usuarioActualizado) {
        setData((prev) => prev.map((u) => (u._id === id ? response.usuarioActualizado : u)));
        return response.usuarioActualizado;
      } else {
        throw new Error('No se recibió el usuario actualizado');
      }
    } catch (err) {
      console.error('❌ Error al actualizar usuario:', err.message);
      throw err;
    }
  };

  // 🗑️ Eliminar/Rechazar usuario
  const deleteUsuario = async (id) => {
    try {
      await axiosInstancia.delete(`/admin/rechazar/${id}`);
      setData((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.error('❌ Error al eliminar usuario:', err.message);
      throw err;
    }
  };

  return {
    data, // usuarios válidos
    loading,
    error,
    refetch: fetchUsuarios,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    setData,
  };
};

export default useUsuarios;
