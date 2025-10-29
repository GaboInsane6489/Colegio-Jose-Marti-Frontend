import { useState, useEffect, useCallback } from "react";
import axiosInstancia from "@/services/axiosInstancia";

/**
 * 🔔 Hook institucional para obtener y gestionar notificaciones por usuario
 */
const useNotificaciones = (usuarioId) => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNotificaciones = useCallback(async () => {
    if (!usuarioId) return;

    setLoading(true);
    setError("");

    try {
      const { data } = await axiosInstancia.get(
        `/api/notificaciones/usuario/${usuarioId}`
      );

      if (Array.isArray(data.notificaciones)) {
        setNotificaciones(data.notificaciones);
      } else {
        setNotificaciones([]);
        console.warn("⚠️ Respuesta inesperada:", data);
      }
    } catch (err) {
      console.error("❌ Error al obtener notificaciones:", err.message);
      setError("No se pudieron cargar las notificaciones.");
    } finally {
      setLoading(false);
    }
  }, [usuarioId]);

  const marcarComoLeida = async (notificacionId) => {
    try {
      await axiosInstancia.put(`/api/notificaciones/${notificacionId}/leido`);

      setNotificaciones((prev) =>
        prev.map((n) => (n._id === notificacionId ? { ...n, leido: true } : n))
      );
    } catch (err) {
      console.error("❌ Error al marcar como leída:", err.message);
    }
  };

  useEffect(() => {
    fetchNotificaciones();
  }, [fetchNotificaciones]);

  return {
    notificaciones,
    loading,
    error,
    marcarComoLeida,
    recargar: fetchNotificaciones,
  };
};

export default useNotificaciones;
