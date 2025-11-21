import { motion } from 'framer-motion';
import ActividadCardEstudiante from '@/components/estudiante/ActividadCardEstudiante';
import {
  ArrowPathIcon,
  AcademicCapIcon,
  ClipboardDocumentListIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import VideoFondoEstudiante from '@/components/estudiante/VideoFondoEstudiante';
import NavbarEstudiante from '@/components/estudiante/NavbarEstudiante';
import Footer from '@/components/Footer';
import useActividadesEstudiante from '@/hooks/useActividadesEstudiante';

/**
 * 📋 Vista principal del estudiante para ver actividades asignadas
 */
const DashboardActividadesEstudiante = () => {
  const { actividades, loading, error, refetchActividades } = useActividadesEstudiante();

  return (
    <div className='min-h-screen bg-[#0d0d0d] text-white overflow-hidden relative'>
      {/* 🎥 Video de fondo institucional */}
      <VideoFondoEstudiante />

      <NavbarEstudiante />

      <main className='relative z-10 pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-20'>
        {/* Encabezado institucional */}
        <motion.header
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-center space-y-4'
        >
          <h1 className='text-4xl font-bold tracking-tight text-white drop-shadow-[0_0_8px_#00FFF7] border-b-4 border-[#00FFF7] inline-block pb-2'>
            Panel del Estudiante
          </h1>
          <p className='text-white/80 text-lg max-w-2xl mx-auto leading-relaxed'>
            Tu espacio académico premium, con actividades, progreso y docentes en un solo lugar.
          </p>
        </motion.header>

        {/* 🎥 Bloque de video institucional con contenido */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className='flex flex-col items-center space-y-10'
        >
          <div className='relative w-full max-w-5xl rounded-3xl overflow-hidden border border-white/20 shadow-xl'>
            <video autoPlay loop muted playsInline className='w-full h-[500px] object-cover'>
              <source
                src='https://cdn.pixabay.com/video/2015/10/16/1046-142621379_large.mp4'
                type='video/mp4'
              />
            </video>
            {/* Overlay con contenido institucional */}
            <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col items-center justify-center text-center space-y-4'>
              <h2 className='text-3xl font-extrabold text-white drop-shadow-[0_0_8px_#00FFF7]'>
                Bienvenido a tu espacio académico
              </h2>
              <p className='text-white/80 max-w-xl leading-relaxed'>
                Explora tus actividades, progreso y docentes en un entorno premium y fosforescente.
              </p>
            </div>
          </div>

          {/* Cards institucionales con glassmorphism */}
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-5xl'>
            <motion.div
              whileHover={{ scale: 1.05, y: -4, rotate: 0.5 }}
              className='bg-black/50 backdrop-blur-md border border-white/20 rounded-3xl p-8 text-center shadow-lg transition-all duration-200 ease-out hover:border-[#00FFF7] hover:drop-shadow-[0_0_12px_#00FFF7]'
            >
              <AcademicCapIcon className='w-12 h-12 mx-auto text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7]' />
              <h3 className='mt-4 text-xl font-semibold text-white'>Progreso Académico</h3>
              <p className='text-white/70 text-sm mt-2 leading-relaxed'>
                Visualiza tu rendimiento en cada materia y lapso.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -4, rotate: 0.5 }}
              className='bg-black/50 backdrop-blur-md border border-white/20 rounded-3xl p-8 text-center shadow-lg transition-all duration-200 ease-out hover:border-[#00FFF7] hover:drop-shadow-[0_0_12px_#00FFF7]'
            >
              <ClipboardDocumentListIcon className='w-12 h-12 mx-auto text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7]' />
              <h3 className='mt-4 text-xl font-semibold text-white'>Actividades</h3>
              <p className='text-white/70 text-sm mt-2 leading-relaxed'>
                Consulta todas tus actividades asignadas y pendientes.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -4, rotate: 0.5 }}
              className='bg-black/50 backdrop-blur-md border border-white/20 rounded-3xl p-8 text-center shadow-lg transition-all duration-200 ease-out hover:border-[#00FFF7] hover:drop-shadow-[0_0_12px_#00FFF7]'
            >
              <UserCircleIcon className='w-12 h-12 mx-auto text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7]' />
              <h3 className='mt-4 text-xl font-semibold text-white'>Docentes</h3>
              <p className='text-white/70 text-sm mt-2 leading-relaxed'>
                Accede a la información de tus profesores y sus cursos.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Lista de actividades */}
        {loading ? (
          <div className='text-center text-white/80 flex items-center justify-center gap-3'>
            <ArrowPathIcon className='w-6 h-6 text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7] animate-spin' />
            <span>Cargando actividades...</span>
          </div>
        ) : error ? (
          <div className='text-center text-red-400 space-y-2'>
            <p>{error}</p>
            <p className='text-sm text-white/70'>
              Intenta recargar la página o verifica tu conexión.
            </p>
          </div>
        ) : actividades.length === 0 ? (
          <p className='text-center text-white/70'>No tienes actividades asignadas por ahora.</p>
        ) : (
          <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            {actividades.map((actividad) => (
              <ActividadCardEstudiante
                key={actividad.id}
                actividad={{
                  ...actividad,
                  docente: actividad.docente ||
                    actividad.docenteId || {
                      nombre: 'Docente no asignado',
                      email: '',
                    },
                }}
                onClick={(actividadId) => console.log('Abrir actividad', actividadId)}
              />
            ))}
          </section>
        )}

        {/* Botón premium mejorado */}
        <div className='flex justify-center'>
          <motion.button
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={refetchActividades}
            className='mt-10 px-8 py-4 rounded-3xl bg-[#00FFF7] text-white font-bold tracking-wide
                       transition-all duration-200 ease-out
                       hover:drop-shadow-[0_0_16px_#00FFF7]'
          >
            Recargar actividades
          </motion.button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardActividadesEstudiante;
