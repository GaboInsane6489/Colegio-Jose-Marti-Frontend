import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import logo from "../assets/images/LogoColegio.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Nosotros", path: "/about" },
    { name: "Contáctanos", path: "/contact" },
  ];

  const handleUserIconClick = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/ping", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      console.log("✅ Backend responde:", data);

      if (data.role) {
        localStorage.setItem("userRole", data.role);
        document.cookie = `userRole=${data.role}; path=/;`;
      }

      window.location.href = "http://localhost:5173/login";
    } catch (error) {
      console.error("❌ Error al contactar backend:", error);
      window.location.href = "http://localhost:5173/login";
    }
  };

  return (
    <nav className="fixed top-0 w-full h-16 bg-[#1a1a1a] text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo + Nombre institucional */}
        <Link
          to="/"
          className="flex items-center space-x-2 transition-all hover:text-[#D1D5DB] hover:drop-shadow-[0_0_6px_#D1D5DB]"
        >
          <img
            src={logo}
            alt="Logo Colegio José Martí"
            className="h-8 w-auto object-contain transition-all hover:drop-shadow-[0_0_6px_#D1D5DB]"
          />
          <span className="font-bold text-xl tracking-wide">
            Colegio José Martí
          </span>
        </Link>

        {/* Navegación en desktop */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="font-medium transition-all hover:text-[#D1D5DB] hover:drop-shadow-[0_0_6px_#D1D5DB]"
            >
              {link.name}
            </Link>
          ))}

          {/* Ícono de usuario */}
          <button
            onClick={handleUserIconClick}
            className="transition-all hover:text-[#D1D5DB] hover:drop-shadow-[0_0_6px_#D1D5DB]"
          >
            <FaUserCircle className="text-2xl" />
          </button>
        </div>

        {/* Botón hamburguesa en móvil */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none text-white"
          aria-label="Abrir menú"
        >
          ☰
        </button>
      </div>

      {/* Menú móvil */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col space-y-2 bg-[#1a1a1a] text-white shadow-inner">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="font-medium transition-all hover:text-[#D1D5DB] hover:drop-shadow-[0_0_6px_#D1D5DB]"
            >
              {link.name}
            </Link>
          ))}

          <button
            onClick={() => {
              setIsOpen(false);
              handleUserIconClick();
            }}
            className="flex items-center space-x-2 transition-all hover:text-[#D1D5DB] hover:drop-shadow-[0_0_6px_#D1D5DB]"
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
