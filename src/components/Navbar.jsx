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

  return (
    <nav className="fixed top-0 w-full h-16 bg-[#1a1a1a] text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo + Nombre institucional con efecto rojo fosforescente */}
        <Link
          to="/"
          className="flex items-center space-x-2 transition-all hover:text-[#FF3B3B] hover:drop-shadow-[0_0_6px_#FF3B3B]"
        >
          <img
            src={logo}
            alt="Logo Colegio José Martí"
            className="h-8 w-auto object-contain transition-all hover:drop-shadow-[0_0_6px_#FF3B3B]"
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
              className="font-medium transition-all hover:text-[#A855F7] hover:drop-shadow-[0_0_6px_#A855F7]"
            >
              {link.name}
            </Link>
          ))}

          {/* Ícono de usuario con efecto azul eléctrico */}
          <Link
            to="/login"
            className="transition-all hover:text-[#1DA1F2] hover:drop-shadow-[0_0_6px_#1DA1F2]"
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
              className="font-medium transition-all hover:text-[#A855F7] hover:drop-shadow-[0_0_6px_#A855F7]"
            >
              {link.name}
            </Link>
          ))}

          {/* Ícono de usuario en móvil con efecto azul eléctrico */}
          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="flex items-center space-x-2 transition-all hover:text-[#1DA1F2] hover:drop-shadow-[0_0_6px_#1DA1F2]"
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
