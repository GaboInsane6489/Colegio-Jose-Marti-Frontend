import { useState, useEffect, useCallback } from 'react';
import axiosInstancia from '@/services/axiosInstancia';

/**
 * 🎓 Hook institucional para gestionar cursos
 * Roles soportados: docente, estudiante, admin
 */
const useCursos = (rol = 'docente') => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔍 Obtener cursos según rol
  const fetchCursos = useCallback(async () => {
    setLoading(true);
    try {
      let endpoint;
      if (rol === 'docente') {
        endpoint = '/docente/cursos';
      } else if (rol === 'estudiante') {
        endpoint = '/estudiante/cursos';
      } else if (rol === 'admin') {
        endpoint = '/admin/cursos';
      }

      const { data: response } = await axiosInstancia.get(endpoint);
      const cursos = Array.isArray(response.cursos) ? response.cursos : [];

      setData(cursos);
      setError(null);

      if (process.env.NODE_ENV === 'development') {
        console.log(`✅ Cursos recibidos (${cursos.length})`);
      }
    } catch (err) {
      const msg = err.response?.data?.msg || err.message || 'Error al cargar cursos';
      setError(msg);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [rol]);

  useEffect(() => {
    fetchCursos();
  }, [fetchCursos]);

  // 🆕 Crear curso (admin o docente)
  const createCurso = async (cursoData) => {
    try {
      const payload = {
        nombre: cursoData.nombre,
        anioAcademico: Number(cursoData.anioAcademico),
        anioEstudiantil: Number(cursoData.anioEstudiantil),
        seccion: cursoData.seccion,
        descripcion: cursoData.descripcion,
        materias: Array.isArray(cursoData.materias)
          ? cursoData.materias.map((m) => (typeof m === 'string' ? { nombre: m } : m))
          : [],
        estudiantes: cursoData.estudiantes || [],
      };

      const endpoint = rol === 'admin' ? '/admin/cursos' : '/docente/cursos';
      const res = await axiosInstancia.post(endpoint, payload);

      if (res.status >= 400 || (!res.data?.curso?.id && !res.data?.curso?._id)) {
        const msg = res.data?.msg || 'Error al crear curso';
        throw new Error(msg);
      }

      setData((prev) => [res.data.curso, ...prev]);
      return res.data;
    } catch (err) {
      const msg = err.response?.data?.msg || err.message || 'Error al crear curso';
      throw new Error(msg);
    }
  };

  // ✏️ Editar curso
  const updateCurso = async (id, cursoData) => {
    try {
      const payload = {
        nombre: cursoData.nombre,
        anioAcademico: Number(cursoData.anioAcademico),
        anioEstudiantil: Number(cursoData.anioEstudiantil),
        seccion: cursoData.seccion,
        descripcion: cursoData.descripcion,
        materias: Array.isArray(cursoData.materias)
          ? cursoData.materias.map((m) => (typeof m === 'string' ? { nombre: m } : m))
          : [],
        estudiantes: cursoData.estudiantes || [],
      };

      const endpoint = rol === 'admin' ? `/admin/cursos/${id}` : `/docente/cursos/${id}`;
      const res = await axiosInstancia.put(endpoint, payload);

      if (res.status >= 400 || (!res.data?.curso?.id && !res.data?.curso?._id)) {
        const msg = res.data?.msg || 'Error al editar curso';
        throw new Error(msg);
      }

      setData((prev) => prev.map((c) => (c._id === id || c.id === id ? res.data.curso : c)));
      return res.data;
    } catch (err) {
      const msg = err.response?.data?.msg || err.message || 'Error al editar curso';
      throw new Error(msg);
    }
  };

  // 🗑️ Eliminar curso
  const deleteCurso = async (id) => {
    try {
      const endpoint = rol === 'admin' ? `/admin/cursos/${id}` : `/docente/cursos/${id}`;
      const res = await axiosInstancia.delete(endpoint);

      if (res.status >= 400) {
        const msg = res.data?.msg || 'Error al eliminar curso';
        throw new Error(msg);
      }

      setData((prev) => prev.filter((c) => c._id !== id && c.id !== id));
    } catch (err) {
      const msg = err.response?.data?.msg || err.message || 'Error al eliminar curso';
      throw new Error(msg);
    }
  };

  return {
    data,
    loading,
    error,
    refetch: fetchCursos,
    createCurso,
    updateCurso,
    deleteCurso,
  };
};

export default useCursos;
