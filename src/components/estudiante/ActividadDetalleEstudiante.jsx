import { useState } from 'react';
import {
  FaChevronDown,
  FaChevronUp,
  FaClipboardCheck,
  FaCommentDots,
  FaStar,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

/**
 * 📋 Componente institucional para mostrar detalle expandible de una entrega del estudiante
 */
const ActividadDetalleEstudiante = ({ entrega, usuarioId: _usuarioId }) => {
  const [expandido, setExpandido] = useState(false);
  const navigate = useNavigate();

  const { _id, actividad, estado, calificacion, comentarioDocente } = entrega;

  const fechaFormateada = actividad?.fechaEntrega
    ? new Date(actividad.fechaEntrega).toLocaleDateString('es-VE', {
        dateStyle: 'medium',
      })
    : 'Sin fecha';

  return (
    <div className='bg-white/90 text-gray-900 rounded-xl shadow-md p-5 space-y-4 transition-all duration-300 ease-in-out'>
      {/* Encabezado */}
      <div className='flex justify-between items-center'>
        <div className='space-y-1'>
          <h3 className='text-lg font-bold flex items-center gap-2'>
            <FaClipboardCheck className='text-blue-600 hover:text-blue-800 transition duration-200' />
            {actividad?.titulo || 'Actividad sin título'}
          </h3>
          <p className='text-sm text-gray-700'>
            Materia: <strong>{actividad?.materia || 'No definida'}</strong>
          </p>
          {actividad?.lapso && (
            <p className='text-sm text-gray-700'>
              Lapso: <strong>{actividad.lapso}</strong>
            </p>
          )}
          <p className='text-sm text-gray-700'>
            Estado:{' '}
            <span className='capitalize font-semibold text-blue-700'>
              {estado || 'Desconocido'}
            </span>
          </p>
        </div>
        <button
          onClick={() => setExpandido(!expandido)}
          aria-expanded={expandido}
          className='text-blue-600 hover:text-blue-800 transition'
        >
          {expandido ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>

      {/* Detalle expandido */}
      {expandido && (
        <div className='border-t pt-4 space-y-3 text-sm transition-all duration-300 ease-in-out'>
          <div className='flex items-center gap-2'>
            <FaStar className='text-lime-600 hover:text-lime-700 transition duration-200' />
            <span>
              Calificación: <strong>{calificacion != null ? `${calificacion}/20` : '—'}</strong>
            </span>
          </div>

          {comentarioDocente && (
            <div className='flex items-start gap-2'>
              <FaCommentDots className='text-gray-700 mt-1' />
              <p className='italic text-gray-700'>“{comentarioDocente}”</p>
            </div>
          )}

          <p className='text-gray-500 text-xs'>Fecha de entrega: {fechaFormateada}</p>
          <p className='text-xs text-gray-400'>
            ID de entrega: <code>{_id}</code>
          </p>
          <button
            className='text-sm text-indigo-600 hover:underline'
            onClick={() => navigate(`/estudiante/entregas/${_id}`)}
          >
            Ver retroalimentación completa
          </button>
        </div>
      )}
    </div>
  );
};

export default ActividadDetalleEstudiante;
