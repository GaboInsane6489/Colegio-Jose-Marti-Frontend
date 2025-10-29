import { useState, useEffect } from "react";
import axiosInstancia from "@/services/axiosInstancia";

/**
 * 🧠 Hook institucional para llamadas protegidas
 * Devuelve { datos, cargando, error } desde cualquier endpoint.
 */
const useProtectedFetch = (endpoint, activar = true) => {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!activar || !endpoint) return;

    const obtenerDatos = async () => {
      setCargando(true);
      try {
        const res = await axiosInstancia.get(endpoint);
        setDatos(res.data);
      } catch (err) {
        console.error("❌ Error en fetch protegido:", err);
        setError(err);
      } finally {
        setCargando(false);
      }
    };

    obtenerDatos();
  }, [endpoint, activar]);

  return { datos, cargando, error };
};

export default useProtectedFetch;
