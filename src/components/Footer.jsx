import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-[#1a1a1a] text-white pt-10 pb-6 px-6 md:px-12 border-t border-gray-700">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-center">
        {/* Más información */}
        <div>
          <h3 className="font-semibold mb-4 text-lg">Más información</h3>
          <ul className="space-y-3">
            <li>
              <Link
                to="/terminos"
                className="transition-all hover:text-[#FFD700] hover:drop-shadow-[0_0_6px_#FFD700]"
              >
                Términos de uso
              </Link>
            </li>
            <li>
              <Link
                to="/privacidad"
                className="transition-all hover:text-[#FFD700] hover:drop-shadow-[0_0_6px_#FFD700]"
              >
                Política de privacidad
              </Link>
            </li>
            <li>
              <Link
                to="/suscripcion"
                className="transition-all hover:text-[#FFD700] hover:drop-shadow-[0_0_6px_#FFD700]"
              >
                Acuerdo de suscripción
              </Link>
            </li>
          </ul>
        </div>

        {/* Ayuda */}
        <div>
          <h3 className="font-semibold mb-4 text-lg">Ayuda</h3>
          <ul className="space-y-3">
            <li>
              <Link
                to="/ayuda"
                className="transition-all hover:text-[#A855F7] hover:drop-shadow-[0_0_6px_#A855F7]"
              >
                Centro de ayuda
              </Link>
            </li>
            <li>
              <Link
                to="/dispositivos"
                className="transition-all hover:text-[#A855F7] hover:drop-shadow-[0_0_6px_#A855F7]"
              >
                Dispositivos compatibles
              </Link>
            </li>
            <li>
              <Link
                to="/acerca"
                className="transition-all hover:text-[#A855F7] hover:drop-shadow-[0_0_6px_#A855F7]"
              >
                Acerca del Colegio
              </Link>
            </li>
          </ul>
        </div>

        {/* Comunidad */}
        <div>
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

        {/* Redes sociales */}
        <div>
          <h3 className="font-semibold mb-4 text-lg">Síguenos</h3>
          <div className="flex justify-center space-x-4 text-xl">
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
