import { useState } from 'react';
import useEstudiantesDisponibles from '@/hooks/useEstudiantesDisponibles';
import useClasesDocente from '@/hooks/useClasesDocente';
import VideoFondoDocente from '@/components/docente/VideoFondoDocente';
import {
  UserIcon,
  CheckCircleIcon,
  XCircleIcon,
  AcademicCapIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/solid';

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
      const materia = clase.materia || 'Sin materia'; // 🧩 Valor por defecto si falta
      await asignarEstudiantes(clase._id, seleccionados, materia);

      setFeedback('Estudiantes asignados correctamente');
      console.log(
        `✅ ${seleccionados.length} estudiantes asignados a ${clase.nombre} (${clase.horario})`
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
    <div className='fixed inset-0 z-50'>
      <VideoFondoDocente />

      <div className='absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center px-4 sm:px-6'>
        <div className='bg-black text-white rounded-2xl shadow-2xl p-6 w-full max-w-xl animate-fade-in-fast border border-yellow-700'>
          <div className='flex flex-col items-center mb-4'>
            <AcademicCapIcon className='h-10 w-10 text-yellow-500 mb-2' />
            <h2 className='text-2xl font-serif font-bold text-center'>
              Asignar estudiantes a <span className='text-yellow-400'>{clase.nombre}</span>
            </h2>
            <p className='text-sm text-white/70 text-center'>Jornada: {clase.horario}</p>
          </div>

          {loading && <p className='text-center text-white/60'>Cargando estudiantes...</p>}
          {error && <p className='text-center text-red-400'>{error}</p>}

          {!loading && !error && estudiantes.length === 0 && (
            <div className='text-center text-white/40 flex flex-col items-center space-y-2'>
              <UserIcon className='h-6 w-6 text-white/30' />
              <p>No hay estudiantes disponibles para asignar.</p>
            </div>
          )}

          <div className='max-h-64 overflow-y-auto divide-y divide-white/10 scrollbar-thin scrollbar-thumb-yellow-600 scrollbar-track-transparent'>
            {estudiantes.map((est) => {
              const seleccionado = seleccionados.includes(est._id);
              return (
                <label
                  key={est._id}
                  className='flex items-center justify-between px-4 py-3 hover:bg-white/10 transition duration-150'
                >
                  <div className='flex flex-col'>
                    <span className='text-white font-medium'>{est.nombre}</span>
                    <span className='text-sm text-white/60'>{est.email}</span>
                  </div>
                  <div className='relative'>
                    <input
                      type='checkbox'
                      checked={seleccionado}
                      onChange={() => toggleSeleccion(est._id)}
                      className={`appearance-none h-5 w-5 rounded border-2 transition duration-150 cursor-pointer ${
                        seleccionado ? 'bg-yellow-500 border-black' : 'bg-black border-yellow-500'
                      }`}
                    />
                    <span
                      className={`absolute inset-0 flex items-center justify-center pointer-events-none ${
                        seleccionado ? 'text-black' : 'text-yellow-500'
                      }`}
                    >
                      <CheckCircleIcon className='h-4 w-4' />
                    </span>
                  </div>
                </label>
              );
            })}
          </div>

          {feedback && (
            <div className='mt-4 text-center flex items-center justify-center gap-2'>
              {feedback.includes('correctamente') ? (
                <CheckCircleIcon className='h-5 w-5 text-green-400' />
              ) : (
                <XCircleIcon className='h-5 w-5 text-red-400' />
              )}
              <p
                className={`text-sm ${
                  feedback.includes('correctamente') ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {feedback}
              </p>
            </div>
          )}

          <div className='mt-6 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3'>
            <button
              onClick={onClose}
              className='px-4 py-2 bg-yellow-700 text-white rounded hover:bg-yellow-600 transition duration-150 w-full sm:w-auto'
            >
              Cancelar
            </button>
            <button
              onClick={handleAsignar}
              disabled={asignando || seleccionados.length === 0}
              className='px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-400 transition duration-150 disabled:opacity-50 w-full sm:w-auto'
            >
              {asignando ? 'Asignando...' : 'Asignar'}
            </button>
          </div>

          {/* 🧠 Información institucional */}
          <div className='mt-8 flex items-start gap-3 text-white/70 text-sm'>
            <InformationCircleIcon className='h-6 w-6 text-yellow-500 mt-0.5 flex-shrink-0' />
            <p>
              Este componente permite al docente asignar estudiantes a una clase específica dentro
              de su jornada académica. Al seleccionar estudiantes, se actualiza el backend
              institucional y se refleja el estado actual de la clase.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AsignarEstudiantesModal;
