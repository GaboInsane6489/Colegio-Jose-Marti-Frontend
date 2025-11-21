import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FaUserCircle,
  FaSyncAlt,
  FaSignOutAlt,
  FaChevronDown,
  FaMoon,
  FaSun,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { getCookie } from '@/utils/cookieUtils';
import { pingUsuario } from '@/services/authService';

const NavbarAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Panel Admin', path: '/admin/dashboard' },
    {
      name: 'Gestión',
      dropdown: [
        { name: 'Clases', path: '/admin/clases' },
        { name: 'Cursos', path: '/admin/cursos' },
        { name: 'Docentes', path: '/admin/docentes' },
      ],
    },
    { name: 'Estadísticas', path: '/admin/estadisticas' },
  ];

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const storedRole = localStorage.getItem('userRole') || getCookie('userRole');

    if (storedRole) {
      setUserRole(storedRole);
      return;
    }

    if (!token) return;

    const verificarSesion = async () => {
      try {
        const res = await pingUsuario();
        const { role, isValidated } = res;

        if (!role || !isValidated) {
          throw new Error('Sesión inválida o usuario no validado.');
        }

        setUserRole(role);
        const storage = localStorage.getItem('token') ? localStorage : sessionStorage;
        storage.setItem('userRole', role);
        document.cookie = `userRole=${role}; path=/;`;
      } catch (err) {
        console.error('❌ Error al verificar sesión:', err);
        setError('Sesión inválida. Inicia sesión nuevamente.');
        localStorage.clear();
        sessionStorage.clear();
        document.cookie = 'userRole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      }
    };

    verificarSesion();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    document.cookie = 'userRole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    navigate('/auth');
  };

  const navLinkClass = (path) =>
    `relative transition-all duration-300 ease-in-out px-2 py-1 rounded text-xs sm:text-sm md:text-base font-bold
     ${location.pathname === path ? 'text-[#00FFF7]' : 'text-white hover:text-[#00FFF7]'}`;

  return (
    <motion.nav
      role='navigation'
      aria-label='Barra de navegación administrativa'
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', bounce: 0.3, duration: 0.8 }}
      className={`fixed top-0 w-full ${
        darkMode
          ? 'bg-gradient-to-r from-black via-gray-900 to-black'
          : 'bg-gradient-to-r from-white via-gray-200 to-white'
      } backdrop-blur-md border-b border-[#00FFF7]/30 shadow-lg z-50`}
    >
      <div className='w-full max-w-[100vw] px-4 flex items-center justify-between h-14 sm:h-16'>
        <Link to='/' aria-label='Ir al inicio'>
          <img src='/LogoColegio.png' alt='Logo Colegio José Martí' className='h-8 sm:h-10' />
        </Link>

        {/* 🖥️ Navegación escritorio */}
        <div className='hidden md:flex items-center space-x-6'>
          {navLinks

            .filter((link) => link.name !== 'Estadísticas' && link.name !== 'Docentes')

            .flatMap((link) =>
              link.dropdown
                ? link.dropdown.filter(
                    (sub) => sub.name !== 'Estadísticas' && sub.name !== 'Docentes'
                  )
                : [link]
            )
            .map((link) => (
              <div key={link.name} className='relative group'>
                <Link to={link.path} className={navLinkClass(link.path)}>
                  {link.name}
                </Link>

                {/* Subrayado activo */}
                {location.pathname === link.path && (
                  <motion.span
                    layoutId='underline'
                    className='absolute left-0 bottom-0 h-[3px] w-full bg-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7]'
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}

                {/* Hover subrayado */}
                <span className='absolute left-0 bottom-0 h-[2px] w-0 bg-[#00FFF7] group-hover:w-full transition-all duration-200 ease-out' />
              </div>
            ))}

          {/* 🌙 Toggle Dark/Light */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className='ml-4 text-white hover:text-[#00FFF7] transition-transform duration-200 hover:scale-110'
            aria-label='Cambiar tema'
          >
            {darkMode ? (
              <FaMoon className='text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7]' />
            ) : (
              <FaSun className='text-yellow-400 drop-shadow-[0_0_6px_#FFD700]' />
            )}
          </button>

          {/* 👤 Botón usuario */}
          <div className='relative'>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              aria-label='Menú usuario'
              className='relative transition-transform duration-200 hover:translate-y-[2px]'
            >
              <FaUserCircle className='text-[#00FFF7] text-2xl sm:text-3xl drop-shadow-[0_0_6px_#00FFF7]' />
              {userRole && (
                <span
                  className='absolute -top-2 -right-2 flex items-center justify-center 
         w-6 h-6 rounded-full bg-gradient-to-r from-[#00FFF7] to-[#00FF33] 
         text-black text-xs sm:text-sm font-extrabold 
         drop-shadow-[0_0_8px_#00FFF7] border border-white/20'
                  aria-label={`Inicial del rol: ${userRole}`}
                >
                  {userRole.charAt(0).toUpperCase()}
                </span>
              )}
            </button>

            {userMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className='absolute right-0 mt-2 w-48 bg-black/90 border border-white/20 
       rounded-xl shadow-lg z-50 overflow-hidden'
              >
                <div className='px-4 py-3 border-b border-white/10'>
                  <p className='text-xs text-white/60'>Sesión activa</p>
                  <p className='text-sm font-semibold text-[#00FFF7]'>{userRole}</p>
                </div>
                <button
                  onClick={() => window.location.reload()}
                  className='flex items-center gap-2 w-full text-left px-4 py-2 text-sm 
         hover:bg-white/10 transition-colors'
                >
                  <FaSyncAlt className='text-[#00FFF7]' /> <span>Recargar página</span>
                </button>
                <button
                  onClick={handleLogout}
                  className='flex items-center gap-2 w-full text-left px-4 py-2 text-sm 
         hover:bg-white/10 transition-colors text-red-400'
                >
                  <FaSignOutAlt /> <span>Cerrar sesión</span>
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* 📱 Botón menú móvil */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          aria-label='Abrir menú'
          aria-expanded={isOpen}
          initial={false}
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className='md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg 
             border border-white/20 bg-black/70 text-white 
             hover:border-[#00FFF7] hover:shadow-[0_0_8px_#00FFF7] 
             transition-all duration-300'
        >
          {/* Líneas del ícono hamburguesa */}
          <span
            className={`block h-0.5 w-6 bg-white rounded transition-all duration-300 ${
              isOpen ? 'rotate-45 translate-y-1.5 bg-[#00FFF7]' : ''
            }`}
          ></span>
          <span
            className={`block h-0.5 w-6 bg-white rounded my-1 transition-all duration-300 ${
              isOpen ? 'opacity-0' : ''
            }`}
          ></span>
          <span
            className={`block h-0.5 w-6 bg-white rounded transition-all duration-300 ${
              isOpen ? '-rotate-45 -translate-y-1.5 bg-[#00FFF7]' : ''
            }`}
          ></span>
        </motion.button>
      </div>

      {/* 📱 Menú móvil */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          role='menu'
          aria-label='Menú móvil'
          className='md:hidden px-4 pb-4 flex flex-col space-y-2 bg-black text-white'
        >
          {navLinks.map((link) =>
            link.dropdown ? (
              <div key={link.name} className='relative'>
                <button className='flex items-center gap-1 text-white hover:text-[#00FFF7] font-bold'>
                  {link.name} <FaChevronDown className='text-xs' />
                </button>
                <div className='mt-2 flex flex-col bg-black border border-white/20 rounded-lg shadow-lg'>
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={navLinkClass(item.path) + ' block px-4 py-2'}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={navLinkClass(link.path)}
              >
                {link.name}
              </Link>
            )
          )}

          {/* 🌙 Toggle Dark/Light en móvil */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className='flex items-center gap-2 text-white hover:text-[#00FFF7] transition-transform duration-300 hover:scale-105'
            aria-label='Cambiar tema'
          >
            {darkMode ? (
              <FaMoon className='text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7]' />
            ) : (
              <FaSun className='text-yellow-400 drop-shadow-[0_0_6px_#FFD700]' />
            )}
            <span className='text-xs sm:text-sm font-bold'>Tema</span>
          </button>

          {/* 👤 Menú usuario en móvil */}
          <button
            onClick={() => {
              setIsOpen(false);
              setUserMenuOpen(!userMenuOpen);
            }}
            className='flex items-center gap-2 text-white hover:text-[#00FFF7] transition-all duration-300'
          >
            <FaUserCircle className='text-[#00FFF7] text-lg sm:text-xl drop-shadow-[0_0_6px_#00FFF7]' />
            <span className='text-xs sm:text-sm font-bold'>Usuario</span>
          </button>
        </motion.div>
      )}

      {/* ⚠️ Feedback visual de error */}
      {error && (
        <div
          role='alert'
          className='absolute top-14 sm:top-16 left-0 w-full bg-red-600 text-white text-center py-2 text-xs sm:text-sm font-bold'
        >
          {error}
        </div>
      )}
    </motion.nav>
  );
};

export default NavbarAdmin;
