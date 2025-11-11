import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUserGraduate,
  FaBook,
  FaGlobeAmericas,
  FaShieldAlt,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className='w-full bg-black text-white pt-10 pb-8 px-6 md:px-12 border-t border-white/10'
    >
      <nav className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 text-sm text-center'>
        {/* Institucional */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className='flex flex-col items-center group'
        >
          <FaUserGraduate className='text-3xl mb-2 text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7] group-hover:translate-y-[2px] transition-transform duration-300' />
          <h3 className='font-semibold mb-2 text-lg group-hover:text-[#00FFF7] transition-colors duration-300'>
            Colegio José Martí
          </h3>
          <p className='text-gray-400 leading-relaxed max-w-xs text-[15px] mb-2'>
            Educación integral con excelencia académica y acompañamiento emocional.
          </p>
          <p className='text-white/80 italic text-xs'>
            Formamos seres humanos felices, con propósito y valores.
          </p>
          <address className='mt-4 space-y-2 text-gray-300 not-italic text-sm'>
            <div className='flex items-center justify-center gap-2'>
              <FaMapMarkerAlt />
              <span>Caracas, Venezuela</span>
            </div>
            <div className='flex items-center justify-center gap-2'>
              <FaPhoneAlt />
              <span>+58 212-8251155</span>
            </div>
          </address>
        </motion.section>

        {/* Explora */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
          className='flex flex-col items-center group'
        >
          <FaBook className='text-2xl mb-2 text-[#00FFFF] drop-shadow-[0_0_6px_#00FFFF] group-hover:translate-y-[2px] transition-transform duration-300' />
          <h3 className='font-semibold mb-4 text-lg group-hover:text-[#00FFFF] transition-colors duration-300'>
            Explora
          </h3>
          <ul className='space-y-3'>
            {['Nosotros', 'Modelo Pedagógico', 'Perfil del Egresado', 'Biblioteca'].map(
              (label, i) => (
                <li key={i}>
                  <Link
                    to={`/${label.toLowerCase().replace(/ /g, '-')}`}
                    className='hover:text-[#00FFFF] hover:drop-shadow-[0_0_12px_#00FFFF] hover:translate-y-[2px] transition-all duration-300 inline-block'
                  >
                    {label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </motion.section>

        {/* Comunidad */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
          className='flex flex-col items-center group'
        >
          <FaGlobeAmericas className='text-2xl mb-2 text-[#C580FF] drop-shadow-[0_0_6px_#C580FF] group-hover:translate-y-[2px] transition-transform duration-300' />
          <h3 className='font-semibold mb-4 text-lg group-hover:text-[#C580FF] transition-colors duration-300'>
            Comunidad
          </h3>
          <ul className='space-y-3'>
            {['Admisiones', 'Noticias', 'Plataforma Virtual'].map((label, i) => (
              <li key={i}>
                <Link
                  to={`/${label.toLowerCase().replace(/ /g, '-')}`}
                  className='hover:text-[#C580FF] hover:drop-shadow-[0_0_12px_#C580FF] hover:translate-y-[2px] transition-all duration-300 inline-block'
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Servicios */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
          className='flex flex-col items-center group'
        >
          <FaShieldAlt className='text-2xl mb-2 text-[#00FF33] drop-shadow-[0_0_6px_#00FF33] group-hover:translate-y-[2px] transition-transform duration-300' />
          <h3 className='font-semibold mb-4 text-lg group-hover:text-[#00FF33] transition-colors duration-300'>
            Servicios
          </h3>
          <ul className='space-y-3'>
            {['Reglamento', 'Uniformes', 'Cafetería'].map((label, i) => (
              <li key={i}>
                <Link
                  to={`/${label.toLowerCase()}`}
                  className='hover:text-[#00FF33] hover:drop-shadow-[0_0_12px_#00FF33] hover:translate-y-[2px] transition-all duration-300 inline-block'
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Conecta */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
          className='flex flex-col items-center group'
        >
          <FaEnvelope className='text-2xl mb-2 text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7] group-hover:translate-y-[2px] transition-transform duration-300' />
          <h3 className='font-semibold mb-4 text-lg group-hover:text-[#00FFF7] transition-colors duration-300'>
            Conecta con nosotros
          </h3>
          <div className='flex justify-center space-x-4 text-xl mb-4'>
            <a
              href='https://facebook.com'
              target='_blank'
              rel='noopener noreferrer'
              className='text-[#33CCFF] hover:drop-shadow-[0_0_12px_#33CCFF] hover:translate-y-[2px] transition-all duration-300'
            >
              <FaFacebookF />
            </a>
            <a
              href='https://instagram.com'
              target='_blank'
              rel='noopener noreferrer'
              className='text-[#FF85C1] hover:drop-shadow-[0_0_12px_#FF85C1] hover:translate-y-[2px] transition-all duration-300'
            >
              <FaInstagram />
            </a>
            <a
              href='https://twitter.com'
              target='_blank'
              rel='noopener noreferrer'
              className='text-[#33FFFF] hover:drop-shadow-[0_0_12px_#33FFFF] hover:translate-y-[2px] transition-all duration-300'
            >
              <FaTwitter />
            </a>
            <a
              href='mailto:contacto@colegiojosemarti.edu'
              className='text-[#00FFF7] hover:drop-shadow-[0_0_12px_#00FFF7] hover:translate-y-[2px] transition-all duration-300'
            >
              <FaEnvelope />
            </a>
          </div>
          <p className='text-gray-400 text-sm'>contacto@colegiojosemarti.edu</p>
        </motion.section>
      </nav>

      {/* Línea inferior */}
      <div className='mt-10 text-center text-xs text-gray-400'>
        © {new Date().getFullYear()} Colegio José Martí. Todos los derechos reservados.
        <span className='mx-2'>|</span>
        <Link
          to='/privacidad'
          className='hover:text-[#00FFF7] hover:drop-shadow-[0_0_12px_#00FFF7] hover:translate-y-[1px] transition-all duration-300'
        >
          Privacidad
        </Link>
        <span className='mx-2'>|</span>
        <Link
          to='/terminos'
          className='hover:text-[#00FFF7] hover:drop-shadow-[0_0_12px_#00FFF7] hover:translate-y-[1px] transition-all duration-300'
        >
          Términos
        </Link>
        <span className='mx-2'>|</span>
        <Link
          to='/mapa'
          className='hover:text-[#00FFF7] hover:drop-shadow-[0_0_12px_#00FFF7] hover:translate-y-[1px] transition-all duration-300'
        >
          Mapa del sitio
        </Link>
      </div>
    </motion.footer>
  );
};

export default Footer;
