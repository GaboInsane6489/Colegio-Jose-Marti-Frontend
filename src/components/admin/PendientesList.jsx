import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

/**
 * 🧾 Componente institucional para validar usuarios pendientes
 */
const PendientesList = () => {
  const [pendientes, setPendientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchPendientes = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("❌ No se encontró el token en localStorage");
        setErrorMsg("Sesión inválida. Por favor inicia sesión nuevamente.");
        return;
      }

      const res = await axios.get(
        "http://localhost:3000/api/admin/pendientes",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPendientes(res.data.pendientes);
    } catch (error) {
      console.error("❌ Error al cargar usuarios pendientes:", error.message);
      setErrorMsg("No se pudo cargar la lista de usuarios.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendientes();
  }, []);

  const validarUsuario = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("⚠️ Sesión inválida. Inicia sesión nuevamente.");
        return;
      }

      await axios.patch(`http://localhost:3000/api/admin/validar/${id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPendientes((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      console.error("❌ Error al validar usuario:", error.message);
      if (error.response?.status === 401) {
        alert(
          "⚠️ No tienes permiso para validar usuarios. Inicia sesión como administrador."
        );
      } else {
        alert("❌ Error inesperado al validar usuario.");
      }
    }
  };

  const rechazarUsuario = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("⚠️ Sesión inválida. Inicia sesión nuevamente.");
        return;
      }

      await axios.delete(`http://localhost:3000/api/admin/rechazar/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPendientes((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      console.error("❌ Error al rechazar usuario:", error.message);
      if (error.response?.status === 401) {
        alert("⚠️ No tienes permiso para rechazar usuarios.");
      } else {
        alert("❌ Error inesperado al rechazar usuario.");
      }
    }
  };

  return (
    <motion.section
      id="validacion"
      className="bg-[#121212] text-white py-10 px-4 sm:px-6"
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 30 }}
      transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
    >
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-wide">
            Validación de usuarios registrados
          </h2>
          <button
            onClick={fetchPendientes}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            🔄 Recargar
          </button>
        </div>

        {loading ? (
          <p className="text-gray-400">Cargando usuarios...</p>
        ) : errorMsg ? (
          <p className="text-red-400">{errorMsg}</p>
        ) : pendientes.length === 0 ? (
          <div className="text-center text-gray-400">
            <p>🎉 No hay usuarios pendientes por validar.</p>
          </div>
        ) : (
          <ul className="space-y-6">
            {pendientes.map((user, index) => (
              <motion.li
                key={user._id}
                whileInView={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.95 }}
                transition={{
                  delay: index * 0.05,
                  type: "spring",
                  bounce: 0.4,
                }}
                className="bg-white text-black p-6 rounded shadow hover:shadow-lg transition duration-200"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-lg">📧 {user.email}</p>
                    <p className="text-sm text-gray-600">
                      Rol solicitado:{" "}
                      <span className="font-medium text-indigo-600">
                        {user.role}
                      </span>
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => validarUsuario(user._id)}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                    >
                      ✅ Validar
                    </button>
                    <button
                      onClick={() => rechazarUsuario(user._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                    >
                      ❌ Rechazar
                    </button>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </motion.section>
  );
};

export default PendientesList;
