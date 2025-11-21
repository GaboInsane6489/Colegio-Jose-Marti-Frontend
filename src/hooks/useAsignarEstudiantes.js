import { useState } from 'react';
import axiosInstancia from '@/services/axiosInstancia';
import toast from 'react-hot-toast';
import { esObjectIdValido } from '@/utils/helpers.js';

/**
 * 🎓 Hook institucional para asignar estudiantes a una clase
 */
const useAsignarEstudiantes = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * 📌 Asigna estudiantes a una clase
   * @param {string} claseId - ID de la clase
   * @param {Array<string>} estudiantesIds - IDs de estudiantes
   */
  const assignEstudiantesToClase = async ({ claseId, estudiantesIds }) => {
    setError(null);

    // 🔍 Validaciones iniciales
    const claseIdValido = esObjectIdValido(claseId);
    const idsUnicos = [...new Set(estudiantesIds.map((id) => id.trim()))];
    const idsValidos = idsUnicos.filter((id) => esObjectIdValido(id));

    if (!claseIdValido) {
      const msg = 'ID de clase inválido.';
      console.warn('⚠️', msg);
      setError(msg);
      toast.error(msg);
      return { data: null, msg, status: 'error' };
    }

    if (idsValidos.length === 0) {
      const msg = 'Debes seleccionar al menos un estudiante válido.';
      console.warn('⚠️', msg);
      setError(msg);
      toast.error(msg);
      return { data: null, msg, status: 'error' };
    }

    setLoading(true);
    try {
      const { data } = await axiosInstancia.post(`/clases/${claseId}/asignar`, {
        estudiantes: idsValidos,
      });

      if (data.ok) {
        toast.success(data.msg || '✅ Estudiantes asignados correctamente');
        return { data: data.clase, msg: data.msg, status: 'success' };
      } else {
        toast.error(data.msg || '❌ No se pudo asignar estudiantes');
        return { data: null, msg: data.msg, status: 'error' };
      }
    } catch (err) {
      const msg = err.response?.data?.msg || '❌ Error al asignar estudiantes';
      console.error('❌ Error en asignación:', msg);
      setError(msg);
      toast.error(msg);
      return { data: null, msg, status: 'error' };
    } finally {
      setLoading(false);
    }
  };

  return {
    assignEstudiantesToClase,
    loading,
    error,
  };
};

export default useAsignarEstudiantes;
