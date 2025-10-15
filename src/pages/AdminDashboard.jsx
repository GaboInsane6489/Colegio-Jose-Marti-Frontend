import NavbarAdmin from "../components/admin/NavbarAdmin";
import PendientesList from "../components/admin/PendientesList";
import EstadisticasPanel from "../components/admin/EstadisticasPanel";
import ConfiguracionPanel from "../components/admin/ConfiguracionPanel";
import UsuariosTable from "../components/admin/UsuariosTable";
import DocentesManager from "../components/admin/DocentesManager";
import VideoFondoAdmin from "../components/admin/VideoFondoAdmin";
import Footer from "../components/Footer";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 🎥 Fondo institucional exclusivo del panel admin */}
      <VideoFondoAdmin />

      {/* 🧠 Overlay de contenido */}
      <div className="relative z-10 flex-1">
        <NavbarAdmin />

        <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
          {/* 🔐 Validación de usuarios pendientes */}
          <section id="validacion" className="scroll-mt-24">
            <PendientesList />
          </section>

          {/* 📋 Tabla de todos los usuarios */}
          <section id="usuarios" className="scroll-mt-24">
            <UsuariosTable />
          </section>

          {/* 👩‍🏫 Gestión de docentes */}
          <section id="docentes" className="scroll-mt-24">
            <DocentesManager />
          </section>

          {/* 📊 Estadísticas generales */}
          <section id="estadisticas" className="scroll-mt-24">
            <EstadisticasPanel />
          </section>

          {/* ⚙️ Configuración institucional */}
          <section id="configuracion" className="scroll-mt-24">
            <ConfiguracionPanel />
          </section>
        </main>

        {/* 🦶 Footer institucional compartido */}
        <Footer />
      </div>
    </div>
  );
};

export default AdminDashboard;
