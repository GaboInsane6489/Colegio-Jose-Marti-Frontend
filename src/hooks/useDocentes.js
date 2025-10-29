import { useState, useEffect, useCallback } from "react";
import axiosInstancia from "@/services/axiosInstancia";

/**
 * 🧑‍🏫 Hook institucional para gestionar docentes desde el panel administrativo
 */
const useDocentes = () => {
  const [docentes, setDocentes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDocentes = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstancia.get("/api/admin/docentes");

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
  }, []);

  useEffect(() => {
    fetchDocentes();
  }, [fetchDocentes]);

  const crearDocente = async (nuevo) => {
    try {
      const payload = {
        nombre: nuevo.nombre,
        email: nuevo.correo,
        password: nuevo.password,
        role: "docente",
      };

      const { data } = await axiosInstancia.post("/api/auth/crear", payload);

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

  const actualizarDocente = async (id, actualizado) => {
    try {
      const { data } = await axiosInstancia.put(
        `/api/admin/actualizar/${id}`,
        actualizado
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

  const eliminarDocente = async (id) => {
    try {
      await axiosInstancia.delete(`/api/admin/rechazar/${id}`);
      setDocentes((prev) => prev.filter((doc) => doc._id !== id));
      setError(null);
    } catch (err) {
      console.error("❌ Error al eliminar docente:", err.message);
      setError("No se pudo eliminar el docente");
    }
  };

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
