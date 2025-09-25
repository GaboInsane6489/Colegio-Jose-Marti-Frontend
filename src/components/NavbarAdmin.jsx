import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const NavbarAdmin = () => {
  const [adminName, setAdminName] = useState("");
  const [showMenu, setShowMenu] = useState(false);

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
    window.location.href = "/login";
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a] text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* 🔗 Navegación principal */}
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-lime-400 font-semibold hover:text-lime-300"
          >
            Inicio
          </Link>
          <nav className="space-x-6 text-sm font-medium">
            <a href="#validacion" className="hover:text-lime-400 transition">
              Validación
            </a>
            <a href="#estadisticas" className="hover:text-lime-400 transition">
              Estadísticas
            </a>
            <a href="#configuracion" className="hover:text-lime-400 transition">
              Configuración
            </a>
          </nav>
        </div>

        {/* 👤 Menú de usuario */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center space-x-2 hover:text-lime-400"
          >
            <span>{adminName}</span>
            <span className="bg-white text-black rounded-full w-6 h-6 flex items-center justify-center font-bold">
              A
            </span>
          </button>
          {showMenu && (
            <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-md w-40">
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                Editar perfil
              </button>
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavbarAdmin;
