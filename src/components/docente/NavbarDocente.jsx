import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const NavbarDocente = () => {
  const [docenteName, setDocenteName] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showLinks, setShowLinks] = useState(false);

  useEffect(() => {
    const fetchDocente = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/ping`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDocenteName(res.data.email);
      } catch (error) {
        console.error("❌ Error al obtener el nombre del docente:", error);
      }
    };

    fetchDocente();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    alert("👋 Sesión cerrada. ¡Gracias por tu dedicación!");
    window.location.href = "/auth";
  };

  return (
    <header
      role="banner"
      className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f0f] text-white shadow-md"
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* 👤 Usuario y menú */}
        <div className="flex items-center gap-4">
          <button
            aria-label="Abrir navegación"
            onClick={() => setShowLinks(!showLinks)}
            className="md:hidden text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm font-semibold border border-blue-400 px-3 py-1 rounded"
          >
            Menú
          </button>

          {/* Encapsulado para posicionar el menú correctamente */}
          <div className="relative pl-2">
            <button
              aria-label="Menú de usuario"
              aria-expanded={showMenu}
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center gap-2 hover:text-blue-300 transition-colors duration-200"
            >
              <span className="text-base font-semibold">{docenteName}</span>
              <span className="bg-white text-black rounded-full w-7 h-7 flex items-center justify-center font-bold border-2 border-blue-400">
                D
              </span>
            </button>

            {showMenu && (
              <div className="absolute left-0 top-14 bg-[#0f0f0f] text-blue-300 rounded shadow-lg w-48 border border-blue-400 z-50">
                <button className="w-full text-left px-4 py-2 hover:text-white hover:bg-[#1f1f1f] transition-colors duration-200">
                  Editar perfil
                </button>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 hover:text-white hover:bg-[#1f1f1f] transition-colors duration-200"
                >
                  Cerrar sesión
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="w-full text-left px-4 py-2 hover:text-white hover:bg-[#1f1f1f] transition-colors duration-200"
                >
                  Recargar
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 🔗 Navegación principal */}
        <nav
          role="navigation"
          aria-label="Menú docente"
          className={`${
            showLinks ? "flex" : "hidden"
          } md:flex flex-wrap items-center gap-4 text-base font-semibold`}
        >
          <Link
            to="/dashboard/docente"
            className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
          >
            Inicio
          </Link>
          <Link
            to="/docente/notas"
            className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
          >
            Notas
          </Link>
          <Link
            to="/docente/actividades"
            className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
          >
            Actividades
          </Link>
          <a
            href="#cursos"
            className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
          >
            Mis cursos
          </a>
          <a
            href="#notificaciones"
            className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
          >
            Notificaciones
          </a>
          <a
            href="#perfil"
            className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
          >
            Perfil
          </a>
        </nav>
      </div>
    </header>
  );
};

export default NavbarDocente;
