import { motion } from 'framer-motion';

// 🎥 Visuales
import VideoFondoEstudiante from '@/components/estudiante/VideoFondoEstudiante';

// 🧭 Navegación
import NavbarEstudiante from '@/components/estudiante/NavbarEstudiante';
import Footer from '@/components/Footer';

// 🧩 Componentes estilo Magic Bento
import CardProgresoEstudiante from '@/components/estudiante/CardProgresoEstudiante';
import CardActividadesClave from '@/components/estudiante/CardActividadesClave';
import CardValoresInstitucionales from '@/components/estudiante/CardValoresInstitucionales';
import CardVestimentaEstudiante from '@/components/estudiante/CardVestimentaEstudiante';
import CardBienestarEstudiante from '@/components/estudiante/CardBienestarEstudiante';
import CardRecordatorioAgenda from '@/components/estudiante/CardRecordatorioAgenda';
import CardMensajeMotivacional from '@/components/estudiante/CardMensajeMotivacional';

/**
 * 🧠 Dashboard institucional del estudiante
 * Vista emocional, estratégica y modular estilo Magic Bento
 */
const EstudianteDashboard = () => {
  return (
    <div
      aria-label='Dashboard institucional del estudiante'
      className='relative min-h-screen bg-[#0d0d0d] text-white font-[Orbitron] tracking-tight overflow-x-hidden'
    >
      {/* 🎥 Video de fondo */}
      <VideoFondoEstudiante />

      {/* 🧱 Contenido principal */}
      <div className='relative z-10'>
        <NavbarEstudiante />
        <main className='pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16'>
          {/* Encabezado institucional */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className='text-center space-y-6'
          >
            <h1 className='text-5xl font-bold tracking-tight drop-shadow-[0_0_6px_#00FFF7]'>
              Panel del Estudiante
            </h1>
            <p className='text-base text-white/80 max-w-xl mx-auto'>
              Tu espacio académico, emocional y estratégico. Aquí cada entrega cuenta.
            </p>
          </motion.section>

          {/* Progreso académico */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className='grid grid-cols-1'
          >
            <CardProgresoEstudiante />
          </motion.section>

          {/* Actividades clave + Agenda */}
          <motion.section
            initial='hidden'
            animate='visible'
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.15 },
              },
            }}
            className='grid grid-cols-1 sm:grid-cols-2 gap-6'
          >
            <CardActividadesClave />
            <CardRecordatorioAgenda />
          </motion.section>

          {/* Valores + Vestimenta + Bienestar */}
          <motion.section
            initial='hidden'
            animate='visible'
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.15 },
              },
            }}
            className='grid grid-cols-1 sm:grid-cols-3 gap-6'
          >
            <CardValoresInstitucionales />
            <CardVestimentaEstudiante />
            <CardBienestarEstudiante />
          </motion.section>

          {/* Mensaje motivacional */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className='grid grid-cols-1'
          >
            <CardMensajeMotivacional />
          </motion.section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default EstudianteDashboard;
