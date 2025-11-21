import { FaChartPie, FaTrophy, FaExclamationTriangle, FaEquals } from 'react-icons/fa';

/**
 * 📊 Calcula estadísticas institucionales para entregas de una actividad
 */
const calcularEstadisticas = (entregas = []) => {
  const calificaciones = entregas.map((e) => e.calificacion).filter((n) => typeof n === 'number');

  const total = calificaciones.length;
  const promedio = calificaciones.reduce((acc, n) => acc + n, 0) / Math.max(total, 1);

  const desviacion = Math.sqrt(
    calificaciones.reduce((acc, n) => acc + Math.pow(n - promedio, 2), 0) / Math.max(total, 1)
  );

  const top3 = [...calificaciones].sort((a, b) => b - a).slice(0, 3);

  return {
    total,
    promedio: promedio.toFixed(2),
    desviacion: desviacion.toFixed(2),
    top3,
  };
};

/**
 * 📈 Componente institucional para mostrar estadísticas comparativas de una actividad
 */
const DashboardActividadComparativo = ({ actividad, entregas }) => {
  const { promedio, desviacion, top3, total } = calcularEstadisticas(entregas);

  return (
    <div className='bg-black/90 text-white rounded-2xl shadow-2xl p-6 space-y-6 border border-white/10 hover:border-[#00FFF7] transition duration-300'>
      <h3 className='text-xl font-bold tracking-tight drop-shadow-[0_0_6px_#00FFF7] text-center'>
        {actividad?.titulo || 'Actividad'}
      </h3>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm'>
        <div className='flex items-center gap-2'>
          <FaChartPie className='text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7]' />
          <span>
            Promedio general: <strong className='text-white'>{promedio}/20</strong>
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <FaEquals className='text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7]' />
          <span>
            Desviación estándar: <strong className='text-white'>{desviacion}</strong>
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <FaTrophy className='text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7]' />
          <span>
            Top 3 calificaciones:{' '}
            <strong className='text-white'>{top3.length ? top3.join(', ') : '—'}</strong>
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <FaExclamationTriangle className='text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7]' />
          <span>
            Total de entregas: <strong className='text-white'>{total}</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardActividadComparativo;
