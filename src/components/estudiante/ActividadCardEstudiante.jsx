import { FaUserTie, FaCalendarAlt, FaBook } from 'react-icons/fa';

/**
 * 📚 Componente institucional para mostrar actividad asignada al estudiante
 */
const ActividadCardEstudiante = ({ actividad, onClick }) => {
  if (!actividad || typeof actividad !== 'object') return null;

  const {
    _id,
    id,
    titulo = 'Sin título',
    descripcion = 'Sin descripción',
    fechaEntrega,
    materia = 'Materia no definida',
    lapso = 'Lapso no definido',
    docente,
  } = actividad;

  const actividadId = _id || id;
  const fechaFormateada = fechaEntrega
    ? new Date(fechaEntrega).toLocaleDateString('es-VE', {
        dateStyle: 'medium',
      })
    : 'Sin fecha';

  const nombreDocente = docente?.nombre?.trim() || 'Docente desconocido';

  console.log('🧠 Renderizando tarjeta de actividad:', {
    actividadId,
    titulo,
    materia,
    lapso,
  });

  const handleClick = () => {
    console.log('🧭 Clic en actividad. ID para navegación:', actividadId);
    if (!actividadId) {
      console.warn('❌ Actividad sin ID válido. No se puede navegar.');
      return;
    }
    onClick?.(actividad);
  };

  return (
    <div
      className='bg-white/90 text-gray-900 rounded-xl shadow-md p-5 space-y-3 hover:shadow-lg transition-shadow duration-200 cursor-pointer'
      onClick={handleClick}
    >
      {/* Título */}
      <h3 className='text-lg font-bold text-gray-800 flex items-center gap-2'>
        <FaBook className='text-lime-600' />
        {titulo}
      </h3>

      {/* Descripción */}
      <p className='text-sm text-gray-700'>{descripcion}</p>

      {/* Docente */}
      <div className='text-sm text-gray-600 flex items-center gap-2'>
        <FaUserTie className='text-lime-600' />
        <span>{nombreDocente}</span>
      </div>

      {/* Fecha de entrega */}
      <div className='text-sm text-gray-600 flex items-center gap-2'>
        <FaCalendarAlt className='text-lime-600' />
        <span>Entrega: {fechaFormateada}</span>
      </div>

      {/* Materia y lapso */}
      <div className='text-xs text-gray-500 italic'>
        {materia} — {lapso.trim()}
      </div>

      {/* Fallback visual para depuración */}
      {!actividadId && (
        <div className='text-xs text-red-500 mt-2'>
          ⚠️ Esta actividad no tiene ID válido. No se puede navegar.
        </div>
      )}
    </div>
  );
};

export default ActividadCardEstudiante;
