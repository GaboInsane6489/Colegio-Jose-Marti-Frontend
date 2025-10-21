import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import isActividadValida from "@/utils/isActividadValida.js";

const API_URL = import.meta.env.VITE_API_URL?.trim() || "http://localhost:3000";

// 🧠 Validación ligera de ObjectId (24 caracteres hexadecimales)
const esObjectIdValido = (id) =>
  typeof id === "string" && /^[a-f\d]{24}$/i.test(id);

/**
 * 🎓 Hook institucional para gestionar actividades académicas por curso y filtros.
 */
const useActividades = (tokenProp, filtros = {}) => {
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchActividades = useCallback(async () => {
    const token =
      tokenProp ||
      localStorage.getItem("token") ||
      sessionStorage.getItem("token");

    if (!token) {
      console.warn("⚠️ Token no definido en useActividades");
      setError("Token no proporcionado");
      return;
    }

    setLoading(true);
    try {
      const params = {};

      if (filtros.cursoId && esObjectIdValido(filtros.cursoId)) {
        params.cursoId = filtros.cursoId;
      } else if (filtros.cursoId) {
        console.warn("⚠️ cursoId inválido:", filtros.cursoId);
        throw new Error("ID de curso inválido o no proporcionado.");
      }

      if (filtros.tipo && filtros.tipo !== "todos") params.tipo = filtros.tipo;
      if (filtros.estado && filtros.estado !== "todos")
        params.estado = filtros.estado;
      if (filtros.materia && filtros.materia !== "todos")
        params.materia = filtros.materia;

      const { data } = await axios.get(`${API_URL}/api/actividades`, {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });

      if (Array.isArray(data.actividades)) {
        const limpias = data.actividades.filter(isActividadValida);
        setActividades(limpias);
        setError(null);
      } else {
        console.warn("⚠️ Respuesta inesperada del backend:", data);
        setActividades([]);
        setError(data.msg || "Respuesta inesperada del servidor");
      }
    } catch (err) {
      const mensaje =
        err.response?.data?.msg ||
        err.message ||
        "No se pudieron cargar las actividades";

      console.error("❌ Error al cargar actividades:", mensaje);
      setError(mensaje);
      setActividades([]);
    } finally {
      setLoading(false);
    }
  }, [
    tokenProp,
    filtros.cursoId,
    filtros.tipo,
    filtros.estado,
    filtros.materia,
  ]);

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
