import { useState, useEffect } from "react";
import axios from "axios";

const useDocentes = () => {
  const [docentes, setDocentes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener token desde localStorage (ajusta si usas context o cookies)
  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const fetchDocentes = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/docentes", { headers });
      setDocentes(data);
    } catch (err) {
      setError(err.message);
      console.error("Error al obtener docentes:", err);
    } finally {
      setLoading(false);
    }
  };

  const crearDocente = async (nuevo) => {
    try {
      const { data } = await axios.post("/api/docentes", nuevo, { headers });
      setDocentes((prev) => [...prev, data]);
    } catch (err) {
      setError(err.message);
      console.error("Error al crear docente:", err);
    }
  };

  const actualizarDocente = async (id, actualizado) => {
    try {
      const { data } = await axios.put(`/api/docentes/${id}`, actualizado, {
        headers,
      });
      setDocentes((prev) => prev.map((doc) => (doc._id === id ? data : doc)));
    } catch (err) {
      setError(err.message);
      console.error("Error al actualizar docente:", err);
    }
  };

  const eliminarDocente = async (id) => {
    try {
      await axios.delete(`/api/docentes/${id}`, { headers });
      setDocentes((prev) => prev.filter((doc) => doc._id !== id));
    } catch (err) {
      setError(err.message);
      console.error("Error al eliminar docente:", err);
    }
  };

  useEffect(() => {
    fetchDocentes();
  }, []);

  return {
    docentes,
    loading,
    error,
    crearDocente,
    actualizarDocente,
    eliminarDocente,
  };
};

export default useDocentes;
