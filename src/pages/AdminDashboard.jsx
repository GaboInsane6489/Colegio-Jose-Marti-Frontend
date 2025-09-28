import NavbarAdmin from "../components/NavbarAdmin";
import PendientesList from "../components/PendientesList";
import EstadisticasPanel from "../components/EstadisticasPanel";
import ConfiguracionPanel from "../components/ConfiguracionPanel";
import UsuariosTable from "../components/UsuariosTable";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
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

        {/* 📊 Estadísticas generales */}
        <section id="estadisticas" className="scroll-mt-24">
          <EstadisticasPanel />
        </section>

        {/* ⚙️ Configuración institucional */}
        <section id="configuracion" className="scroll-mt-24">
          <ConfiguracionPanel />
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
