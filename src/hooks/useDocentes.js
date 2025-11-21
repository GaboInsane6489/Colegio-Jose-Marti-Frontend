import { useState, useEffect, useCallback } from 'react';
import axiosInstancia from '@/services/axiosInstancia';

/**
 * Hook institucional para gestionar docentes desde el panel administrativo
 */
const useDocentes = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔄 Obtener docentes activos y validados
  const fetchDocentes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstancia.get('/admin/usuarios', {
        params: { role: 'docente' },
      });

      if (res.status === 200 && res.data) {
        const lista = Array.isArray(res.data.docentes || res.data.usuarios)
          ? (res.data.docentes || res.data.usuarios).map((u) => ({
              ...u,
              id: u.id || u._id,
            }))
          : [];
        setData(lista);
        setError(null);
      } else {
        throw new Error('Respuesta inesperada del servidor');
      }
    } catch (err) {
      console.error('❌ Error al obtener docentes:', err.message);
      setError(err.response?.data?.msg || 'No se pudo cargar la lista de docentes');
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDocentes();
  }, [fetchDocentes]);

  // 🆕 Crear docente
  const createDocente = async (nuevo) => {
    try {
      const payload = {
        nombre: nuevo.nombre,
        email: nuevo.email,
        password: nuevo.password,
        role: 'docente',
      };

      const res = await axiosInstancia.post('/auth/register', payload);

      // Caso 1: creación desde admin → devuelve usuario
      if ((res.status === 200 || res.status === 201) && res.data?.usuario) {
        const usuario = { ...res.data.usuario, id: res.data.usuario.id || res.data.usuario._id };
        setData((prev) => [...prev, usuario]);
        setError(null);
        return usuario;
      }

      // Caso 2: registro normal → solo devuelve msg
      if ((res.status === 200 || res.status === 201) && res.data?.msg) {
        console.log('📥 Registro exitoso (pendiente de validación):', res.data.msg);
        setError(null);
        return { ok: true, msg: res.data.msg };
      }

      throw new Error('No se recibió el usuario creado');
    } catch (err) {
      console.error('❌ Error al crear docente:', err.message);
      setError(err.response?.data?.msg || 'No se pudo crear el docente');
      throw err;
    }
  };

  // ✏️ Actualizar docente
  const updateDocente = async (id, actualizado) => {
    const safeId = id || actualizado.id || actualizado._id;
    if (!safeId) {
      console.error('❌ ID inválido para actualizar docente');
      setError('ID inválido para actualización');
      return;
    }

    try {
      const res = await axiosInstancia.put(`/admin/actualizar/${safeId}`, actualizado);

      if (res.status === 200 && res.data?.usuarioActualizado) {
        const actualizadoConId = {
          ...res.data.usuarioActualizado,
          id: res.data.usuarioActualizado.id || res.data.usuarioActualizado._id,
        };
        setData((prev) =>
          prev.map((doc) => (doc.id === safeId || doc._id === safeId ? actualizadoConId : doc))
        );
        setError(null);
        return actualizadoConId;
      } else {
        throw new Error('No se recibió el usuario actualizado');
      }
    } catch (err) {
      console.error('❌ Error al actualizar docente:', err.message);
      setError(err.response?.data?.msg || 'No se pudo actualizar el docente');
      throw err;
    }
  };

  // 🗑️ Eliminar/Rechazar docente
  const deleteDocente = async (id) => {
    const safeId = id;
    if (!safeId) {
      console.error('❌ ID inválido para eliminar docente');
      setError('ID inválido para eliminación');
      return;
    }

    try {
      const res = await axiosInstancia.delete(`/admin/rechazar/${safeId}`);
      if (res.status === 200 && res.data?.user) {
        setData((prev) => prev.filter((doc) => (doc.id || doc._id) !== safeId));
        setError(null);
        return res.data.user;
      } else {
        throw new Error('No se pudo eliminar el docente');
      }
    } catch (err) {
      console.error('❌ Error al eliminar docente:', err.message);
      setError(err.response?.data?.msg || 'No se pudo eliminar el docente');
      throw err;
    }
  };

  return {
    data, // docentes válidos
    loading,
    error,
    refetch: fetchDocentes,
    createDocente,
    updateDocente,
    deleteDocente,
  };
};

export default useDocentes;
