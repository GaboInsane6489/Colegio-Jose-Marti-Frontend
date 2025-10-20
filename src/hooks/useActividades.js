import { useState, useEffect, useCallback } from "react";
import axios from "axios";

// 🔧 Asegura que la URL esté limpia
const API_URL = import.meta.env.VITE_API_URL?.trim() || "http://localhost:3000";

/**
 * 🎓 Hook institucional para gestionar actividades académicas por curso y filtros.
 * Retorna estado, errores, función para actualizar actividades manualmente,
 * y función para volver a cargar desde el backend.
 */
const useActividades = (token, filtros = {}) => {
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * 🔁 Carga actividades desde el backend con filtros opcionales
   */
  const fetchActividades = useCallback(async () => {
    if (!token) {
      console.warn("⚠️ Token no definido en useActividades");
      return;
    }

    setLoading(true);
    try {
      const params = {};

      if (filtros.cursoId) params.cursoId = filtros.cursoId;
      if (filtros.tipo) params.tipo = filtros.tipo;
      if (filtros.estado) params.estado = filtros.estado;
      if (filtros.materia) params.materia = filtros.materia;

      const { data } = await axios.get(`${API_URL}/api/actividades`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      });

      if (Array.isArray(data.actividades)) {
        console.log("📥 Actividades recibidas:", data.actividades);
        setActividades(data.actividades);
        setError(null);
      } else {
        console.warn("⚠️ Respuesta inesperada del backend:", data);
        setActividades([]);
        setError(data.msg || "Respuesta inesperada del servidor");
      }
    } catch (err) {
      console.error("❌ Error al cargar actividades:", err.message);
      setError(
        err.response?.data?.msg || "No se pudieron cargar las actividades"
      );
    } finally {
      setLoading(false);
    }
  }, [token, filtros.cursoId, filtros.tipo, filtros.estado, filtros.materia]);

  // 🧠 Carga inicial al montar o cambiar filtros/token
  useEffect(() => {
    fetchActividades();
  }, [fetchActividades]);

  return {
    actividades,
    setActividades,
    loading,
    error,
    refetchActividades: fetchActividades,
  };
};

export default useActividades;
