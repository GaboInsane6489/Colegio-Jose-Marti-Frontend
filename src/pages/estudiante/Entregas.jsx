import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

// 🧭 Navegación
import NavbarEstudiante from "@/components/estudiante/NavbarEstudiante.jsx";
import Footer from "@/components/Footer.jsx";

// 🎥 Visuales
import VideoFondoEstudiante from "@/components/estudiante/VideoFondoEstudiante.jsx";

// 🧩 UI académica
import SeccionActividadesEstudiante from "@/components/estudiante/SeccionActividadesEstudiante.jsx";
import SeccionEntregasEstudiante from "@/components/estudiante/SeccionEntregasEstudiante.jsx";
import EntregasForm from "@/components/estudiante/EntregasForm.jsx";

/**
 * 📤 Vista institucional para gestionar entregas académicas del estudiante
 */
const Entregas = () => {
  const [actividades, setActividades] = useState([]);
  const [entregas, setEntregas] = useState([]);
  const [loadingActividades, setLoadingActividades] = useState(true);
  const [loadingEntregas, setLoadingEntregas] = useState(true);
  const [actividadSeleccionada, setActividadSeleccionada] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchActividades = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/estudiante/actividades`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setActividades(res.data.actividades || []);
      } catch (error) {
        console.error("❌ Error al cargar actividades:", error);
      } finally {
        setLoadingActividades(false);
      }
    };

    const fetchEntregas = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/estudiante/entregas`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEntregas(res.data.entregas || []);
      } catch (error) {
        console.error("❌ Error al cargar entregas:", error);
      } finally {
        setLoadingEntregas(false);
      }
    };

    fetchActividades();
    fetchEntregas();
  }, [token]);

  const entregasFiltradas = entregas.filter((e) =>
    actividadSeleccionada ? e.actividadId === actividadSeleccionada._id : true
  );

  return (
    <div className="min-h-screen flex flex-col bg-black text-white overflow-hidden">
      <VideoFondoEstudiante />
      <div className="relative z-10 flex-1">
        <NavbarEstudiante />
        <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10">
          {/* Actividades disponibles */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <SeccionActividadesEstudiante
              actividadesFiltradas={actividades}
              loadingActividades={loadingActividades}
              onSeleccionarActividad={setActividadSeleccionada}
            />
          </motion.section>

          {/* Formulario de entrega */}
          {actividadSeleccionada && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
              <EntregasForm
                actividad={actividadSeleccionada}
                actualizarEntregas={setEntregas}
              />
            </motion.section>
          )}

          {/* Entregas realizadas */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <SeccionEntregasEstudiante
              entregasFiltradas={entregasFiltradas}
              loadingEntregas={loadingEntregas}
            />
          </motion.section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Entregas;
