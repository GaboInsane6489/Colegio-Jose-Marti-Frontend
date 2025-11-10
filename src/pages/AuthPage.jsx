import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthWrapper from '../components/auth/AuthWrapper';
import { motion } from 'framer-motion';
import { Particles } from '@tsparticles/react';

const AuthPage = () => {
  const navigate = useNavigate();
  const [evaluandoSesion, setEvaluandoSesion] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const role =
      localStorage.getItem('userRole') ||
      document.cookie
        .split('; ')
        .find((row) => row.startsWith('userRole='))
        ?.split('=')[1];
    const usuarioRaw = localStorage.getItem('usuario') || sessionStorage.getItem('usuario');

    let usuario = null;
    try {
      usuario = JSON.parse(usuarioRaw);
    } catch (e) {
      console.warn('⚠️ Usuario corrupto o malformado. Ignorando sesión.');
    }

    if (token && role && usuario) {
      console.info('🔐 Sesión completa detectada. Redirigiendo a dashboard.');
      navigate(`/${role}/dashboard`, { replace: true });
      return;
    }

    if (token && (!role || !usuario)) {
      console.warn('⚠️ Token presente pero sesión incompleta. Limpiando.');
      localStorage.clear();
      sessionStorage.clear();
      document.cookie = 'userRole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }

    setEvaluandoSesion(false);
  }, [navigate]);

  const particlesOptions = {
    fullScreen: { enable: false },
    background: { color: { value: '#000000' } },
    fpsLimit: 60,
    interactivity: {
      events: { onHover: { enable: true, mode: 'grab' }, resize: true },
      modes: { grab: { distance: 140, links: { opacity: 0.3 } } },
    },
    particles: {
      number: { value: 60, density: { enable: true, area: 800 } },
      color: { value: '#ffffff' },
      shape: { type: 'circle' },
      opacity: { value: 0.3 },
      size: { value: 1.5, random: true },
      links: {
        enable: true,
        distance: 120,
        color: '#ffffff',
        opacity: 0.1,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.4,
        direction: 'none',
        outModes: { default: 'bounce' },
      },
    },
    detectRetina: true,
  };

  if (evaluandoSesion) {
    return (
      <main className='min-h-screen flex items-center justify-center bg-black text-white'>
        Verificando sesión...
      </main>
    );
  }

  return (
    <main
      className='relative min-h-screen w-full text-white flex items-center justify-center px-4 pt-20 pb-20 md:px-8 md:pt-24 overflow-hidden'
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://cdn.pixabay.com/photo/2020/09/29/10/42/library-5612441_1280.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* ✨ Fondo animado */}
      <div className='absolute inset-0 w-full h-full z-0'>
        <Particles
          id='tsparticles'
          options={particlesOptions}
          className='w-full h-full pointer-events-none'
        />
      </div>

      {/* 🔙 Botón de regreso */}
      <div className='absolute top-4 left-4 md:top-6 md:left-6 z-10'>
        <Link
          to='/'
          className='text-[#00FFF7] font-medium text-xs md:text-sm border border-[#00FFF7] px-3 py-1.5 rounded-full transition duration-300 hover:bg-[#00FFF7] hover:text-black bg-black shadow-md hover:drop-shadow-[0_0_8px_#00FFF7]'
        >
          ← Inicio
        </Link>
      </div>

      {/* 🧾 Tarjeta de login */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='relative z-10 w-full max-w-sm sm:max-w-md md:max-w-xl bg-black border border-white rounded-xl shadow-2xl p-6 sm:p-8 md:p-10 space-y-6'
      >
        <div className='flex flex-col items-center space-y-4'>
          <h1 className='text-2xl sm:text-3xl font-bold text-white font-[Orbitron] text-center drop-shadow-[0_0_6px_#00FFF7]'>
            Acceso institucional
          </h1>
          <p className='text-[15px] text-gray-300 text-center max-w-md leading-relaxed'>
            Ingresa con tus credenciales académicas para acceder al sistema del Colegio José Martí.
          </p>
        </div>

        <AuthWrapper />
      </motion.div>
    </main>
  );
};

export default AuthPage;
