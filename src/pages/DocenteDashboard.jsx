import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const DocenteDashboard = () => {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:3000/api/docente/cursos",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCursos(res.data.cursos);
      } catch (error) {
        console.error("❌ Error al cargar cursos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCursos();
  }, []);

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="text-3xl font-bold mb-6 text-green-800 text-center"
      >
        Panel del Docente
      </motion.h1>

      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Tus cursos asignados
      </h2>

      {loading ? (
        <p className="text-gray-500">Cargando cursos...</p>
      ) : cursos.length === 0 ? (
        <p className="text-gray-600">No tienes cursos asignados.</p>
      ) : (
        <ul className="space-y-4">
          {cursos.map((curso, index) => (
            <motion.li
              key={curso._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, type: "spring", bounce: 0.4 }}
              className="bg-white p-4 shadow rounded border border-gray-200 hover:bg-gray-50 hover:shadow-md transition duration-200"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">📚 {curso.nombre}</p>
                  <p className="text-sm text-gray-600">
                    Estudiantes: {curso.estudiantes.length}
                  </p>
                </div>
                <button className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600 hover:brightness-110 transition duration-200">
                  Gestionar
                </button>
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DocenteDashboard;
