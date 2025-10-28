import { motion } from "framer-motion";

// 🎥 Visuales
import VideoFondoEstudiante from "@/components/estudiante/VideoFondoEstudiante.jsx";

// 🧭 Navegación
import NavbarEstudiante from "@/components/estudiante/NavbarEstudiante.jsx";
import Footer from "@/components/Footer.jsx";

// 🧩 UI académica
import SeccionActividadesEstudiante from "@/components/estudiante/SeccionActividadesEstudiante.jsx";

const ActividadesEstudiante = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white overflow-hidden">
      <VideoFondoEstudiante />
      <div className="relative z-10 flex-1">
        <NavbarEstudiante />

        <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center"
          >
            <h1 className="text-3xl font-bold text-yellow-400">
              Actividades Académicas
            </h1>
            <p className="mt-2 text-white/80 text-sm">
              Aquí puedes consultar las actividades asignadas por tus docentes.
              Selecciona una para ver detalles o realizar tu entrega.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <SeccionActividadesEstudiante
              actividadesFiltradas={[]} // puedes conectar con lógica real
              loadingActividades={false}
              onSeleccionarActividad={() => {}}
            />
          </motion.section>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default ActividadesEstudiante;
