import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const NavbarDocente = () => {
  const [docenteName, setDocenteName] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);

  const location = useLocation();
  const API_URL = import.meta.env.VITE_API_URL?.trim();

  useEffect(() => {
    const fetchDocente = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token || !API_URL) return;

        const res = await axios.get(`${API_URL}/api/auth/ping`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDocenteName(res.data.email);
      } catch (error) {
        console.error("❌ Error al obtener el nombre del docente:", error);
      }
    };

    fetchDocente();
  }, [API_URL]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    alert("👋 Sesión cerrada. ¡Gracias por tu dedicación!");
    window.location.href = "/auth";
  };

  const enlaces = [
    { path: "/docente/dashboard", label: "Inicio" },
    { path: "/docente/notas", label: "Notas" },
    { path: "/docente/actividades", label: "Actividades" },
    { path: "#cursos", label: "Mis cursos", external: true },
    { path: "#notificaciones", label: "Notificaciones", external: true },
    { path: "/docente/dashboard", label: "Perfil" },
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
        <div className="hidden md:flex items-center gap-6 text-sm font-medium ml-4">
          {enlaces.map(({ path, label, external }) =>
            external ? (
              <a key={path} href={path} className={navLinkClass(path)}>
                {label}
              </a>
            ) : (
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
            )
          )}
        </div>

        <button
          onClick={() => setShowMobileNav(!showMobileNav)}
          className="md:hidden text-white hover:text-white transition"
          aria-label="Abrir menú de navegación"
        >
          ☰
        </button>

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2 hover:text-white transition"
            aria-label="Abrir menú de usuario"
            aria-expanded={showMenu}
          >
            <span className="text-sm font-medium">{docenteName}</span>
            <span className="bg-white text-black rounded-full w-7 h-7 flex items-center justify-center font-bold border-2 border-white">
              D
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

      <AnimatePresence>
        {showMobileNav && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black border-t border-white px-4 py-4 text-sm font-medium flex flex-col items-center space-y-2"
          >
            {enlaces.map(({ path, label, external }) =>
              external ? (
                <a key={path} href={path} className={navLinkClass(path)}>
                  {label}
                </a>
              ) : (
                <Link key={path} to={path} className={navLinkClass(path)}>
                  {label}
                </Link>
              )
            )}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default NavbarDocente;
