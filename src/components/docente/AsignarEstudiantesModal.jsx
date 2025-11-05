import { useState } from 'react';
import useEstudiantesDisponibles from '@/hooks/useEstudiantesDisponibles';
import useClasesDocente from '@/hooks/useClasesDocente';
import { UserIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

/**
 * Modal institucional para asignar estudiantes a una clase
 */
const AsignarEstudiantesModal = ({ clase, onClose }) => {
  const { estudiantes, loading, error } = useEstudiantesDisponibles();
  const { asignarEstudiantes } = useClasesDocente();

  const [seleccionados, setSeleccionados] = useState([]);
  const [asignando, setAsignando] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const toggleSeleccion = (id) => {
    setSeleccionados((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleAsignar = async () => {
    if (!clase?._id || seleccionados.length === 0) return;

    setAsignando(true);
    setFeedback(null);

    try {
      await asignarEstudiantes(clase._id, seleccionados);
      setFeedback('Estudiantes asignados correctamente');
      console.log(
        `✅ ${seleccionados.length} estudiantes asignados a ${clase.grado}-${clase.seccion}`
      );
      setTimeout(() => onClose(), 1500);
    } catch (err) {
      console.error('❌ Error al asignar estudiantes:', err.message);
      setFeedback('Error al asignar estudiantes');
    } finally {
      setAsignando(false);
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-xl shadow-xl p-6 w-full max-w-xl animate-fade-in'>
        <h2 className='text-2xl font-serif font-bold text-center text-gray-800 mb-4'>
          Asignar estudiantes a {clase.grado} - {clase.seccion}
        </h2>

        {loading && <p className='text-center text-gray-500'>Cargando estudiantes...</p>}
        {error && <p className='text-center text-red-500'>{error}</p>}

        {!loading && !error && estudiantes.length === 0 && (
          <div className='text-center text-gray-400 flex flex-col items-center space-y-2'>
            <UserIcon className='h-6 w-6 text-gray-300' />
            <p>No hay estudiantes disponibles para asignar.</p>
          </div>
        )}

        <div className='max-h-64 overflow-y-auto space-y-3 mt-2'>
          {estudiantes.map((est) => (
            <label
              key={est._id}
              className='flex items-center justify-between bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 transition'
            >
              <span className='text-gray-800 font-medium'>{est.nombre}</span>
              <input
                type='checkbox'
                checked={seleccionados.includes(est._id)}
                onChange={() => toggleSeleccion(est._id)}
                className='form-checkbox h-4 w-4 text-blue-600'
              />
            </label>
          ))}
        </div>

        {feedback && (
          <div className='mt-4 text-center flex items-center justify-center gap-2'>
            {feedback.includes('correctamente') ? (
              <CheckCircleIcon className='h-5 w-5 text-green-600' />
            ) : (
              <XCircleIcon className='h-5 w-5 text-red-600' />
            )}
            <p
              className={`text-sm ${
                feedback.includes('correctamente') ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {feedback}
            </p>
          </div>
        )}

        <div className='mt-6 flex justify-end space-x-3'>
          <button
            onClick={onClose}
            className='px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-200'
          >
            Cancelar
          </button>
          <button
            onClick={handleAsignar}
            disabled={asignando || seleccionados.length === 0}
            className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition duration-200 disabled:opacity-50'
          >
            {asignando ? 'Asignando...' : 'Asignar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AsignarEstudiantesModal;
