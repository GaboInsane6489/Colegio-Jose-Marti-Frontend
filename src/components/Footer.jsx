import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-[#1a1a1a] text-white pt-10 pb-6 px-6 md:px-12 border-t border-gray-700">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-center">
        {/* Institucional */}
        <div className="flex flex-col items-center">
          <h3 className="font-semibold mb-4 text-lg">Colegio José Martí</h3>
          <p className="text-gray-400 leading-relaxed max-w-xs">
            Educación integral con excelencia académica. Formamos y acompañamos
            el desarrollo de nuestros estudiantes con valores y compromiso.
          </p>
          <div className="mt-4 space-y-2 text-gray-300">
            <div className="flex items-center justify-center gap-2">
              <FaMapMarkerAlt />
              <span>Caracas, Venezuela</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <FaPhoneAlt />
              <span>+58 212-555-1234</span>
            </div>
          </div>
        </div>

        {/* Explora */}
        <div className="flex flex-col items-center">
          <h3 className="font-semibold mb-4 text-lg">Explora</h3>
          <ul className="space-y-3">
            <li>
              <Link
                to="/nosotros"
                className="transition-all hover:text-[#FFD700] hover:drop-shadow-[0_0_6px_#FFD700]"
              >
                Nosotros
              </Link>
            </li>
            <li>
              <Link
                to="/modelo"
                className="transition-all hover:text-[#FFD700] hover:drop-shadow-[0_0_6px_#FFD700]"
              >
                Modelo Pedagógico
              </Link>
            </li>
            <li>
              <Link
                to="/perfil-egresado"
                className="transition-all hover:text-[#FFD700] hover:drop-shadow-[0_0_6px_#FFD700]"
              >
                Perfil del Egresado
              </Link>
            </li>
          </ul>
        </div>

        {/* Comunidad */}
        <div className="flex flex-col items-center">
          <h3 className="font-semibold mb-4 text-lg">Comunidad</h3>
          <ul className="space-y-3">
            <li>
              <Link
                to="/eventos"
                className="transition-all hover:text-[#8B5CF6] hover:drop-shadow-[0_0_6px_#8B5CF6]"
              >
                Eventos
              </Link>
            </li>
            <li>
              <Link
                to="/admisiones"
                className="transition-all hover:text-[#8B5CF6] hover:drop-shadow-[0_0_6px_#8B5CF6]"
              >
                Admisiones
              </Link>
            </li>
            <li>
              <Link
                to="/noticias"
                className="transition-all hover:text-[#8B5CF6] hover:drop-shadow-[0_0_6px_#8B5CF6]"
              >
                Noticias
              </Link>
            </li>
          </ul>
        </div>

        {/* Conecta */}
        <div className="flex flex-col items-center">
          <h3 className="font-semibold mb-4 text-lg">Conecta con nosotros</h3>
          <div className="flex justify-center space-x-4 text-xl mb-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1877F2] hover:drop-shadow-[0_0_8px_#1877F2] transition-all hover:scale-110"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E1306C] hover:drop-shadow-[0_0_8px_#E1306C] transition-all hover:scale-110"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1DA1F2] hover:drop-shadow-[0_0_8px_#1DA1F2] transition-all hover:scale-110"
            >
              <FaTwitter />
            </a>
            <a
              href="mailto:contacto@colegiojosemarti.edu"
              className="text-[#FFD700] hover:drop-shadow-[0_0_8px_#FFD700] transition-all hover:scale-110"
            >
              <FaEnvelope />
            </a>
          </div>
          <p className="text-gray-400 text-sm">contacto@colegiojosemarti.edu</p>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="mt-10 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Colegio José Martí. Todos los derechos
        reservados.
      </div>
    </footer>
  );
};

export default Footer;
