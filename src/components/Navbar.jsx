import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import logo from "../assets/images/LogoColegio.png";
import { getCookie } from "../utils/cookieUtils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = import.meta.env.VITE_API_URL?.trim();

  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Nosotros", path: "/about" },
    { name: "Contáctanos", path: "/contact" },
  ];

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const storedRole =
      localStorage.getItem("userRole") || getCookie("userRole");

    if (storedRole) {
      setUserRole(storedRole);
      return;
    }

    if (!token || !API_URL) return;

    const fetchRole = async () => {
      try {
        const res = await fetch(`${API_URL}/api/auth/ping`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) return;
        const data = await res.json();
        if (data.role) {
          setUserRole(data.role);
          localStorage.setItem("userRole", data.role);
          document.cookie = `userRole=${data.role}; path=/;`;
        }
      } catch (err) {
        console.error("❌ Error al obtener rol:", err);
      }
    };

    fetchRole();
  }, [API_URL]);

  const handleUserIconClick = () => {
    const role = localStorage.getItem("userRole") || getCookie("userRole");

    if (role === "admin") navigate("/admin/dashboard");
    else if (role === "docente") navigate("/docente/dashboard");
    else if (role === "estudiante") navigate("/estudiante/dashboard");
    else navigate("/auth");
  };

  const navLinkClass = (path) =>
    `transition px-2 py-1 rounded ${
      location.pathname === path
        ? "text-white font-semibold border-b-2 border-white"
        : "text-white/80 hover:text-white"
    }`;

  return (
    <motion.nav
      role="navigation"
      aria-label="Barra de navegación principal"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", bounce: 0.3, duration: 0.8 }}
      className="fixed top-0 w-full bg-black text-white shadow-md z-50"
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" aria-label="Ir al inicio">
          <img src={logo} alt="Logo Colegio José Martí" className="h-10" />
        </Link>

        {/* 🖥️ Navegación escritorio */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={navLinkClass(link.path)}
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={handleUserIconClick}
            aria-label="Acceder al sistema"
            className="relative"
          >
            <FaUserCircle className="text-2xl" />
            {userRole && (
              <span className="absolute -top-2 -right-3 bg-white text-black text-xs font-bold px-2 py-0.5 rounded-full">
                {userRole}
              </span>
            )}
          </button>
        </div>

        {/* 📱 Botón menú móvil */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-xl"
          aria-label="Abrir menú"
        >
          ☰
        </button>
      </div>

      {/* 📱 Menú móvil */}
      {isOpen && (
        <div
          role="menu"
          className="md:hidden px-4 pb-4 flex flex-col space-y-2 bg-black text-white"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={navLinkClass(link.path)}
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={() => {
              setIsOpen(false);
              handleUserIconClick();
            }}
            className="flex items-center gap-2 text-white/80 hover:text-white"
          >
            <FaUserCircle className="text-xl" /> <span>Acceder</span>
          </button>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
