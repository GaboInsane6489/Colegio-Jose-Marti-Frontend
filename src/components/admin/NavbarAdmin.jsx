import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const NavbarAdmin = () => {
  const [adminName, setAdminName] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showLinks, setShowLinks] = useState(false);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/ping`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAdminName(res.data.email);
      } catch (error) {
        console.error("❌ Error al obtener el nombre del admin:", error);
      }
    };

    fetchAdmin();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    alert("👋 Gracias por tu gestión, Gabriel.");
    window.location.href = "/auth";
  };

  return (
    <header
      role="banner"
      className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a] text-white shadow-md"
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* 👤 Usuario y botón de navegación */}
        <div className="flex items-center gap-4">
          <button
            aria-label="Abrir navegación"
            onClick={() => setShowLinks(!showLinks)}
            className="md:hidden text-lime-400 hover:text-[#ccff00] transition-colors duration-200 text-sm font-semibold border border-lime-400 px-3 py-1 rounded"
          >
            Menú
          </button>

          <button
            aria-label="Menú de usuario"
            aria-expanded={showMenu}
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2 hover:text-[#ccff00] transition-colors duration-200"
          >
            <span className="text-base font-semibold">{adminName}</span>
            <span className="bg-white text-black rounded-full w-7 h-7 flex items-center justify-center font-bold border-2 border-lime-400">
              A
            </span>
          </button>

          {showMenu && (
            <div className="absolute right-4 top-16 bg-[#1a1a1a] text-lime-300 rounded shadow-lg w-48 border border-lime-400">
              <button className="w-full text-left px-4 py-2 hover:text-[#ccff00] hover:bg-[#2a2a2a] transition-colors duration-200">
                Editar perfil
              </button>
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 hover:text-[#ccff00] hover:bg-[#2a2a2a] transition-colors duration-200"
              >
                Cerrar sesión
              </button>
              <button
                onClick={() => window.location.reload()}
                className="w-full text-left px-4 py-2 hover:text-[#ccff00] hover:bg-[#2a2a2a] transition-colors duration-200"
              >
                Recargar
              </button>
            </div>
          )}
        </div>

        {/* 🔗 Navegación principal */}
        <nav
          role="navigation"
          aria-label="Menú principal"
          className={`${
            showLinks ? "flex" : "hidden"
          } md:flex flex-wrap items-center gap-4 text-base font-semibold`}
        >
          <Link
            to="/"
            className="text-lime-400 hover:text-[#ccff00] transition-colors duration-200"
          >
            Inicio
          </Link>
          <a
            href="#validacion"
            className="text-lime-400 hover:text-[#ccff00] transition-colors duration-200"
          >
            Validación
          </a>
          <a
            href="#estadisticas"
            className="text-lime-400 hover:text-[#ccff00] transition-colors duration-200"
          >
            Estadísticas
          </a>
          <a
            href="#configuracion"
            className="text-lime-400 hover:text-[#ccff00] transition-colors duration-200"
          >
            Configuración
          </a>
        </nav>
      </div>
    </header>
  );
};

export default NavbarAdmin;
