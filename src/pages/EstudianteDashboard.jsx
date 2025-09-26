import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import NavbarEstudiante from "../components/estudiante/NavbarEstudiante";
import ClasesList from "../components/estudiante/ClasesList";

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
    <div className="min-h-screen bg-gray-100">
      <NavbarEstudiante />

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="text-3xl font-bold text-center text-indigo-700"
        >
          🎓 Panel del Estudiante
        </motion.h1>

        <section id="clases" className="space-y-6 scroll-mt-24">
          <h2 className="text-xl font-semibold text-gray-800">
            Tus clases activas
          </h2>
          {loading ? (
            <p className="text-gray-500">Cargando clases...</p>
          ) : (
            <ClasesList clases={clases} />
          )}
        </section>
      </main>
    </div>
  );
};

export default EstudianteDashboard;
