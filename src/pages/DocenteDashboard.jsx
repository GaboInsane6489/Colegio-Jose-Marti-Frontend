import { motion } from 'framer-motion';
import NavbarDocente from '@/components/docente/NavbarDocente';
import CursosAsignados from '@/components/docente/CursosAsignados';
import PerfilDocente from '@/components/docente/PerfilDocente';
import NotificacionesDocente from '@/components/docente/NotificacionesDocente';
import Footer from '@/components/Footer';
import VideoFondoDocente from '@/components/docente/VideoFondoDocente';

/**
 * 🧠 Dashboard institucional del docente
 * Carga modularizada con validación defensiva.
 */
const DocenteDashboard = () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const role =
    localStorage.getItem('userRole') ||
    document.cookie
      .split('; ')
      .find((row) => row.startsWith('userRole='))
      ?.split('=')[1];

  if (!token || role !== 'docente') {
    console.warn('⚠️ Sesión inválida o rol incorrecto. Redirigiendo.');
    window.location.href = '/auth';
    return null;
  }

  return (
    <div className='relative min-h-screen bg-black text-white overflow-hidden'>
      {/* 🎥 Video institucional modularizado */}
      <VideoFondoDocente />

      {/* 🧭 Navbar */}
      <div className='relative z-30'>
        <NavbarDocente />
      </div>

      {/* 🧠 Contenido principal */}
      <main className='relative z-20 px-4 sm:px-6 lg:px-8 py-24 max-w-6xl mx-auto space-y-12'>
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className='text-center'
        >
          <h1 className='text-2xl sm:text-3xl font-bold tracking-tight'>Panel del Docente</h1>
          <p className='mt-2 text-sm sm:text-base text-gray-300'>
            Tu espacio académico, emocional y estratégico. Aquí cada clase cuenta.
          </p>
        </motion.header>

        {/* 🧩 Secciones protegidas con fallback */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        >
          <PerfilDocente fallback={<p>⚠️ Error al cargar perfil.</p>} />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          <CursosAsignados fallback={<p>⚠️ Error al cargar cursos.</p>} />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
        >
          <NotificacionesDocente fallback={<p>⚠️ Error al cargar notificaciones.</p>} />
        </motion.section>
      </main>

      {/* 📦 Footer institucional */}
      <div className='relative z-20 mt-10'>
        <Footer />
      </div>
    </div>
  );
};

export default DocenteDashboard;
