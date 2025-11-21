import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useClases from '@/hooks/useClases';
import AsignarEstudiantesModal from '@/components/docente/AsignarEstudiantesModal';
import NavbarDocente from '@/components/docente/NavbarDocente';
import Footer from '@/components/Footer';
import VideoFondoDocente from '@/components/docente/VideoFondoDocente';
import { AcademicCapIcon, UserGroupIcon } from '@heroicons/react/24/solid';

const ClasesDocente = () => {
  const { clases, loading, error } = useClases('docente');
  const [claseSeleccionada, setClaseSeleccionada] = useState(null);

  useEffect(() => {
    if (loading) console.log('⏳ Cargando clases desde useClases...');
    if (error) console.error('❌ Error al cargar clases:', error);
    if (clases.length > 0) {
      console.log(
        `✅ Clases recibidas (${clases.length}):`,
        clases.map((c) => c.nombre)
      );
    } else if (!loading && !error) {
      console.warn('⚠️ No se recibieron clases. Verifica backend o asignación.');
    }
  }, [clases, loading, error]);

  const handleSeleccionarClase = (clase) => {
    const safeId = clase?.id || clase?._id;
    if (!safeId) {
      console.warn('⚠️ Clase inválida seleccionada:', clase);
      return;
    }
    console.log('🎯 Clase seleccionada para asignar estudiantes:', clase);
    setClaseSeleccionada({ ...clase, id: safeId });
  };

  return (
    <div className='min-h-screen flex flex-col bg-[#0d0d0d] text-white relative overflow-hidden'>
      {/* Fondo institucional del componente */}
      <VideoFondoDocente />
      <div className='absolute inset-0 bg-black/40 z-10 pointer-events-none' />

      {/* Navbar */}
      <div className='relative z-30'>
        <NavbarDocente />
      </div>

      {/* Contenido principal */}
      <main className='relative z-20 pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12'>
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className='text-center flex flex-col items-center'
        >
          <AcademicCapIcon className='h-12 w-12 text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7] mb-4' />
          <h1 className='text-4xl font-bold tracking-tight drop-shadow-[0_0_6px_#00FFF7]'>
            Mis Clases
          </h1>
          <p className='mt-2 text-white/80 max-w-xl'>
            Gestiona tus espacios académicos, asigna estudiantes y organiza tu jornada.
          </p>
        </motion.header>

        {/* 🎥 Video contenido adicional */}
        <section className='relative w-full h-[500px] rounded-3xl overflow-hidden shadow-md border border-[#00FFF7]/30'>
          <video
            src='https://cdn.pixabay.com/video/2025/08/08/296169_large.mp4'
            autoPlay
            loop
            muted
            className='absolute inset-0 w-full h-full object-cover'
          />
          <div className='absolute inset-0 bg-black/50' />
          <div className='absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10'>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className='bg-black/60 backdrop-blur-md px-5 py-3 rounded-xl shadow-sm text-center max-w-sm border border-white/10'
            >
              <h2 className='text-sm font-semibold text-white drop-shadow-[0_0_4px_#00FFF7]'>
                Espacios Académicos Premium
              </h2>
              <p className='text-[11px] text-white/70 mt-1'>
                Este video complementa tu experiencia institucional con claridad y propósito.
              </p>
            </motion.div>
          </div>
        </section>

        {loading && (
          <div className='text-center text-white/60'>
            <p>Cargando clases...</p>
          </div>
        )}

        {error && (
          <div className='text-center text-red-400'>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && clases.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className='text-center text-white/60 flex flex-col items-center space-y-2'
          >
            <AcademicCapIcon className='h-8 w-8 text-white/40' />
            <p className='text-lg'>Aún no tienes clases asignadas.</p>
            <p className='text-sm'>
              Contacta al administrador para configurar tus espacios académicos.
            </p>
          </motion.div>
        )}

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {clases.map((clase) => {
            const safeId = clase.id || clase._id;
            return (
              <motion.div
                key={safeId}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className='bg-black/70 text-white rounded-2xl p-6 shadow-lg transition duration-150 
                           flex flex-col items-center text-center border border-[#00FFF7]/20 hover:scale-105'
              >
                <AcademicCapIcon className='h-6 w-6 text-[#00FFF7] mb-2 drop-shadow-[0_0_6px_#00FFF7]' />
                <h2 className='text-lg font-bold text-white drop-shadow-[0_0_6px_#00FFF7] mb-1'>
                  {clase.nombre}
                </h2>
                <p className='text-xs text-white/80 mb-1'>
                  Horario: {clase.horario?.dia} {clase.horario?.horaInicio} -{' '}
                  {clase.horario?.horaFin}
                </p>
                <p className='text-xs text-white/70 mb-1'>Descripción: {clase.descripcion}</p>
                <p className='text-xs text-white/70 flex items-center justify-center gap-1'>
                  <UserGroupIcon className='h-4 w-4 text-white/70' />
                  {clase.estudiantes?.length > 0
                    ? `Estudiantes asignados: ${clase.estudiantes.length}`
                    : 'Sin estudiantes asignados'}
                </p>

                <button
                  onClick={() => handleSeleccionarClase(clase)}
                  className='mt-3 w-full px-4 py-2 bg-[#00FFF7] text-white font-semibold rounded-xl 
                             hover:drop-shadow-[0_0_12px_#00FFF7] hover:scale-105 transition duration-150'
                >
                  Asignar estudiantes
                </button>
              </motion.div>
            );
          })}
        </div>
      </main>

      <div className='relative z-20 mt-auto'>
        <Footer />
      </div>

      {claseSeleccionada && (
        <AsignarEstudiantesModal
          clase={claseSeleccionada}
          onClose={() => {
            console.log('🔒 Modal cerrado');
            setClaseSeleccionada(null);
          }}
        />
      )}
    </div>
  );
};

export default ClasesDocente;
