import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL?.trim() || "http://localhost:3000";

const useNotas = (token, filtros = {}) => {
  const [entregas, setEntregas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNotas = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();

      Object.entries(filtros).forEach(([key, value]) => {
        if (value && value !== "todos") {
          params.append(key, value);
        }
      });

      const { data } = await axios.get(`${API_URL}/api/entregas`, {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });

      if (Array.isArray(data.entregas)) {
        setEntregas(data.entregas);
      } else {
        setEntregas([]);
        console.warn("⚠️ Respuesta inesperada:", data);
      }
    } catch (err) {
      console.error("❌ Error al obtener entregas:", err.message);
      setError("No se pudieron cargar las entregas.");
    } finally {
      setLoading(false);
    }
  }, [token, filtros]);

  useEffect(() => {
    fetchNotas();
  }, [fetchNotas]);

  return { entregas, loading, error };
};

export default useNotas;
