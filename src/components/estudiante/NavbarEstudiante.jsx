import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import NotificacionesIcon from "@/components/estudiante/NotificacionesIcon.jsx";
import { motion, AnimatePresence } from "framer-motion";

const NavbarEstudiante = () => {
  const [nombre, setNombre] = useState("");
  const [usuarioId, setUsuarioId] = useState("");
  const [token, setToken] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);

  const location = useLocation();
  const API_URL = import.meta.env.VITE_API_URL?.trim();

  useEffect(() => {
    const fetchEstudiante = async () => {
      try {
        const storedToken =
          localStorage.getItem("token") || sessionStorage.getItem("token");

        if (!storedToken || !API_URL) return;

        setToken(storedToken);

        const res = await axios.get(`${API_URL}/api/auth/ping`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });

        setNombre(res.data.nombre || res.data.email);
        setUsuarioId(res.data.uid || res.data._id);
      } catch (error) {
        console.error("❌ Error al obtener datos del estudiante:", error);
      }
    };

    fetchEstudiante();
  }, [API_URL]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    window.location.href = "/auth";
  };

  const enlaces = [
    { path: "/estudiante/dashboard", label: "Dashboard" },
    { path: "/estudiante/actividades", label: "Actividades" },
    { path: "/estudiante/entregas", label: "Entregas" },
    { path: "/estudiante/mensajes", label: "Notificaciones" },
  ];

  const navLinkClass = (path) =>
    `relative px-4 py-2 rounded transition duration-200 ease-in-out ${
      location.pathname === path
        ? "text-white font-semibold"
        : "text-white hover:text-white/80"
    }`;

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-black text-white shadow-md border-b border-white"
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* 🖥️ Navegación escritorio alineada a la izquierda */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium ml-4">
          {enlaces.map(({ path, label }) => (
            <div key={path} className="relative group">
              <Link to={path} className={navLinkClass(path)}>
                {label}
              </Link>
              {location.pathname === path && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-white"
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              )}
            </div>
          ))}
        </div>

        {/* 📱 Botón menú móvil */}
        <button
          onClick={() => setShowMobileNav(!showMobileNav)}
          className="md:hidden text-white hover:text-white transition"
          aria-label="Abrir menú de navegación"
        >
          ☰
        </button>

        {/* 🔔 Notificaciones + 👤 Menú usuario */}
        <div className="flex items-center gap-4">
          {token && usuarioId && (
            <NotificacionesIcon token={token} usuarioId={usuarioId} />
          )}

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center gap-2 hover:text-white transition"
              aria-label="Abrir menú de usuario"
              aria-expanded={showMenu}
            >
              <span className="text-sm font-semibold">{nombre}</span>
              <span className="bg-white text-black rounded-full w-6 h-6 flex items-center justify-center font-bold border-2 border-white">
                E
              </span>
            </button>

            <AnimatePresence>
              {showMenu && (
                <motion.div
                  role="menu"
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 bg-black text-white rounded shadow-lg w-48 border border-white overflow-hidden z-50"
                >
                  <Link
                    to="/estudiante/mensajes"
                    className="block px-4 py-2 hover:bg-white/10"
                  >
                    Ver notificaciones
                  </Link>
                  <button className="w-full text-left px-4 py-2 hover:bg-white/10">
                    Editar perfil
                  </button>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 hover:bg-white/10"
                  >
                    Cerrar sesión
                  </button>
                  <button
                    onClick={() => window.location.reload()}
                    className="w-full text-left px-4 py-2 hover:bg-white/10"
                  >
                    Recargar
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 📱 Menú móvil desplegable centrado */}
      <AnimatePresence>
        {showMobileNav && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black border-t border-white px-4 py-4 text-sm font-medium flex flex-col items-center space-y-2"
          >
            {enlaces.map(({ path, label }) => (
              <Link key={path} to={path} className={navLinkClass(path)}>
                {label}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default NavbarEstudiante;
