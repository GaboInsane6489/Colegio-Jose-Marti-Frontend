import { FaCalendarCheck, FaClipboardList, FaBookOpen } from 'react-icons/fa';

/**
 * 📦 Card institucional para mostrar entrega del estudiante
 */
const EntregaCard = ({ entrega }) => {
  if (!entrega || typeof entrega !== 'object') return null;

  const { estado = 'pendiente', calificacion, fechaEntrega, actividad = {} } = entrega;

  const {
    titulo = 'Sin título',
    materia = 'Sin materia',
    lapso = 'Sin lapso',
    fechaEntrega: fechaLimite,
  } = actividad;

  const fechaFormateada = fechaLimite
    ? new Date(fechaLimite).toLocaleDateString('es-VE', {
        dateStyle: 'medium',
      })
    : 'Sin fecha';

  const estadoColor = {
    entregada: 'text-green-600',
    pendiente: 'text-yellow-600',
    vencida: 'text-red-600',
  };

  return (
    <div className='bg-white/90 text-gray-900 rounded-xl shadow-md p-5 space-y-3 hover:shadow-lg transition-shadow duration-200'>
      {/* Título de la actividad */}
      <h3 className='text-lg font-bold text-gray-800 flex items-center gap-2'>
        <FaClipboardList className='text-blue-600' />
        {titulo}
      </h3>

      {/* Estado de la entrega */}
      <p className={`text-sm font-semibold ${estadoColor[estado] || 'text-gray-600'}`}>
        Estado: {estado.charAt(0).toUpperCase() + estado.slice(1)}
      </p>

      {/* Fecha límite */}
      <div className='text-sm text-gray-600 flex items-center gap-2'>
        <FaCalendarCheck className='text-blue-600' />
        <span>Entrega hasta: {fechaFormateada}</span>
      </div>

      {/* Materia y lapso */}
      <div className='text-xs text-gray-500 italic'>
        {materia} — {lapso}
      </div>

      {/* Calificación si existe */}
      {typeof calificacion === 'number' && (
        <div className='text-sm text-gray-700 font-medium'>
          Calificación: <span className='text-green-700'>{calificacion}/20</span>
        </div>
      )}
    </div>
  );
};

export default EntregaCard;
