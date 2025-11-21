import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthWrapper from '../components/auth/AuthWrapper';
import { motion } from 'framer-motion';
import { Particles } from '@tsparticles/react';
import useAuth from '../hooks/useAuth'; // ✅ usar export default

const AuthPage = () => {
  const navigate = useNavigate();
  // ✅ alias: refetch se usará como verificarSesion
  const { refetch: verificarSesion } = useAuth();
  const [evaluandoSesion, setEvaluandoSesion] = useState(true);

  useEffect(() => {
    const checkSesion = async () => {
      const sesionValida = await verificarSesion();
      if (sesionValida) {
        const { role } = sesionValida;
        navigate(`/${role}/dashboard`, { replace: true });
        return;
      }
      setEvaluandoSesion(false);
    };
    checkSesion();
  }, [navigate, verificarSesion]);

  const particlesOptions = {
    fullScreen: { enable: false },
    background: { color: { value: '#000000' } },
    fpsLimit: 60,
    interactivity: {
      events: { onHover: { enable: true, mode: 'grab' }, resize: true },
      modes: { grab: { distance: 140, links: { opacity: 0.3 } } },
    },
    particles: {
      number: { value: 50, density: { enable: true, area: 800 } },
      color: { value: '#ffffff' },
      shape: { type: 'circle' },
      opacity: { value: 0.25 },
      size: { value: 1.2, random: true },
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
        <p className='text-white/70 text-sm sm:text-base font-medium'>Verificando sesión...</p>
      </main>
    );
  }

  return (
    <main className='relative min-h-screen w-full text-white flex items-center justify-center px-4 pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24 overflow-hidden'>
      {/* 🎥 Video de fondo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className='absolute inset-0 w-full h-full object-cover z-0'
      >
        <source
          src='https://cdn.pixabay.com/video/2018/09/05/18088-288458760_large.mp4'
          type='video/mp4'
        />
      </video>
      {/* Overlay oscuro para legibilidad */}
      <div className='absolute inset-0 bg-black/60 z-0 pointer-events-none' />

      {/* ✨ Fondo animado de partículas */}
      <div className='absolute inset-0 w-full h-full z-0'>
        <Particles
          id='tsparticles'
          options={particlesOptions}
          className='w-full h-full pointer-events-none'
        />
      </div>

      {/* 🔙 Botón de regreso */}
      <div className='absolute top-4 left-4 sm:top-6 sm:left-6 z-10'>
        <Link
          to='/'
          className='text-[#00FFF7] font-medium text-xs sm:text-sm border border-[#00FFF7] px-3 py-1.5 rounded-full transition duration-300 hover:bg-[#00FFF7] hover:text-black bg-black shadow-md hover:drop-shadow-[0_0_8px_#00FFF7]'
        >
          ← Inicio
        </Link>
      </div>

      {/* 🧾 Tarjeta de login */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='relative z-10 w-full max-w-sm sm:max-w-md md:max-w-lg bg-black border border-white/20 rounded-xl shadow-2xl p-6 sm:p-8 md:p-10 space-y-6'
      >
        <div className='flex flex-col items-center space-y-3'>
          <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-white font-[Orbitron] text-center drop-shadow-[0_0_6px_#00FFF7]'>
            Acceso institucional
          </h1>
          <p className='text-xs sm:text-sm md:text-base text-white/80 text-center max-w-md leading-relaxed font-medium'>
            Ingresa con tus credenciales académicas para acceder al sistema del Colegio José Martí.
          </p>
        </div>

        <AuthWrapper />
      </motion.div>
    </main>
  );
};

export default AuthPage;
