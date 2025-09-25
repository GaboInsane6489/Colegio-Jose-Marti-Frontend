import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const PendientesList = () => {
  const [pendientes, setPendientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchPendientes = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:3000/api/admin/pendientes",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPendientes(res.data.pendientes);
    } catch (error) {
      console.error("❌ Error al cargar usuarios pendientes:", error);
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
      await axios.patch(`http://localhost:3000/api/admin/validar/${id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPendientes((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      console.error("❌ Error al validar usuario:", error);
      alert("No se pudo validar el usuario.");
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
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Usuarios pendientes</h2>
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
          <p className="text-gray-400">No hay usuarios pendientes.</p>
        ) : (
          <ul className="space-y-4">
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
                className="bg-white text-black p-4 shadow rounded hover:shadow-md transition duration-200"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">📧 {user.email}</p>
                    <p className="text-sm text-gray-600">Rol: {user.role}</p>
                  </div>
                  <button
                    onClick={() => validarUsuario(user._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 hover:brightness-110 transition duration-200"
                  >
                    ✅ Validar
                  </button>
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
