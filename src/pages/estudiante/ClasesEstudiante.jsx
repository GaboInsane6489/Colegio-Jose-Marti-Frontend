import { motion } from 'framer-motion';
import { FaUsers, FaChalkboardTeacher, FaInfoCircle, FaUserTie } from 'react-icons/fa';

import useClasesEstudiante from '@/hooks/useClasesEstudiante';
import VideoFondoEstudiante from '@/components/estudiante/VideoFondoEstudiante';
import NavbarEstudiante from '@/components/estudiante/NavbarEstudiante';
import Footer from '@/components/Footer';

const ClasesEstudiante = () => {
  const { clases, loading, error } = useClasesEstudiante();

  return (
    <div className='min-h-screen flex flex-col bg-[#0d0d0d] text-white font-[Orbitron] tracking-tight overflow-x-hidden'>
      {/* 🎥 Fondo institucional */}
      <VideoFondoEstudiante />

      <div className='relative z-10 flex-1'>
        <NavbarEstudiante />

        <main className='pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16'>
          {/* Encabezado institucional */}
          <motion.section
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='space-y-6 text-center'
          >
            <FaChalkboardTeacher className='text-[#00FFF7] text-5xl mx-auto drop-shadow-[0_0_8px_#00FFF7]' />
            <h1 className='text-4xl font-bold text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7]'>
              Tus Clases Asignadas
            </h1>
            <p className='text-base text-white/75 max-w-2xl mx-auto leading-relaxed'>
              Aquí encontrarás la información de las clases en las que fuiste asignado: materia,
              horario, quién creó la clase y tus compañeros vinculados.
            </p>
            <div className='flex justify-center items-center gap-2 text-white/60 text-sm'>
              <FaInfoCircle className='text-[#00FFF7]' />
              <span>
                Cada clase es una oportunidad para aprender, compartir y crecer junto a tus
                compañeros.
              </span>
            </div>
          </motion.section>

          {/* Estado de carga / error */}
          {loading && (
            <p className='text-center text-[#00FFF7] animate-pulse text-sm'>
              Cargando tus clases asignadas...
            </p>
          )}
          {error && (
            <div className='text-center text-red-400 space-y-2'>
              <p className='text-sm'>{error}</p>
              <p className='text-xs text-white/60'>Intenta nuevamente más tarde.</p>
            </div>
          )}

          {/* Contenido dinámico */}
          {!loading && !error && (
            <>
              {Array.isArray(clases) && clases.length === 0 ? (
                <div className='text-center space-y-3'>
                  <p className='text-lg font-semibold'>No tienes clases asignadas por ahora.</p>
                  <p className='text-sm text-white/60'>
                    Cuando se te asigne una clase, aparecerá aquí automáticamente.
                  </p>
                </div>
              ) : (
                <motion.section
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                >
                  {clases.map((clase) => (
                    <motion.div
                      key={clase._id || clase.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                      className='bg-black/60 border border-[#00FFF7]/30 rounded-xl p-6 shadow-lg hover:shadow-[0_0_20px_#00FFF7] transition-all duration-300 hover:-translate-y-1'
                    >
                      <div className='flex items-center justify-between mb-3'>
                        <h2 className='text-lg font-semibold text-[#00FFF7] drop-shadow-[0_0_4px_#00FFF7]'>
                          {clase.materia || clase.nombre || 'Clase sin nombre'}
                        </h2>
                        <div className='flex items-center gap-2'>
                          <FaUsers className='text-[#00FFF7] drop-shadow-[0_0_4px_#00FFF7]' />
                          <span className='text-sm text-white/75'>
                            {Array.isArray(clase.estudiantes) ? clase.estudiantes.length : 0}{' '}
                            compañeros
                          </span>
                        </div>
                      </div>

                      <div className='space-y-2 text-sm text-white/75'>
                        <p>
                          <span className='text-white font-semibold'>Horario:</span>{' '}
                          {clase.horario?.dia && clase.horario?.horaInicio
                            ? `${clase.horario.dia} ${clase.horario.horaInicio} - ${
                                clase.horario.horaFin || ''
                              }`
                            : 'Por asignar'}
                        </p>
                        <p>
                          <span className='text-white font-semibold'>Creado por:</span>{' '}
                          {clase.creador?.nombre || clase.createdBy?.nombre || 'No especificado'}
                        </p>
                      </div>

                      {/* Lista de compañeros */}
                      {Array.isArray(clase.estudiantes) && clase.estudiantes.length > 0 && (
                        <div className='mt-4'>
                          <p className='text-white font-semibold mb-2'>Compañeros:</p>
                          <ul className='list-disc list-inside text-xs text-white/70 space-y-1'>
                            {clase.estudiantes.map((est) => (
                              <li key={est._id || est.id}>
                                {est.nombre || 'Estudiante sin nombre'}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </motion.section>
              )}
            </>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default ClasesEstudiante;
