import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaBook,
  FaLaptop,
  FaGavel,
  FaShieldAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-[#1a1a1a] text-white pt-10 pb-6 px-6 md:px-12 border-t border-gray-700">
      <nav className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 text-sm text-center">
        {/* Institucional */}
        <section className="flex flex-col items-center">
          <h3 className="font-semibold mb-4 text-lg">Colegio José Martí</h3>
          <p className="text-gray-400 leading-relaxed max-w-xs">
            Educación integral con excelencia académica. Formamos y acompañamos
            el desarrollo de nuestros estudiantes con valores y compromiso.
          </p>
          <address className="mt-4 space-y-2 text-gray-300 not-italic">
            <div className="flex items-center justify-center gap-2">
              <FaMapMarkerAlt />
              <span>Caracas, Venezuela</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <FaPhoneAlt />
              <span>+58 212-555-1234</span>
            </div>
          </address>
        </section>

        {/* Explora */}
        <section className="flex flex-col items-center">
          <h3 className="font-semibold mb-4 text-lg">Explora</h3>
          <ul className="space-y-3">
            <li>
              <Link
                to="/nosotros"
                className="hover:text-[#FFD700] hover:drop-shadow-[0_0_6px_#FFD700] transition-all"
              >
                Nosotros
              </Link>
            </li>
            <li>
              <Link
                to="/modelo"
                className="hover:text-[#FFD700] hover:drop-shadow-[0_0_6px_#FFD700] transition-all"
              >
                Modelo Pedagógico
              </Link>
            </li>
            <li>
              <Link
                to="/perfil-egresado"
                className="hover:text-[#FFD700] hover:drop-shadow-[0_0_6px_#FFD700] transition-all"
              >
                Perfil del Egresado
              </Link>
            </li>
            <li>
              <Link
                to="/biblioteca"
                className="hover:text-[#00FFCC] hover:drop-shadow-[0_0_6px_#00FFCC] transition-all"
              >
                Biblioteca
              </Link>
            </li>
          </ul>
        </section>

        {/* Comunidad */}
        <section className="flex flex-col items-center">
          <h3 className="font-semibold mb-4 text-lg">Comunidad</h3>
          <ul className="space-y-3">
            <li>
              <Link
                to="/eventos"
                className="hover:text-[#8B5CF6] hover:drop-shadow-[0_0_6px_#8B5CF6] transition-all"
              >
                Eventos
              </Link>
            </li>
            <li>
              <Link
                to="/admisiones"
                className="hover:text-[#8B5CF6] hover:drop-shadow-[0_0_6px_#8B5CF6] transition-all"
              >
                Admisiones
              </Link>
            </li>
            <li>
              <Link
                to="/noticias"
                className="hover:text-[#8B5CF6] hover:drop-shadow-[0_0_6px_#8B5CF6] transition-all"
              >
                Noticias
              </Link>
            </li>
            <li>
              <Link
                to="/plataforma"
                className="hover:text-[#00FFCC] hover:drop-shadow-[0_0_6px_#00FFCC] transition-all"
              >
                Plataforma Virtual
              </Link>
            </li>
          </ul>
        </section>

        {/* Servicios */}
        <section className="flex flex-col items-center">
          <h3 className="font-semibold mb-4 text-lg">Servicios</h3>
          <ul className="space-y-3">
            <li>
              <Link
                to="/reglamento"
                className="hover:text-[#00FF00] hover:drop-shadow-[0_0_6px_#00FF00] transition-all"
              >
                Reglamento
              </Link>
            </li>
            <li>
              <Link
                to="/uniformes"
                className="hover:text-[#00FF00] hover:drop-shadow-[0_0_6px_#00FF00] transition-all"
              >
                Uniformes
              </Link>
            </li>
            <li>
              <Link
                to="/cafeteria"
                className="hover:text-[#00FF00] hover:drop-shadow-[0_0_6px_#00FF00] transition-all"
              >
                Cafetería
              </Link>
            </li>
          </ul>
        </section>

        {/* Conecta */}
        <section className="flex flex-col items-center">
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
        </section>
      </nav>

      {/* Línea inferior */}
      <div className="mt-10 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Colegio José Martí. Todos los derechos
        reservados.
        <span className="mx-2">|</span>
        <Link
          to="/privacidad"
          className="hover:text-[#FFD700] hover:drop-shadow-[0_0_6px_#FFD700] transition-all"
        >
          Privacidad
        </Link>
        <span className="mx-2">|</span>
        <Link
          to="/terminos"
          className="hover:text-[#FFD700] hover:drop-shadow-[0_0_6px_#FFD700] transition-all"
        >
          Términos
        </Link>
        <span className="mx-2">|</span>
        <Link
          to="/mapa"
          className="hover:text-[#FFD700] hover:drop-shadow-[0_0_6px_#FFD700] transition-all"
        >
          Mapa del sitio
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
