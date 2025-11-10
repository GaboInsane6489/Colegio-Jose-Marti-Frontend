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

/**
 * 🧠 Tarjeta institucional para mostrar actividad académica
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
      console.warn('Fecha inválida en actividad:', fechaEntrega);
    }
  }

  const colorEstado = {
    activa: 'bg-green-600 hover:bg-green-500',
    vencida: 'bg-red-600 hover:bg-red-500',
    borrador: 'bg-gray-600 hover:bg-gray-500',
  };

  const estadoClase = colorEstado[estado] || 'bg-gray-700 hover:bg-gray-600';

  return (
    <div className='bg-[#0d0d0d] text-white rounded-2xl shadow-2xl p-6 hover:shadow-emerald-900 transition duration-200 ease-out space-y-6 border border-white/10 max-w-xl mx-auto'>
      {/* 🧠 Encabezado */}
      <div className='text-center space-y-2'>
        <Squares2X2Icon className='w-8 h-8 mx-auto text-white/80' />
        <h2 className='text-2xl font-bold tracking-wide'>{titulo}</h2>
        <span
          className={`text-xs px-3 py-1 rounded-full font-semibold inline-block transition ${estadoClase}`}
        >
          {estado.toUpperCase()}
        </span>
        {notificada && modo === 'docente' && (
          <div className='flex justify-center items-center gap-2 text-green-400 text-sm'>
            <CheckCircleIcon className='w-4 h-4' />
            Notificada a estudiantes
          </div>
        )}
      </div>

      {/* 📋 Detalles académicos */}
      <section className='space-y-4 text-white/80 text-sm'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <p className='flex items-center gap-2'>
            <BookOpenIcon className='w-5 h-5 text-white/70' />
            <span className='font-medium'>Materia:</span>
            <strong className='text-white'>{materia}</strong>
          </p>
          <p className='flex items-center gap-2'>
            <TagIcon className='w-5 h-5 text-white/70' />
            <span className='font-medium'>Lapso:</span>
            <strong className='text-white'>{lapso}</strong>
          </p>
          <p className='flex items-center gap-2'>
            <CalendarIcon className='w-5 h-5 text-white/70' />
            <span className='font-medium'>Entrega:</span>
            <strong className='text-white'>{fechaFormateada}</strong>
          </p>
          <p className='flex items-center gap-2'>
            <CalculatorIcon className='w-5 h-5 text-white/70' />
            <span className='font-medium'>Ponderación:</span>
            <strong className='text-white'>{ponderacion}%</strong>
          </p>
          <p className='flex items-center gap-2'>
            <TagIcon className='w-5 h-5 text-white/70' />
            <span className='font-medium'>Tipo:</span>
            <strong className='text-white'>{tipo}</strong>
          </p>
        </div>

        {curso && (
          <div className='flex items-center gap-2 pt-2'>
            <AcademicCapIcon className='w-5 h-5 text-white/70' />
            <span className='font-medium'>Curso:</span>
            <strong className='text-white'>
              {curso.nombre} ({curso.anio} - {curso.seccion})
            </strong>
          </div>
        )}
      </section>

      {/* 📎 Recursos */}
      {Array.isArray(recursos) && recursos.length > 0 && (
        <div className='pt-2 space-y-1'>
          <p className='flex items-center gap-2 font-medium text-white'>
            <PaperClipIcon className='w-5 h-5 text-white/70' />
            Recursos:
          </p>
          <ul className='list-disc list-inside text-white/70 space-y-1 pl-4 text-sm'>
            {recursos.map((url, index) => (
              <li key={`${actividadId}-recurso-${index}`}>
                <a
                  href={url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='underline hover:text-white'
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
        <div className='pt-4 flex flex-wrap justify-center gap-3'>
          <button
            type='button'
            className='bg-yellow-500 text-black px-4 py-2 rounded-full hover:bg-yellow-400 transition duration-200 ease-out font-medium flex items-center gap-2'
            onClick={() => onEditar?.(actividad)}
          >
            <PencilIcon className='w-4 h-4' />
            <span>Editar</span>
          </button>
          <button
            type='button'
            className='bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-500 transition duration-200 ease-out font-medium flex items-center gap-2'
            onClick={() => onEliminar?.(actividadId)}
          >
            <TrashIcon className='w-4 h-4' />
            <span>Eliminar</span>
          </button>
          {!notificada && (
            <button
              type='button'
              className='bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-500 transition duration-200 ease-out font-medium flex items-center gap-2'
              onClick={() => onNotificar?.(actividadId)}
            >
              <MegaphoneIcon className='w-4 h-4' />
              <span>Notificar</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ActividadCard;
