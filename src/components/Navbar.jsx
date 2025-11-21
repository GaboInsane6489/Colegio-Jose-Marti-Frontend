import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { getCookie } from '../utils/cookieUtils';
import { pingUsuario } from '../services/authService';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Nosotros', path: '/about' },
    { name: 'Contáctanos', path: '/contact' },
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

  const handleUserIconClick = () => {
    const role = localStorage.getItem('userRole') || getCookie('userRole');

    switch (role) {
      case 'admin':
        navigate('/admin/dashboard');
        break;
      case 'docente':
        navigate('/docente/dashboard');
        break;
      case 'estudiante':
        navigate('/estudiante/dashboard');
        break;
      default:
        navigate('/auth');
    }
  };

  const navLinkClass = (path) =>
    `relative transition-all duration-300 px-2 py-1 rounded text-xs sm:text-sm md:text-base font-medium group ${
      location.pathname === path ? 'text-white font-semibold' : 'text-white/80 hover:text-white'
    } after:content-[""] after:block after:w-0 after:h-[2px] after:bg-[#00FFF7] after:transition-all after:duration-300 after:mx-auto group-hover:after:w-full ${
      location.pathname === path ? 'after:w-full after:animate-pulse' : ''
    }`;

  return (
    <motion.nav
      role='navigation'
      aria-label='Barra de navegación principal'
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', bounce: 0.3, duration: 0.8 }}
      className='fixed top-0 w-full bg-black text-white shadow-lg z-50 drop-shadow-[0_0_6px_#00FFF7]'
    >
      <div className='w-full max-w-[100vw] px-4 flex items-center justify-between h-14 sm:h-16'>
        <Link to='/' aria-label='Ir al inicio'>
          <img src='/LogoColegio.png' alt='Logo Colegio José Martí' className='h-8 sm:h-10' />
        </Link>

        {/* Navegación escritorio */}
        <div className='hidden md:flex items-center space-x-6'>
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className={navLinkClass(link.path)}>
              {link.name}
            </Link>
          ))}
          <button
            onClick={handleUserIconClick}
            aria-label='Acceder al sistema'
            className='relative transition-transform duration-300 hover:-translate-y-[2px] hover:scale-105'
          >
            <FaUserCircle className='text-white text-xl sm:text-2xl drop-shadow-[0_0_6px_#00FFF7]' />
            {userRole && (
              <span
                className='absolute -top-2 -right-3 bg-white text-black text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full'
                aria-label={`Rol: ${userRole}`}
              >
                {userRole.charAt(0).toUpperCase()}
              </span>
            )}
          </button>
        </div>

        {/* Botón menú móvil */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='md:hidden text-lg sm:text-xl transition-transform duration-300 hover:-translate-y-[2px] hover:scale-105'
          aria-label='Abrir menú'
          aria-expanded={isOpen}
        >
          ☰
        </button>
      </div>

      {/* Menú móvil */}
      {isOpen && (
        <div
          role='menu'
          aria-label='Menú móvil'
          className='md:hidden px-4 pb-4 flex flex-col space-y-2 bg-black text-white drop-shadow-[0_0_6px_#00FFF7]'
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={navLinkClass(link.path)}
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={() => {
              setIsOpen(false);
              handleUserIconClick();
            }}
            className='flex items-center gap-2 text-white/80 hover:text-white transition-all duration-300 hover:-translate-y-[2px] hover:scale-105'
          >
            <FaUserCircle className='text-white text-lg sm:text-xl drop-shadow-[0_0_6px_#00FFF7]' />
            <span className='text-xs sm:text-sm font-medium'>Acceder</span>
          </button>
        </div>
      )}

      {/* Feedback visual de error */}
      {error && (
        <div
          role='alert'
          className='absolute top-14 sm:top-16 left-0 w-full bg-red-600 text-white text-center py-2 text-xs sm:text-sm font-medium'
        >
          {error}
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
