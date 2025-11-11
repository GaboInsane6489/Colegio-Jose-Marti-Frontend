import { motion } from 'framer-motion';
import { ClipboardDocumentListIcon } from '@heroicons/react/24/solid';

import NavbarAdmin from '@/components/admin/NavbarAdmin';
import ValidarUsuarios from '@/components/admin/ValidarUsuarios';
import GestionDocentes from '@/components/admin/GestionDocentes';
import EstadisticasAcademicas from '@/components/admin/EstadisticasAcademicas';
import Footer from '@/components/Footer';
import VideoFondoAdmin from '@/components/admin/VideoFondoAdmin';

/**
 * 🧠 Dashboard institucional del administrador
 * Control total con trazabilidad, validación y gestión académica.
 */
const AdministradorDashboard = () => {
  return (
    <div className='relative min-h-screen bg-black text-white overflow-hidden'>
      <VideoFondoAdmin />
      <div className='absolute inset-0 bg-black/40 z-10 pointer-events-none' />

      <div className='relative z-30 shadow-[0_0_12px_#00FFF7]'>
        <NavbarAdmin />
      </div>

      <main className='relative z-20 px-4 sm:px-6 lg:px-8 py-24 max-w-6xl mx-auto space-y-16'>
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className='text-center flex flex-col items-center'
        >
          <ClipboardDocumentListIcon className='h-12 w-12 text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7] mb-2' />
          <h1 className='text-2xl sm:text-3xl font-bold tracking-tight'>Panel Administrativo</h1>
          <p className='mt-2 text-sm sm:text-base text-gray-300 max-w-xl'>Colegio José Martí</p>
          <p className='mt-1 text-xs sm:text-sm text-white/70 max-w-md'>
            Este panel permite validar usuarios, gestionar docentes, visualizar estadísticas
            académicas y mantener el control institucional con precisión y trazabilidad.
          </p>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        >
          <ValidarUsuarios fallback={<p className='text-red-400'>Error al cargar usuarios.</p>} />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          <GestionDocentes fallback={<p className='text-red-400'>Error al cargar docentes.</p>} />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
        >
          <EstadisticasAcademicas
            fallback={<p className='text-red-400'>Error al cargar estadísticas.</p>}
          />
        </motion.section>
      </main>

      <div className='relative z-20 mt-10'>
        <Footer />
      </div>
    </div>
  );
};

export default AdministradorDashboard;
