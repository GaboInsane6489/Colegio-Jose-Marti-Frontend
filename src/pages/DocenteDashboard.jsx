import NavbarDocente from "@/components/docente/NavbarDocente";
import CursosAsignados from "@/components/docente/CursosAsignados";
import PerfilDocente from "@/components/docente/PerfilDocente";
import NotificacionesDocente from "@/components/docente/NotificacionesDocente";
import Footer from "@/components/Footer";
import VideoFondoDocente from "@/components/docente/VideoFondoDocente";

const DocenteDashboard = () => {
  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* 🎥 Video institucional modularizado */}
      <VideoFondoDocente />

      {/* 🧭 Navbar */}
      <div className="relative z-30">
        <NavbarDocente />
      </div>

      {/* 🧠 Contenido */}
      <main className="relative z-20 px-6 py-24 max-w-6xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold text-center">Panel del Docente</h1>

        <PerfilDocente />
        <CursosAsignados />
        <NotificacionesDocente />
      </main>

      {/* 📦 Footer */}
      <div className="relative z-20 mt-10">
        <Footer />
      </div>
    </div>
  );
};

export default DocenteDashboard;
