import NavbarAdmin from "../components/NavbarAdmin";
import PendientesList from "../components/PendientesList";
import EstadisticasPanel from "../components/EstadisticasPanel";
import ConfiguracionPanel from "../components/ConfiguracionPanel";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarAdmin />
      <main className="pt-24 space-y-16">
        <PendientesList />
        <EstadisticasPanel />
        <ConfiguracionPanel />
      </main>
    </div>
  );
};

export default AdminDashboard;
