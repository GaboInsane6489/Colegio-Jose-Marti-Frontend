import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaBookOpen,
  FaChalkboardTeacher,
  FaTasks,
  FaChartLine,
  FaEnvelopeOpenText,
} from "react-icons/fa";
import NavbarEstudiante from "../components/estudiante/NavbarEstudiante";
import ClasesList from "../components/estudiante/ClasesList";
import VideoFondoEstudiante from "../components/estudiante/VideoFondoEstudiante";
import Footer from "../components/Footer";

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
    <div className="min-h-screen flex flex-col">
      {/* 🎥 Fondo institucional exclusivo del dashboard */}
      <VideoFondoEstudiante />

      {/* 🧠 Overlay de contenido */}
      <div className="relative z-10 flex-1">
        <NavbarEstudiante />

        <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
          {/* Encabezado institucional con fondo oscuro */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="text-center bg-black/60 rounded-xl py-8 px-4 shadow-lg"
          >
            <FaBookOpen className="text-white text-5xl sm:text-6xl mb-2 mx-auto drop-shadow-lg" />
            <h1 className="text-2xl sm:text-4xl font-bold text-white drop-shadow-lg">
              Panel del Estudiante
            </h1>
            <p className="mt-2 text-white text-sm sm:text-base italic drop-shadow">
              Bienvenido al espacio donde tus clases cobran vida ✨
            </p>
          </motion.div>

          {/* Clases activas */}
          <section
            id="clases"
            className="bg-white/90 text-gray-900 rounded-xl shadow-lg p-6 space-y-6 scroll-mt-24"
          >
            <div className="text-center mb-6">
              <FaChalkboardTeacher className="text-gray-800 text-4xl mb-2 mx-auto" />
              <h2 className="text-lg sm:text-2xl font-semibold text-gray-900">
                Tus clases activas
              </h2>
            </div>

            {loading ? (
              <p className="text-gray-500 animate-pulse">Cargando clases...</p>
            ) : clases.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-lg">No tienes clases asignadas por ahora.</p>
                <p className="text-sm mt-2 italic text-gray-500">
                  Cuando se asignen, aparecerán aquí para que comiences tu
                  transformación académica ✨
                </p>
              </div>
            ) : (
              <ClasesList clases={clases} />
            )}
          </section>

          {/* Secciones simuladas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/90 text-gray-900 rounded-xl p-5 shadow-lg text-center">
              <FaTasks className="text-gray-800 text-3xl mb-2 mx-auto" />
              <h3 className="text-base sm:text-lg font-semibold mb-2">
                Tareas pendientes
              </h3>
              <p className="text-sm text-gray-600">
                Aún no tienes tareas asignadas. ¡Prepárate para nuevos desafíos!
              </p>
            </div>

            <div className="bg-white/90 text-gray-900 rounded-xl p-5 shadow-lg text-center">
              <FaChartLine className="text-gray-800 text-3xl mb-2 mx-auto" />
              <h3 className="text-base sm:text-lg font-semibold mb-2">
                Progreso académico
              </h3>
              <p className="text-sm text-gray-600">
                Tu progreso aparecerá aquí cuando comiences tus clases.
              </p>
            </div>

            <div className="bg-white/90 text-gray-900 rounded-xl p-5 shadow-lg text-center">
              <FaEnvelopeOpenText className="text-gray-800 text-3xl mb-2 mx-auto" />
              <h3 className="text-base sm:text-lg font-semibold mb-2">
                Mensajes recientes
              </h3>
              <p className="text-sm text-gray-600">
                No hay mensajes nuevos. Revisa aquí tus comunicaciones con
                docentes.
              </p>
            </div>
          </div>
        </main>

        {/* Footer institucional */}
        <Footer />
      </div>
    </div>
  );
};

export default EstudianteDashboard;
