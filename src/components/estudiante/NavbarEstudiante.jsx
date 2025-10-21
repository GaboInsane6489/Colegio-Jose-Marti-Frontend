import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const NavbarEstudiante = () => {
  const [nombre, setNombre] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const fetchEstudiante = async () => {
      try {
        const token =
          localStorage.getItem("token") || sessionStorage.getItem("token");

        if (!token) {
          console.warn("🔒 No hay token disponible");
          return;
        }

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/ping`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setNombre(res.data.nombre || res.data.email);
      } catch (error) {
        console.error("❌ Error al obtener datos del estudiante:", error);
      }
    };

    fetchEstudiante();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    window.location.href = "/auth";
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a] text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* 🔗 Navegación principal */}
        <nav
          role="navigation"
          aria-label="Menú principal del estudiante"
          className="flex items-center space-x-6 text-sm font-medium"
        >
          <Link
            to="/"
            className="text-lime-400 hover:text-lime-300 transition-all"
          >
            Inicio
          </Link>
          <a
            href="#clases"
            className="text-lime-400 hover:text-lime-300 transition-all"
          >
            Clases
          </a>
          <a
            href="#progreso"
            className="text-lime-400 hover:text-lime-300 transition-all"
          >
            Progreso
          </a>
          <a
            href="#mensajes"
            className="text-lime-400 hover:text-lime-300 transition-all"
          >
            Mensajes
          </a>
        </nav>

        {/* 👤 Menú de usuario */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            aria-label="Abrir menú de usuario"
            aria-expanded={showMenu}
            className="flex items-center space-x-2 hover:text-lime-300 transition-all"
          >
            <span className="text-sm font-semibold">{nombre}</span>
            <span className="bg-white text-black rounded-full w-6 h-6 flex items-center justify-center font-bold">
              E
            </span>
          </button>

          {showMenu && (
            <div
              role="menu"
              className="absolute right-0 mt-2 bg-[#1a1a1a] text-lime-300 rounded shadow-lg w-44 border border-lime-400"
            >
              <button className="w-full text-left px-4 py-2 hover:text-lime-200 hover:bg-[#2a2a2a] transition-all">
                Editar perfil
              </button>
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 hover:text-lime-200 hover:bg-[#2a2a2a] transition-all"
              >
                Cerrar sesión
              </button>
              <button
                onClick={() => window.location.reload()}
                className="w-full text-left px-4 py-2 hover:text-lime-200 hover:bg-[#2a2a2a] transition-all"
              >
                Recargar
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavbarEstudiante;
