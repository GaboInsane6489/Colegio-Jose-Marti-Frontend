import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Nosotros", path: "/about" },
    { name: "Contáctanos", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 w-full h-16 bg-[#1a1a1a] text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo institucional con efecto luminoso */}
        <Link
          to="/"
          className="font-bold text-xl tracking-wide transition-all hover:text-[#FFD700] hover:drop-shadow-[0_0_6px_#FFD700]"
        >
          Colegio José Martí
        </Link>

        {/* Navegación en desktop */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="font-medium transition-all hover:text-[#FFD700] hover:drop-shadow-[0_0_6px_#FFD700]"
            >
              {link.name}
            </Link>
          ))}

          {/* Ícono de usuario con efecto fosforescente */}
          <Link
            to="/login"
            className="transition-all hover:text-[#FFD700] hover:drop-shadow-[0_0_6px_#FFD700]"
          >
            <FaUserCircle className="text-2xl" />
          </Link>
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
              className="font-medium transition-all hover:text-[#FFD700] hover:drop-shadow-[0_0_6px_#FFD700]"
            >
              {link.name}
            </Link>
          ))}

          {/* Ícono de usuario en móvil con efecto */}
          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="flex items-center space-x-2 transition-all hover:text-[#FFD700] hover:drop-shadow-[0_0_6px_#FFD700]"
          >
            <FaUserCircle className="text-xl" />
            <span>Acceder</span>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
