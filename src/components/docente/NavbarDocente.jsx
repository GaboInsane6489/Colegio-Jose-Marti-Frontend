import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axiosInstancia from '@/services/axiosInstancia';
import { motion, AnimatePresence } from 'framer-motion';

const NavbarDocente = () => {
  const [docenteName, setDocenteName] = useState('Docente');
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) return;

    const fetchDocente = async () => {
      try {
        const { data } = await axiosInstancia.get('/auth/ping', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const usuario = data.usuario;
        const nombre = usuario?.nombre || 'Docente';
        setDocenteName(nombre);
      } catch (error) {
        const status = error.response?.status;
        if (status === 403 || status === 401) {
          localStorage.clear();
          sessionStorage.clear();
          navigate('/auth');
        } else {
          setDocenteName('Docente');
        }
      }
    };

    fetchDocente();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    document.cookie = 'userRole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    alert('Sesión cerrada. ¡Gracias por tu dedicación!');
    navigate('/auth');
  };

  const enlaces = [
    { path: '/', label: 'Inicio' },
    { path: '/docente/actividades', label: 'Actividades' },
    { path: '/docente/cursos', label: 'Mis cursos' },
    { path: '/docente/clases', label: 'Mis clases' },
    { path: '/docente/dashboard', label: 'Perfil' },
  ];

  const navLinkClass = (path) =>
    `relative px-4 py-2 transition duration-200 ease-out ${
      location.pathname === path ? 'text-white font-semibold' : 'text-white/80 hover:text-white'
    } group`;

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className='fixed top-0 left-0 right-0 z-50 bg-[#0d0d0d] text-white border-b border-white/10 drop-shadow-[0_0_12px_#00FFF7]'
    >
      <div className='max-w-6xl mx-auto px-4 py-4 flex justify-between items-center'>
        {/* Navegación escritorio */}
        <nav
          className='hidden md:flex items-center gap-6 text-sm font-medium ml-4'
          role='navigation'
        >
          {enlaces.map(({ path, label }) => (
            <div key={`${path}-${label}`} className='relative group'>
              <Link to={path} className={`${navLinkClass(path)} hover:scale-105`}>
                {label}
              </Link>
              <motion.div
                layoutId='activeIndicator'
                className={`absolute bottom-0 left-0 w-full h-0.5 rounded-full ${
                  location.pathname === path
                    ? 'bg-[#00FFF7]'
                    : 'bg-transparent group-hover:bg-[#00FFF7]'
                } drop-shadow-[0_0_6px_#00FFF7] transition-all duration-200 ease-out`}
              />
            </div>
          ))}
        </nav>

        {/* Botón menú móvil */}
        <button
          onClick={() => setShowMobileNav(!showMobileNav)}
          className='md:hidden text-white hover:text-[#00FFF7] transition transform hover:scale-110'
          aria-label='Abrir menú de navegación'
        >
          ☰
        </button>

        {/* Menú usuario */}
        <div className='relative'>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className='flex items-center gap-2 hover:text-[#00FFF7] transition transform hover:scale-105'
            aria-label='Abrir menú de usuario'
            aria-expanded={showMenu}
          >
            <span className='bg-black text-[#00FFF7] rounded-full w-8 h-8 flex items-center justify-center font-bold border-2 border-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7]'>
              {docenteName.charAt(0).toUpperCase()}
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
                className='absolute right-0 mt-2 bg-[#0d0d0d] text-white rounded-xl shadow-lg w-48 border border-[#00FFF7] overflow-hidden z-50'
              >
                <button className='w-full text-left px-4 py-2 hover:bg-white/10 transition'>
                  Editar perfil
                </button>
                <button
                  onClick={logout}
                  className='w-full text-left px-4 py-2 hover:bg-white/10 transition'
                >
                  Cerrar sesión
                </button>
                <button
                  onClick={() => navigate(0)}
                  className='w-full text-left px-4 py-2 hover:bg-white/10 transition'
                >
                  Recargar
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Menú móvil */}
      <AnimatePresence>
        {showMobileNav && (
          <motion.nav
            role='navigation'
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className='md:hidden bg-black/90 border-t border-[#00FFF7] px-4 py-4 text-sm font-medium flex flex-col items-center space-y-2'
          >
            {enlaces.map(({ path, label }) => (
              <Link
                key={`${path}-${label}`}
                to={path}
                onClick={() => setShowMobileNav(false)}
                className={`${navLinkClass(path)} hover:scale-105`}
              >
                {label}
                <motion.div
                  layoutId='activeIndicatorMobile'
                  className={`absolute bottom-0 left-0 w-full h-0.5 rounded-full ${
                    location.pathname === path
                      ? 'bg-[#00FFF7]'
                      : 'bg-transparent group-hover:bg-[#00FFF7]'
                  } drop-shadow-[0_0_6px_#00FFF7] transition-all duration-200 ease-out`}
                />
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default NavbarDocente;
