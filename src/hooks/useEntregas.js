import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const useEntregas = (actividadId, token) => {
  const [entregas, setEntregas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!actividadId || !token) return;

    const fetchEntregas = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${API_URL}/api/entregas/${actividadId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (data?.ok) {
          setEntregas(data.entregas);
          setError(null);
        } else {
          throw new Error(data.message || "Respuesta inesperada del servidor");
        }
      } catch (err) {
        console.error("❌ Error al cargar entregas:", err.message);
        setError("No se pudieron cargar las entregas");
      } finally {
        setLoading(false);
      }
    };

    fetchEntregas();
  }, [actividadId, token]);

  return { entregas, loading, error };
};

export default useEntregas;
