import { FaTasks, FaChartLine, FaEnvelopeOpenText } from 'react-icons/fa';

/**
 * 📊 Panel institucional de resumen académico del estudiante
 */
const PanelResumenEstudiante = ({ promedio, tareasPendientes = [], loadingEntregas = false }) => {
  const listaTareas = Array.isArray(tareasPendientes) ? tareasPendientes : [];

  const promedioValido =
    typeof promedio === 'number' && !isNaN(promedio) ? promedio.toFixed(2) : null;

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 font-[Orbitron]'>
      {/* Tareas pendientes */}
      <div className='bg-black/70 text-white rounded-xl p-5 shadow-lg text-center border border-[#00FFF7]/30 hover:shadow-[0_0_12px_#00FFF7] transition'>
        <FaTasks className='text-[#00FFF7] text-3xl mb-2 mx-auto drop-shadow-[0_0_4px_#00FFF7]' />
        <h3 className='text-base sm:text-lg font-semibold mb-2'>Tareas pendientes</h3>
        <p className='text-sm text-white/70'>
          {loadingEntregas
            ? 'Cargando...'
            : listaTareas.length > 0
            ? `${listaTareas.length} tareas por entregar`
            : 'No tienes tareas pendientes'}
        </p>
      </div>

      {/* Progreso académico */}
      <div className='bg-black/70 text-white rounded-xl p-5 shadow-lg text-center border border-[#FFD700]/30 hover:shadow-[0_0_12px_#FFD700] transition'>
        <FaChartLine className='text-[#FFD700] text-3xl mb-2 mx-auto drop-shadow-[0_0_4px_#FFD700]' />
        <h3 className='text-base sm:text-lg font-semibold mb-2'>Progreso académico</h3>
        <p className='text-sm text-white/70'>
          {loadingEntregas
            ? 'Cargando...'
            : promedioValido
            ? `Promedio actual: ${promedioValido}/20`
            : 'Sin notas registradas aún'}
        </p>
      </div>

      {/* Mensajes recientes */}
      <div className='bg-black/70 text-white rounded-xl p-5 shadow-lg text-center border border-[#00FF33]/30 hover:shadow-[0_0_12px_#00FF33] transition'>
        <FaEnvelopeOpenText className='text-[#00FF33] text-3xl mb-2 mx-auto drop-shadow-[0_0_4px_#00FF33]' />
        <h3 className='text-base sm:text-lg font-semibold mb-2'>Mensajes recientes</h3>
        <p className='text-sm text-white/70'>
          Revisa tus comentarios docentes en las actividades revisadas. Cada mensaje fortalece tu
          progreso académico.
        </p>
      </div>
    </div>
  );
};

export default PanelResumenEstudiante;
