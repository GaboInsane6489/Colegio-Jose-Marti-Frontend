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
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ type: 'spring', bounce: 0.3, duration: 0.8 }}
      className='w-full bg-black text-white pt-12 pb-10 px-6 md:px-12 drop-shadow-[0_0_8px_#00FFF7]'
    >
      <nav className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 text-sm text-center'>
        {/* Institucional */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className='flex flex-col items-center group'
        >
          <FaUserGraduate className='text-3xl mb-2 text-white drop-shadow-[0_0_6px_#00FFF7] group-hover:-translate-y-[3px] group-hover:scale-110 transition-transform duration-200 ease-in-out' />
          <h3 className='font-semibold mb-2 text-lg group-hover:text-[#00FFF7] transition-colors duration-200 ease-in-out'>
            Colegio José Martí
          </h3>
          <p className='text-white/70 leading-relaxed max-w-xs text-[15px] mb-2'>
            Educación integral con excelencia académica y acompañamiento emocional.
          </p>
          <p className='text-white/50 italic text-xs'>
            Formamos seres humanos felices, con propósito y valores.
          </p>
          <address className='mt-4 space-y-2 text-white/70 not-italic text-sm'>
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
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
          className='flex flex-col items-center group'
        >
          <FaBook className='text-2xl mb-2 text-white drop-shadow-[0_0_6px_#00FFF7] group-hover:-translate-y-[3px] group-hover:scale-110 transition-transform duration-200 ease-in-out' />
          <h3 className='font-semibold mb-4 text-lg group-hover:text-[#00FFF7] transition-colors duration-200 ease-in-out'>
            Explora
          </h3>
          <ul className='space-y-3'>
            {['Nosotros', 'Modelo Pedagógico', 'Perfil del Egresado', 'Biblioteca'].map(
              (label, i) => (
                <li key={i}>
                  <Link
                    to={`/${label.toLowerCase().replace(/ /g, '-')}`}
                    className="relative inline-block text-white/80 hover:text-white transition-all duration-200 ease-in-out group after:content-[''] after:block after:w-0 after:h-[2px] after:bg-[#00FFF7] after:transition-all after:duration-200 after:ease-in-out after:mx-auto hover:after:w-full"
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
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
          className='flex flex-col items-center group'
        >
          <FaGlobeAmericas className='text-2xl mb-2 text-white drop-shadow-[0_0_6px_#00FFF7] group-hover:-translate-y-[3px] group-hover:scale-110 transition-transform duration-200 ease-in-out' />
          <h3 className='font-semibold mb-4 text-lg group-hover:text-[#00FFF7] transition-colors duration-200 ease-in-out'>
            Comunidad
          </h3>
          <ul className='space-y-3'>
            {['Admisiones', 'Noticias', 'Plataforma Virtual'].map((label, i) => (
              <li key={i}>
                <Link
                  to={`/${label.toLowerCase().replace(/ /g, '-')}`}
                  className="relative inline-block text-white/80 hover:text-white transition-all duration-200 ease-in-out group after:content-[''] after:block after:w-0 after:h-[2px] after:bg-[#00FFF7] after:transition-all after:duration-200 after:ease-in-out after:mx-auto hover:after:w-full"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Servicios */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
          className='flex flex-col items-center group'
        >
          <FaShieldAlt className='text-2xl mb-2 text-white drop-shadow-[0_0_6px_#00FFF7] group-hover:-translate-y-[3px] group-hover:scale-110 transition-transform duration-200 ease-in-out' />
          <h3 className='font-semibold mb-4 text-lg group-hover:text-[#00FFF7] transition-colors duration-200 ease-in-out'>
            Servicios
          </h3>
          <ul className='space-y-3'>
            {['Reglamento', 'Uniformes', 'Cafetería'].map((label, i) => (
              <li key={i}>
                <Link
                  to={`/${label.toLowerCase()}`}
                  className="relative inline-block text-white/80 hover:text-white transition-all duration-200 ease-in-out group after:content-[''] after:block after:w-0 after:h-[2px] after:bg-[#00FFF7] after:transition-all after:duration-200 after:ease-in-out after:mx-auto hover:after:w-full"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Conecta */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
          className='flex flex-col items-center group'
        >
          <FaEnvelope className='text-2xl mb-2 text-white drop-shadow-[0_0_6px_#00FFF7] group-hover:-translate-y-[3px] group-hover:scale-110 transition-transform duration-200 ease-in-out' />
          <h3 className='font-semibold mb-4 text-lg group-hover:text-[#00FFF7] transition-colors duration-200 ease-in-out'>
            Conecta con nosotros
          </h3>
          <div className='flex justify-center space-x-4 text-xl mb-4'>
            <a
              href='https://facebook.com'
              target='_blank'
              rel='noopener noreferrer'
              className='text-white hover:drop-shadow-[0_0_12px_#00FFF7] hover:-translate-y-[3px] hover:scale-110 transition-all duration-200 ease-in-out'
            >
              <FaFacebookF />
            </a>
            <a
              href='https://instagram.com'
              target='_blank'
              rel='noopener noreferrer'
              className='text-white hover:drop-shadow-[0_0_12px_#00FFF7] hover:-translate-y-[3px] hover:scale-110 transition-all duration-200 ease-in-out'
            >
              <FaInstagram />
            </a>
            <a
              href='https://twitter.com'
              target='_blank'
              rel='noopener noreferrer'
              className='text-white hover:drop-shadow-[0_0_12px_#00FFF7] hover:-translate-y-[3px] hover:scale-110 transition-all duration-200 ease-in-out'
            >
              <FaTwitter />
            </a>
            <a
              href='mailto:contacto@colegiojosemarti.edu'
              className='text-white hover:drop-shadow-[0_0_12px_#00FFF7] hover:-translate-y-[3px] hover:scale-110 transition-all duration-200 ease-in-out'
            >
              <FaEnvelope />
            </a>
          </div>
          <p className='text-white/70 text-sm'>contacto@colegiojosemarti.edu</p>
        </motion.section>
      </nav>

      {/* Línea inferior */}
      <div className='mt-10 text-center text-xs text-white/50'>
        © {new Date().getFullYear()} Colegio José Martí. Todos los derechos reservados.
        <span className='mx-2'>|</span>
        <Link
          to='/privacidad'
          className="relative inline-block hover:text-white transition-all duration-200 ease-in-out group after:content-[''] after:block after:w-0 after:h-[2px] after:bg-[#00FFF7] after:transition-all after:duration-200 after:ease-in-out after:mx-auto hover:after:w-full"
        >
          Privacidad
        </Link>
        <span className='mx-2'>|</span>
        <Link
          to='/terminos'
          className="relative inline-block hover:text-white transition-all duration-200 ease-in-out group after:content-[''] after:block after:w-0 after:h-[2px] after:bg-[#00FFF7] after:transition-all after:duration-200 after:ease-in-out after:mx-auto hover:after:w-full"
        >
          Términos
        </Link>
        <span className='mx-2'>|</span>
        <Link
          to='/mapa'
          className="relative inline-block hover:text-white transition-all duration-200 ease-in-out group after:content-[''] after:block after:w-0 after:h-[2px] after:bg-[#00FFF7] after:transition-all after:duration-200 after:ease-in-out after:mx-auto hover:after:w-full"
        >
          Mapa del sitio
        </Link>
      </div>
    </motion.footer>
  );
};

export default Footer;
