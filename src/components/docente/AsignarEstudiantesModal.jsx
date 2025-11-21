import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useClases from '@/hooks/useClases';
import VideoFondoDocente from '@/components/docente/VideoFondoDocente';
import { getEstudiantes } from '@/services/usuariosService';
import {
  UserIcon,
  CheckCircleIcon,
  XCircleIcon,
  AcademicCapIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/solid';

/**
 * 📦 Modal institucional para asignar estudiantes a una clase
 */
const AsignarEstudiantesModal = ({ clase, onClose }) => {
  const { assignEstudiantesToClase } = useClases('docente');

  const [estudiantes, setEstudiantes] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);
  const [asignando, setAsignando] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // ✅ Cargar estudiantes activos y validados desde el servicio
  useEffect(() => {
    const cargarEstudiantes = async () => {
      const res = await getEstudiantes();
      if (res.ok) {
        setEstudiantes(res.estudiantes);
      } else {
        console.error('❌ No se pudieron cargar estudiantes:', res.msg);
      }
    };
    cargarEstudiantes();
  }, []);

  const toggleSeleccion = (id) => {
    setSeleccionados((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleAsignar = async () => {
    if (!clase?.id || seleccionados.length === 0) return;

    setAsignando(true);
    setFeedback(null);

    try {
      await assignEstudiantesToClase(clase.id, seleccionados);
      setFeedback('✅ Estudiantes asignados correctamente');
      console.log(`✅ ${seleccionados.length} estudiantes asignados a ${clase.nombre}`);
      setTimeout(() => onClose(), 1500);
    } catch (err) {
      console.error('❌ Error al asignar estudiantes:', err.message);
      setFeedback('❌ Error al asignar estudiantes');
    } finally {
      setAsignando(false);
    }
  };

  return (
    <div className='fixed inset-0 z-50'>
      <VideoFondoDocente />
      <div className='absolute inset-0 bg-black/80 flex items-center justify-center px-4 sm:px-6'>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='bg-[#0d0d0d] text-white rounded-2xl shadow-2xl p-6 w-full max-w-xl border border-white/10'
        >
          {/* 🧠 Encabezado */}
          <div className='flex flex-col items-center mb-6'>
            <AcademicCapIcon className='h-10 w-10 text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7] mb-3' />
            <h2 className='text-2xl font-bold tracking-tight text-white drop-shadow-[0_0_6px_#00FFF7] text-center'>
              Asignar estudiantes a <span className='text-[#00FFF7]'>{clase.nombre}</span>
            </h2>
            <p className='text-sm text-white/70 text-center'>
              Jornada: {clase.horario?.dia} {clase.horario?.horaInicio} - {clase.horario?.horaFin}
            </p>
          </div>

          {/* 📋 Lista de estudiantes */}
          {estudiantes.length === 0 ? (
            <div className='text-center text-white/60 flex flex-col items-center space-y-2'>
              <UserIcon className='h-6 w-6 text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7]' />
              <p>No hay estudiantes activos y validados disponibles.</p>
            </div>
          ) : (
            <div className='max-h-64 overflow-y-auto divide-y divide-white/10 scrollbar-thin scrollbar-thumb-[#00FFF7] scrollbar-track-transparent'>
              {estudiantes.map((est) => {
                const safeId = est.id || est._id; // ✅ normalizamos
                const seleccionado = seleccionados.includes(safeId);
                return (
                  <label
                    key={safeId}
                    className='flex items-center justify-between px-4 py-3 hover:bg-white/10 transition duration-150 rounded-lg'
                  >
                    <div className='flex flex-col'>
                      <span className='text-white font-medium'>{est.nombre}</span>
                      <span className='text-sm text-white/70'>{est.email}</span>
                    </div>
                    <div className='relative'>
                      <input
                        type='checkbox'
                        checked={seleccionado}
                        onChange={() => toggleSeleccion(safeId)}
                        className={`appearance-none h-5 w-5 rounded border-2 transition duration-150 cursor-pointer ${
                          seleccionado ? 'bg-[#00FFF7] border-black' : 'bg-black border-[#00FFF7]'
                        }`}
                      />
                      <span
                        className={`absolute inset-0 flex items-center justify-center pointer-events-none ${
                          seleccionado ? 'text-black' : 'text-[#00FFF7]'
                        }`}
                      >
                        <CheckCircleIcon className='h-4 w-4' />
                      </span>
                    </div>
                  </label>
                );
              })}
            </div>
          )}

          {/* ✅ Feedback */}
          {feedback && (
            <div className='mt-4 text-center flex items-center justify-center gap-2'>
              {feedback.includes('correctamente') ? (
                <CheckCircleIcon className='h-5 w-5 text-green-400 drop-shadow-[0_0_6px_#00FF33]' />
              ) : (
                <XCircleIcon className='h-5 w-5 text-red-400 drop-shadow-[0_0_6px_#FF0033]' />
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

          {/* 📦 Botones */}
          <div className='mt-6 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3'>
            <button
              onClick={onClose}
              className='px-4 py-2 bg-[#C580FF] text-white rounded-xl hover:drop-shadow-[0_0_12px_#C580FF] hover:scale-110 hover:-translate-y-[2px] transition duration-300 w-full sm:w-auto'
            >
              Cancelar
            </button>
            <button
              onClick={handleAsignar}
              disabled={asignando || seleccionados.length === 0}
              className='px-4 py-2 bg-[#00FFF7] text-black font-semibold rounded-xl hover:drop-shadow-[0_0_12px_#00FFF7] hover:scale-110 hover:-translate-y-[2px] transition duration-300 disabled:opacity-50 w-full sm:w-auto'
            >
              {asignando ? 'Asignando...' : 'Asignar'}
            </button>
          </div>

          {/* 🧠 Información institucional */}
          <div className='mt-8 flex items-start gap-3 text-white/70 text-sm'>
            <InformationCircleIcon className='h-6 w-6 text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7] mt-0.5 flex-shrink-0' />
            <p>
              Este componente permite al docente asignar estudiantes activos y validados a una clase
              específica dentro de su jornada académica. Al seleccionar estudiantes, se actualiza el
              backend institucional y se refleja el estado actual de la clase.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AsignarEstudiantesModal;
