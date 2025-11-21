import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  BookOpenIcon,
  CalendarIcon,
  CalculatorIcon,
  TagIcon,
  PaperClipIcon,
  PencilIcon,
  TrashIcon,
  MegaphoneIcon,
  Squares2X2Icon,
  CheckCircleIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

/**
 * 🧠 Tarjeta institucional para mostrar actividad académica
 * Alineada con backend, services y hooks del docente
 */
const ActividadCard = ({ actividad, modo = 'docente', onEditar, onEliminar, onNotificar }) => {
  if (!actividad || typeof actividad !== 'object') return null;

  const {
    titulo = 'Sin título',
    tipo = 'sin tipo',
    fechaEntrega,
    ponderacion = 0,
    estado = 'borrador',
    notificada = false,
    recursos = [],
    materia = 'Sin materia',
    lapso = 'Sin lapso',
    curso = null,
    _id,
    id,
  } = actividad;

  const actividadId = _id || id;
  if (!actividadId) return null;

  let fechaFormateada = 'Sin fecha';
  if (fechaEntrega) {
    try {
      fechaFormateada = format(new Date(fechaEntrega), 'PPP', { locale: es });
    } catch {
      console.warn('⚠️ Fecha inválida en actividad:', fechaEntrega);
    }
  }

  const colorEstado = {
    activa: 'bg-green-600',
    vencida: 'bg-red-600',
    borrador: 'bg-gray-600',
  };
  const estadoClase = colorEstado[estado] || 'bg-gray-700';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      whileHover={{ scale: 1.01, y: -1 }}
      className='bg-black/80 backdrop-blur-md text-white rounded-lg shadow-md px-3 py-4 
                 transition-all duration-100 ease-out space-y-3 border border-[#00FFF7]/30 
                 w-full max-w-xs mx-auto overflow-hidden'
    >
      {/* 🧠 Encabezado */}
      <div className='text-center space-y-1'>
        <h2 className='text-base font-semibold tracking-wide text-white drop-shadow-[0_0_4px_#00FFF7]'>
          {titulo}
        </h2>
        <span
          className={`text-[9px] px-2 py-0.5 rounded-full font-medium inline-block ${estadoClase}`}
        >
          {estado.toUpperCase()}
        </span>
        {notificada && modo === 'docente' && (
          <div className='flex justify-center items-center gap-1 text-[#00FFF7] text-[9px] drop-shadow-[0_0_3px_#00FFF7]'>
            <CheckCircleIcon className='w-3 h-3' />
            Notificada
          </div>
        )}
      </div>

      {/* 📋 Detalles académicos */}
      <section className='space-y-1 text-white/80 text-[10px]'>
        <div className='grid grid-cols-1 gap-1'>
          <p className='flex items-center gap-1'>
            <BookOpenIcon className='w-3 h-3 text-[#00FFF7]' />
            <span>Materia:</span>
            <strong className='text-white'>{materia}</strong>
          </p>
          <p className='flex items-center gap-1'>
            <TagIcon className='w-3 h-3 text-[#00FFF7]' />
            <span>Lapso:</span>
            <strong className='text-white'>{lapso}</strong>
          </p>
          <p className='flex items-center gap-1'>
            <CalendarIcon className='w-3 h-3 text-[#00FFF7]' />
            <span>Entrega:</span>
            <strong className='text-white'>{fechaFormateada}</strong>
          </p>
          <p className='flex items-center gap-1'>
            <CalculatorIcon className='w-3 h-3 text-[#00FFF7]' />
            <span>Ponderación:</span>
            <strong className='text-white'>{ponderacion}%</strong>
          </p>
          <p className='flex items-center gap-1'>
            <TagIcon className='w-3 h-3 text-[#00FFF7]' />
            <span>Tipo:</span>
            <strong className='text-white'>{tipo}</strong>
          </p>
        </div>

        {curso && (
          <div className='flex items-center gap-1 pt-1'>
            <AcademicCapIcon className='w-3 h-3 text-[#00FFF7]' />
            <span>Curso:</span>
            <strong className='text-white text-[10px]'>
              {curso.nombre} ({curso.anioAcademico} - {curso.seccion})
            </strong>
          </div>
        )}
      </section>

      {/* 📎 Recursos */}
      {Array.isArray(recursos) && recursos.length > 0 && (
        <div className='pt-1 space-y-1'>
          <p className='flex items-center gap-1 font-medium text-white text-[10px]'>
            <PaperClipIcon className='w-3 h-3 text-[#00FFF7]' />
            Recursos:
          </p>
          <ul className='list-disc list-inside text-white/70 space-y-1 pl-4 text-[10px]'>
            {recursos.map((url, index) => (
              <li key={`${actividadId}-recurso-${index}`}>
                <a
                  href={url}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={`Recurso ${index + 1}`}
                  className='underline hover:text-[#00FFF7] transition duration-100 ease-out'
                >
                  Recurso {index + 1}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 🎯 Acciones (solo docente) */}
      {modo === 'docente' && (
        <div className='pt-2 flex flex-wrap justify-center gap-2'>
          <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.95 }}
            type='button'
            aria-label='Editar actividad'
            className='bg-yellow-500 text-white px-2 py-1 rounded-full text-[10px] font-medium flex items-center gap-1 
                       transition-all duration-100 ease-out'
            onClick={() => onEditar?.(actividad)}
          >
            <PencilIcon className='w-3 h-3' />
            <span>Editar</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.95 }}
            type='button'
            aria-label='Eliminar actividad'
            className='bg-red-600 text-white px-2 py-1 rounded-full text-[10px] font-medium flex items-center gap-1 
                       transition-all duration-100 ease-out'
            onClick={() => onEliminar?.(actividadId)}
          >
            <TrashIcon className='w-3 h-3' />
            <span>Eliminar</span>
          </motion.button>

          {!notificada && (
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.95 }}
              type='button'
              aria-label='Notificar actividad'
              className='bg-blue-600 text-white px-2 py-1 rounded-full text-[10px] font-medium flex items-center gap-1 
                         transition-all duration-100 ease-out'
              onClick={() => onNotificar?.(actividadId)}
            >
              <MegaphoneIcon className='w-3 h-3' />
              <span>Notificar</span>
            </motion.button>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default ActividadCard;
