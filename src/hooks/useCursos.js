import { useState, useEffect } from 'react';
import axios from 'axios';

const API = '/api/cursos';

export const useCursos = (rol = 'docente') => {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔍 Obtener cursos según rol
  const fetchCursos = async () => {
    setLoading(true);
    try {
      const endpoint = rol === 'docente' ? `${API}/docente` : `${API}/estudiante`;
      const { data } = await axios.get(endpoint);
      setCursos(data.cursos || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.msg || 'Error al cargar cursos');
    } finally {
      setLoading(false);
    }
  };

  // 🆕 Crear curso
  const crearCurso = async (cursoData) => {
    try {
      const { data } = await axios.post(API, cursoData);
      setCursos((prev) => [data.curso, ...prev]);
      return data;
    } catch (err) {
      throw new Error(err.response?.data?.msg || 'Error al crear curso');
    }
  };

  // ✏️ Editar curso
  const editarCurso = async (id, cursoData) => {
    try {
      const { data } = await axios.put(`${API}/${id}`, cursoData);
      setCursos((prev) => prev.map((c) => (c._id === id ? data.curso : c)));
      return data;
    } catch (err) {
      throw new Error(err.response?.data?.msg || 'Error al editar curso');
    }
  };

  // 🗑️ Eliminar curso
  const eliminarCurso = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      setCursos((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      throw new Error(err.response?.data?.msg || 'Error al eliminar curso');
    }
  };

  // 👥 Asignar estudiantes
  const asignarEstudiantes = async (cursoId, estudiantesIds) => {
    try {
      const { data } = await axios.post(`${API}/asignar-estudiantes`, {
        cursoId,
        estudiantesIds,
      });
      setCursos((prev) => prev.map((c) => (c._id === cursoId ? data.curso : c)));
      return data;
    } catch (err) {
      throw new Error(err.response?.data?.msg || 'Error al asignar estudiantes');
    }
  };

  useEffect(() => {
    fetchCursos();
  }, [rol]);

  return {
    cursos,
    loading,
    error,
    fetchCursos,
    crearCurso,
    editarCurso,
    eliminarCurso,
    asignarEstudiantes,
  };
};
