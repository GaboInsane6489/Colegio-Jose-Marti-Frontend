import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { getCookie } from '@/utils/cookieUtils';

const NavbarDocente = () => {
  const [docenteName, setDocenteName] = useState('Docente');
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL?.trim();

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token || !API_URL) return;

    const fetchDocente = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/auth/ping`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const usuario = res.data.usuario;
        const nombre = usuario?.nombre || usuario?.email || 'Docente';

        console.log(`✅ Nombre del docente recibido: ${nombre}`);
        setDocenteName(nombre);
      } catch (error) {
        const status = error.response?.status;
        const mensaje = error.message || 'Error desconocido';

        console.error('❌ Error al obtener el nombre del docente:', mensaje);

        if (status === 403 || status === 401) {
          console.warn('🔐 Token inválido o expirado. Redirigiendo a /auth');
          localStorage.clear();
          sessionStorage.clear();
          navigate('/auth');
        } else {
          setDocenteName('Docente');
        }
      }
    };

    fetchDocente();
  }, [API_URL, navigate]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    document.cookie = 'userRole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    alert('👋 Sesión cerrada. ¡Gracias por tu dedicación!');
    navigate('/auth');
  };

  const enlaces = [
    { path: '/', label: 'Inicio' },
    { path: '/docente/notas', label: 'Notas' },
    { path: '/docente/actividades', label: 'Actividades' },
    { path: '/docente/cursos', label: 'Mis cursos' },
    { path: '/docente/clases', label: 'Mis clases' },
    { path: '/docente/notificaciones', label: 'Notificaciones' },
    { path: '/docente/dashboard', label: 'Perfil' },
  ];

  const navLinkClass = (path) =>
    `relative px-4 py-2 rounded transition duration-200 ease-in-out ${
      location.pathname === path ? 'text-white font-semibold' : 'text-white hover:text-white/80'
    }`;

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className='fixed top-0 left-0 right-0 z-50 bg-black text-white shadow-md border-b border-white'
    >
      <div className='max-w-6xl mx-auto px-4 py-4 flex justify-between items-center'>
        {/* 🖥️ Navegación escritorio */}
        <div className='hidden md:flex items-center gap-6 text-sm font-medium ml-4'>
          {enlaces.map(({ path, label }) => (
            <div key={`${path}-${label}`} className='relative group'>
              <Link to={path} className={navLinkClass(path)}>
                {label}
              </Link>
              {location.pathname === path && (
                <motion.div
                  layoutId='activeIndicator'
                  className='absolute bottom-0 left-0 w-full h-0.5 bg-white'
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                />
              )}
            </div>
          ))}
        </div>

        {/* 📱 Botón menú móvil */}
        <button
          onClick={() => setShowMobileNav(!showMobileNav)}
          className='md:hidden text-white hover:text-white transition'
          aria-label='Abrir menú de navegación'
        >
          ☰
        </button>

        {/* 👤 Menú usuario */}
        <div className='relative'>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className='flex items-center gap-2 hover:text-white transition'
            aria-label='Abrir menú de usuario'
            aria-expanded={showMenu}
          >
            <span className='text-sm font-medium'>{docenteName}</span>
            <span className='bg-white text-black rounded-full w-7 h-7 flex items-center justify-center font-bold border-2 border-white'>
              D
            </span>
          </button>

          <AnimatePresence>
            {showMenu && (
              <motion.div
                role='menu'
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.2 }}
                className='absolute right-0 mt-2 bg-black text-white rounded shadow-lg w-48 border border-white overflow-hidden z-50'
              >
                <button className='w-full text-left px-4 py-2 hover:bg-white/10'>
                  Editar perfil
                </button>
                <button onClick={logout} className='w-full text-left px-4 py-2 hover:bg-white/10'>
                  Cerrar sesión
                </button>
                <button
                  onClick={() => navigate(0)}
                  className='w-full text-left px-4 py-2 hover:bg-white/10'
                >
                  Recargar
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 📱 Menú móvil */}
      <AnimatePresence>
        {showMobileNav && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className='md:hidden bg-black border-t border-white px-4 py-4 text-sm font-medium flex flex-col items-center space-y-2'
          >
            {enlaces.map(({ path, label }) => (
              <Link
                key={`${path}-${label}`}
                to={path}
                onClick={() => setShowMobileNav(false)}
                className={navLinkClass(path)}
              >
                {label}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default NavbarDocente;
