import { useState } from 'react';
import axiosInstancia from '@/services/axiosInstancia';
import toast from 'react-hot-toast';

// 🧠 Validación básica de ObjectId
const esObjectIdValido = (id) => typeof id === 'string' && /^[a-f\d]{24}$/i.test(id.trim());

/**
 * 🎓 Hook institucional para asignar estudiantes a un curso
 */
const useAsignarEstudiantes = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const asignarEstudiantes = async ({ cursoId, estudiantesIds }) => {
    setError(null);

    // 🔍 Validaciones iniciales
    const cursoIdValido = esObjectIdValido(cursoId);
    const idsUnicos = [...new Set(estudiantesIds.map((id) => id.trim()))];
    const idsValidos = idsUnicos.filter((id) => esObjectIdValido(id));

    if (!cursoIdValido) {
      const msg = 'ID de curso inválido.';
      console.warn('⚠️', msg);
      setError(msg);
      toast.error(msg);
      return { curso: null, msg, status: 'error' };
    }

    if (idsValidos.length === 0) {
      const msg = 'Debes seleccionar al menos un estudiante válido.';
      console.warn('⚠️', msg);
      setError(msg);
      toast.error(msg);
      return { curso: null, msg, status: 'error' };
    }

    setLoading(true);
    try {
      const { data } = await axiosInstancia.post('/api/docente/cursos/asignar', {
        cursoId,
        estudiantesIds: idsValidos,
      });

      if (data.ok) {
        toast.success(data.msg || '✅ Estudiantes asignados correctamente');
        return { curso: data.curso, msg: data.msg, status: 'success' };
      } else {
        toast.error(data.msg || '❌ No se pudo asignar estudiantes');
        return { curso: null, msg: data.msg, status: 'error' };
      }
    } catch (err) {
      const msg = err.response?.data?.msg || '❌ Error al asignar estudiantes';
      console.error('❌ Error en asignación:', msg);
      setError(msg);
      toast.error(msg);
      return { curso: null, msg, status: 'error' };
    } finally {
      setLoading(false);
    }
  };

  return {
    asignarEstudiantes,
    loading,
    error,
  };
};

export default useAsignarEstudiantes;
