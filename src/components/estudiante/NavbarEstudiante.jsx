import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBars,
  FaUserCircle,
  FaSignOutAlt,
  FaSyncAlt,
  FaEdit,
  FaHome,
  FaTasks,
} from 'react-icons/fa';

const NavbarEstudiante = () => {
  const [nombre, setNombre] = useState('Estudiante');
  const [usuarioId, setUsuarioId] = useState('');
  const [token, setToken] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL?.trim();

  const didPing = useRef(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!storedToken || !API_URL) return;

    setToken(storedToken);

    if (didPing.current) return;
    didPing.current = true;

    const fetchEstudiante = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/auth/ping`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });

        const user = res.data?.usuario || {};
        setNombre(user.nombre || res.data.nombre || res.data.email || 'Estudiante');
        setUsuarioId(user.uid || user._id || res.data.uid || res.data._id || '');
      } catch (error) {
        console.error('❌ Error al obtener datos del estudiante:', error);
      }
    };

    fetchEstudiante();
  }, [API_URL]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    document.cookie = 'userRole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    navigate('/auth');
  };

  // 🔗 Enlaces de navegación (Clases eliminado)
  const enlaces = [
    { path: '/estudiante/dashboard', label: 'Dashboard', icon: <FaHome /> },
    { path: '/estudiante/actividades', label: 'Actividades', icon: <FaTasks /> },
  ];

  const navLinkClass = (path) =>
    `relative px-3 py-1 rounded transition duration-150 ease-out font-[Noto Sans] text-[13px] tracking-wide drop-shadow-[0_0_6px_#00FFF7] ${
      location.pathname === path
        ? 'text-[#00FFF7] font-semibold'
        : 'text-white hover:text-[#00FFF7]/80'
    }`;

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className='fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md text-white shadow-lg border-b-2 border-[#00FFF7] font-[Noto Sans]'
    >
      <div className='max-w-6xl mx-auto px-4 py-3 flex justify-between items-center'>
        {/* 🖥️ Navegación escritorio */}
        <div className='hidden md:flex items-center gap-6'>
          {enlaces.map(({ path, label, icon }) => (
            <motion.div
              key={path}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className='relative group flex items-center gap-2'
            >
              <Link to={path} className={navLinkClass(path)}>
                <span className='inline-flex items-center gap-2'>
                  {icon} {label}
                </span>
              </Link>
              {location.pathname === path && (
                <motion.div
                  layoutId='activeIndicator'
                  initial={{ y: 2, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className='absolute bottom-0 left-0 w-full h-0.5 bg-[#00FFF7]'
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* 📱 Botón menú móvil */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowMobileNav(!showMobileNav)}
          className='md:hidden text-[#00FFF7] hover:text-white transition text-xl drop-shadow-[0_0_6px_#00FFF7]'
          aria-label='Abrir menú de navegación'
        >
          <FaBars />
        </motion.button>

        {/* 👤 Menú usuario */}
        <div className='flex items-center gap-4'>
          <div className='relative'>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowMenu(!showMenu)}
              className='flex items-center gap-2 hover:text-[#00FFF7] transition'
              aria-label='Abrir menú de usuario'
              aria-expanded={showMenu}
            >
              <span className='text-xs font-semibold drop-shadow-[0_0_6px_#00FFF7]'>{nombre}</span>
              <span className='bg-white text-black rounded-full w-7 h-7 flex items-center justify-center font-bold border-2 border-[#00FFF7] drop-shadow-[0_0_8px_#00FFF7]'>
                <FaUserCircle />
              </span>
            </motion.button>

            <AnimatePresence>
              {showMenu && (
                <motion.div
                  role='menu'
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className='absolute right-0 mt-2 bg-black/90 text-white rounded-lg shadow-xl w-48 border border-white/10 overflow-hidden z-50 text-sm'
                >
                  <button className='flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-[#00FFF7]/10'>
                    <FaEdit /> Editar perfil
                  </button>
                  <button
                    onClick={logout}
                    className='flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-[#00FFF7]/10'
                  >
                    <FaSignOutAlt /> Cerrar sesión
                  </button>
                  <button
                    onClick={() => navigate(0)}
                    className='flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-[#00FFF7]/10'
                  >
                    <FaSyncAlt /> Recargar
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 📱 Menú móvil */}
      <AnimatePresence>
        {showMobileNav && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className='md:hidden bg-black/90 border-t border-white/10 px-4 py-4 text-sm flex flex-col items-center space-y-3'
          >
            {enlaces.map(({ path, label, icon }) => (
              <Link
                key={path}
                to={path}
                className={`${navLinkClass(
                  path
                )} flex items-center gap-2 hover:bg-[#00FFF7]/10 rounded-lg px-3 py-2`}
              >
                {icon} {label}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default NavbarEstudiante;
