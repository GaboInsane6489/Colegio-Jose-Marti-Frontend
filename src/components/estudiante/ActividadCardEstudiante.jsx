import React from 'react';
import { motion } from 'framer-motion';
import {
  BookOpenIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  BoltIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';

/**
 * 🎓 Tarjeta institucional premium para mostrar una actividad del estudiante
 */
const ActividadCardEstudiante = ({ actividad, onClick }) => {
  if (!actividad) return null;

  const {
    id,
    titulo = 'Actividad sin título',
    descripcion = 'Sin descripción disponible',
    materia = 'Materia no especificada',
    lapso = 'Lapso no definido',
    tipo = 'Tipo no definido',
    estado = 'Pendiente',
    docente = { nombre: 'Docente no asignado', email: '' },
  } = actividad;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      whileHover={{ scale: 1.04, y: -4, rotate: 0.5 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onClick && onClick(id)}
      className='bg-black/60 backdrop-blur-md border border-white/20 rounded-3xl p-8 space-y-6
                 shadow-xl cursor-pointer transition-all duration-200 ease-out
                 hover:border-[#00FFF7] hover:ring-2 hover:ring-[#00FFF7]/40
                 hover:drop-shadow-[0_0_16px_#00FFF7]'
    >
      {/* Encabezado institucional */}
      <header className='space-y-3 text-center'>
        <h2 className='text-3xl font-extrabold tracking-tight text-white drop-shadow-[0_0_8px_#00FFF7]'>
          {titulo}
        </h2>
        <p className='text-base text-white/70 leading-relaxed'>{descripcion}</p>
      </header>

      {/* Detalles académicos */}
      <section className='text-sm text-white/80 space-y-3 divide-y divide-white/10'>
        <div className='flex items-center gap-2 pt-1'>
          <BookOpenIcon className='w-6 h-6 text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7]' />
          <span className='font-semibold text-[#00FFF7]'>Materia:</span>
          <span>{materia}</span>
        </div>
        <div className='flex items-center gap-2 pt-3'>
          <CalendarDaysIcon className='w-6 h-6 text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7]' />
          <span className='font-semibold text-[#00FFF7]'>Lapso:</span>
          <span>{lapso}</span>
        </div>
        <div className='flex items-center gap-2 pt-3'>
          <DocumentTextIcon className='w-6 h-6 text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7]' />
          <span className='font-semibold text-[#00FFF7]'>Tipo:</span>
          <span>{tipo}</span>
        </div>
        <div className='flex items-center gap-2 pt-3'>
          <BoltIcon className='w-6 h-6 text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7]' />
          <span className='font-semibold text-[#00FFF7]'>Estado:</span>
          <span className='inline-block px-2 py-1 rounded-lg bg-[#00FFF7] text-black text-xs font-semibold'>
            {estado}
          </span>
        </div>
      </section>

      {/* Footer institucional */}
      <footer className='text-sm text-white/70 border-t border-white/20 pt-4 flex items-center gap-2'>
        <AcademicCapIcon className='w-6 h-6 text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7]' />
        <span className='font-semibold text-[#00FFF7]'>Docente:</span>
        <span>{docente?.nombre}</span>
        {docente?.email && <span className='ml-2 text-white/50'>{docente.email}</span>}
      </footer>
    </motion.div>
  );
};

export default ActividadCardEstudiante;
