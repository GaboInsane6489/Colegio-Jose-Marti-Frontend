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
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        {/* Más información */}
        <div>
          <h3 className="font-semibold mb-3">Más información</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/terminos" className="hover:underline">
                Términos de uso
              </Link>
            </li>
            <li>
              <Link to="/privacidad" className="hover:underline">
                Política de privacidad
              </Link>
            </li>
            <li>
              <Link to="/suscripcion" className="hover:underline">
                Acuerdo de suscripción
              </Link>
            </li>
          </ul>
        </div>

        {/* Ayuda */}
        <div>
          <h3 className="font-semibold mb-3">Ayuda</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/ayuda" className="hover:underline">
                Centro de ayuda
              </Link>
            </li>
            <li>
              <Link to="/dispositivos" className="hover:underline">
                Dispositivos compatibles
              </Link>
            </li>
            <li>
              <Link to="/acerca" className="hover:underline">
                Acerca del Colegio
              </Link>
            </li>
          </ul>
        </div>

        {/* Comunidad */}
        <div>
          <h3 className="font-semibold mb-3">Comunidad</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/eventos" className="hover:underline">
                Eventos
              </Link>
            </li>
            <li>
              <Link to="/admisiones" className="hover:underline">
                Admisiones
              </Link>
            </li>
            <li>
              <Link to="/noticias" className="hover:underline">
                Noticias
              </Link>
            </li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div>
          <h3 className="font-semibold mb-3">Síguenos</h3>
          <div className="flex space-x-4 text-xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1877F2] hover:drop-shadow-[0_0_6px_#1877F2] transition-all"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E1306C] hover:drop-shadow-[0_0_6px_#E1306C] transition-all"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1DA1F2] hover:drop-shadow-[0_0_6px_#1DA1F2] transition-all"
            >
              <FaTwitter />
            </a>
            <a
              href="mailto:contacto@colegiojosemarti.edu"
              className="text-[#FFD700] hover:drop-shadow-[0_0_6px_#FFD700] transition-all"
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
