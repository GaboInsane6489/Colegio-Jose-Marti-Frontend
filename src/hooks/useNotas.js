import { useState, useEffect, useCallback } from "react";
import axiosInstancia from "@/services/axiosInstancia";

/**
 * 🧠 Hook institucional para obtener entregas (notas) con filtros académicos
 */
const useNotas = (filtros = {}) => {
  const [entregas, setEntregas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNotas = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();

      Object.entries(filtros).forEach(([key, value]) => {
        if (value && value !== "todos") {
          params.append(key, value);
        }
      });

      const { data } = await axiosInstancia.get("/api/entregas", {
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
  }, [filtros]);

  useEffect(() => {
    fetchNotas();
  }, [fetchNotas]);

  return { entregas, loading, error };
};

export default useNotas;
