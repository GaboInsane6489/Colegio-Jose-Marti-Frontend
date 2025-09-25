import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const EstudianteDashboard = () => {
  const [clases, setClases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClases = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:3000/api/estudiante/clases",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setClases(res.data.clases);
      } catch (error) {
        console.error("❌ Error al cargar clases:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClases();
  }, []);

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="text-3xl font-bold mb-6 text-purple-800 text-center"
      >
        Panel del Estudiante
      </motion.h1>

      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Tus clases activas
      </h2>

      {loading ? (
        <p className="text-gray-500">Cargando clases...</p>
      ) : clases.length === 0 ? (
        <p className="text-gray-600">No tienes clases asignadas.</p>
      ) : (
        <ul className="space-y-4">
          {clases.map((clase, index) => (
            <motion.li
              key={clase._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, type: "spring", bounce: 0.4 }}
              className="bg-white p-4 shadow rounded border border-gray-200 hover:bg-gray-50 hover:shadow-md transition duration-200"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">📘 {clase.nombre}</p>
                  <p className="text-sm text-gray-600">
                    Profesor: {clase.docente}
                  </p>
                </div>
                <button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 hover:brightness-110 transition duration-200">
                  Ver clase
                </button>
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EstudianteDashboard;
