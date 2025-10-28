import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL?.trim() || "http://localhost:3000";

const useNotificaciones = (token, usuarioId) => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNotificaciones = async () => {
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.get(
        `${API_URL}/api/notificaciones/usuario/${usuarioId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
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
  };

  const marcarComoLeida = async (notificacionId) => {
    try {
      await axios.put(
        `${API_URL}/api/notificaciones/${notificacionId}/leido`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setNotificaciones((prev) =>
        prev.map((n) => (n._id === notificacionId ? { ...n, leido: true } : n))
      );
    } catch (err) {
      console.error("❌ Error al marcar como leída:", err.message);
    }
  };

  useEffect(() => {
    if (token && usuarioId) {
      fetchNotificaciones();
    }
  }, [token, usuarioId]);

  return {
    notificaciones,
    loading,
    error,
    marcarComoLeida,
    recargar: fetchNotificaciones,
  };
};

export default useNotificaciones;
