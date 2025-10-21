import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import logo from "../assets/images/LogoColegio.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userRole, setUserRole] = useState("");

  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Nosotros", path: "/about" },
    { name: "Contáctanos", path: "/contact" },
  ];

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const token =
          localStorage.getItem("token") || sessionStorage.getItem("token");

        if (!token) {
          console.warn("🔒 No hay token disponible");
          return;
        }

        const response = await fetch("http://localhost:3000/api/auth/ping", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401 || response.status === 403) {
          console.warn("🔒 Token inválido o expirado");
          return;
        }

        const data = await response.json();
        if (data.role) {
          setUserRole(data.role);
          localStorage.setItem("userRole", data.role);
          document.cookie = `userRole=${data.role}; path=/;`;
        }
      } catch (error) {
        console.error("❌ Error al obtener rol:", error);
      }
    };

    fetchRole();
  }, []);

  const handleUserIconClick = () => {
    window.location.href = "http://localhost:5173/auth";
  };

  return (
    <nav
      role="navigation"
      aria-label="Barra de navegación principal"
      className="fixed top-0 w-full h-16 bg-[#1a1a1a] text-white shadow-md z-50 transition-all duration-500"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo institucional */}
        <Link
          to="/"
          aria-label="Ir al inicio"
          className="transition-transform duration-300 hover:scale-105 hover:text-[#D1D5DB] hover:drop-shadow-[0_0_6px_#D1D5DB] focus:outline-none"
        >
          <img
            src={logo}
            alt="Logo Colegio José Martí"
            className="h-10 w-auto object-contain transition-all duration-300"
          />
        </Link>

        {/* Navegación en desktop */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="font-medium transition-all hover:text-[#D1D5DB] hover:drop-shadow-[0_0_6px_#D1D5DB] focus:outline-none"
              tabIndex={0}
            >
              {link.name}
            </Link>
          ))}

          {/* Ícono de usuario + rol */}
          <button
            onClick={handleUserIconClick}
            aria-label="Acceder al sistema"
            className="relative transition-all hover:text-[#D1D5DB] hover:drop-shadow-[0_0_6px_#D1D5DB] focus:outline-none"
          >
            <FaUserCircle className="text-2xl" />
            {userRole && (
              <span className="absolute -top-2 -right-3 bg-[#ccff00] text-black text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
                {userRole}
              </span>
            )}
          </button>
        </div>

        {/* Botón hamburguesa en móvil */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none text-white text-xl"
          aria-label="Abrir menú"
        >
          ☰
        </button>
      </div>

      {/* Menú móvil */}
      {isOpen && (
        <div
          role="menu"
          className="md:hidden px-4 pb-4 flex flex-col space-y-2 bg-[#1a1a1a] text-white shadow-inner"
        >
          {navLinks.map((link, index) => (
            <React.Fragment key={link.name}>
              <Link
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="font-medium transition-all hover:text-[#D1D5DB] hover:drop-shadow-[0_0_6px_#D1D5DB] focus:outline-none"
                tabIndex={0}
              >
                {link.name}
              </Link>
              {index < navLinks.length - 1 && (
                <hr className="border-lime-400 opacity-30" />
              )}
            </React.Fragment>
          ))}

          <button
            onClick={() => {
              setIsOpen(false);
              handleUserIconClick();
            }}
            className="flex items-center space-x-2 transition-all hover:text-[#D1D5DB] hover:drop-shadow-[0_0_6px_#D1D5DB] focus:outline-none"
            aria-label="Acceder al sistema"
          >
            <FaUserCircle className="text-xl" />
            <span>Acceder</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
