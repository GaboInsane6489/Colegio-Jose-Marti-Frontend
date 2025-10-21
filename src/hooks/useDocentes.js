import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"; // ← compatible con entorno

const useDocentes = () => {
  const [docentes, setDocentes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getToken = () =>
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const getHeaders = () => {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  /**
   * 📋 Obtener lista de docentes institucionales
   */
  const fetchDocentes = async () => {
    const headers = getHeaders();
    if (!headers.Authorization) {
      console.warn("🔒 No hay token disponible para obtener docentes");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}/api/admin/docentes`, {
        headers,
      });

      if (data?.docentes) {
        setDocentes(data.docentes);
        setError(null);
      } else {
        throw new Error("Respuesta inesperada del servidor");
      }
    } catch (err) {
      console.error("❌ Error al obtener docentes:", err.message);
      setError("No se pudo cargar la lista de docentes");
    } finally {
      setLoading(false);
    }
  };

  /**
   * 📝 Crear nuevo docente institucional
   */
  const crearDocente = async (nuevo) => {
    const headers = getHeaders();
    try {
      const payload = {
        nombre: nuevo.nombre,
        email: nuevo.correo, // 👈 corregido
        password: nuevo.password,
        role: "docente",
      };

      const { data } = await axios.post(`${API_URL}/api/auth/crear`, payload, {
        headers,
      });

      if (data?.usuario) {
        setDocentes((prev) => [...prev, data.usuario]);
        setError(null);
      } else {
        throw new Error("No se recibió el usuario creado");
      }
    } catch (err) {
      console.error("❌ Error al crear docente:", err.message);
      setError("No se pudo crear el docente");
    }
  };

  /**
   * ✏️ Actualizar docente institucional
   */
  const actualizarDocente = async (id, actualizado) => {
    const headers = getHeaders();
    try {
      const { data } = await axios.put(
        `${API_URL}/api/admin/actualizar/${id}`,
        actualizado,
        { headers }
      );

      if (data?.usuarioActualizado) {
        setDocentes((prev) =>
          prev.map((doc) => (doc._id === id ? data.usuarioActualizado : doc))
        );
        setError(null);
      } else {
        throw new Error("No se recibió el usuario actualizado");
      }
    } catch (err) {
      console.error("❌ Error al actualizar docente:", err.message);
      setError("No se pudo actualizar el docente");
    }
  };

  /**
   * ❌ Eliminar docente institucional
   */
  const eliminarDocente = async (id) => {
    const headers = getHeaders();
    try {
      await axios.delete(`${API_URL}/api/admin/rechazar/${id}`, { headers });
      setDocentes((prev) => prev.filter((doc) => doc._id !== id));
      setError(null);
    } catch (err) {
      console.error("❌ Error al eliminar docente:", err.message);
      setError("No se pudo eliminar el docente");
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
