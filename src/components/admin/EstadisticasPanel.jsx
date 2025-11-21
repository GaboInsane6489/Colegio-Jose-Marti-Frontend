import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  FaUserGraduate,
  FaUserCheck,
  FaChalkboardTeacher,
  FaInfoCircle,
  FaDownload,
} from 'react-icons/fa';
import { obtenerEstadisticas } from '../../services/estadisticasService';

const EstadisticasPanel = () => {
  const [estadisticas, setEstadisticas] = useState(null);
  const [error, setError] = useState('');

  const iconMap = {
    'Usuarios registrados': FaUserGraduate,
    'Pendientes de validación': FaUserCheck,
    'Docentes activos': FaChalkboardTeacher,
  };

  const descripcionMap = {
    'Usuarios registrados': 'Cantidad total de cuentas institucionales registradas en el sistema.',
    'Pendientes de validación': 'Usuarios que aún no han sido aprobados por el administrador.',
    'Docentes activos': 'Docentes con acceso validado y participación activa en el sistema.',
  };

  const getColor = (label, valor) => {
    if (label === 'Pendientes de validación' && valor > 10) return 'text-red-400';
    return 'text-white';
  };

  const fetchEstadisticas = useCallback(async () => {
    try {
      const res = await obtenerEstadisticas();
      if (res.status === 200 && res.data) {
        const data = res.data;
        setEstadisticas([
          {
            label: 'Usuarios registrados',
            valor: data.usuariosRegistrados ?? 0,
            color: getColor('Usuarios registrados', data.usuariosRegistrados),
          },
          {
            label: 'Pendientes de validación',
            valor: data.pendientesValidacion ?? 0,
            color: getColor('Pendientes de validación', data.pendientesValidacion),
          },
          {
            label: 'Docentes activos',
            valor: data.docentesActivos ?? 0,
            color: getColor('Docentes activos', data.docentesActivos),
          },
        ]);
      } else {
        setError('No se pudieron cargar las estadísticas.');
      }
    } catch (error) {
      console.error('❌ Error al cargar estadísticas:', error.message);
      setError('Error inesperado al cargar estadísticas.');
    }
  }, []);

  useEffect(() => {
    fetchEstadisticas();
    const interval = setInterval(fetchEstadisticas, 30000);
    return () => clearInterval(interval);
  }, [fetchEstadisticas]);

  const exportarCSV = () => {
    if (!estadisticas) return;
    const encabezados = ['Indicador', 'Valor'];
    const filas = estadisticas.map((e) => [e.label, e.valor]);
    const contenido = [encabezados, ...filas].map((fila) => fila.join(',')).join('\n');
    const blob = new Blob([contenido], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'estadisticas.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.section
      id='estadisticas'
      aria-labelledby='estadisticas-title'
      className='bg-black text-white py-14 px-4 sm:px-6 scroll-mt-24'
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
    >
      <div className='w-full max-w-screen-xl mx-auto space-y-10'>
        <div className='text-center space-y-4'>
          <FaInfoCircle className='mx-auto h-8 w-8 text-white drop-shadow-[0_0_4px_#00FFF7]' />
          <h2
            id='estadisticas-title'
            className='text-3xl sm:text-4xl md:text-5xl font-bold font-[Orbitron] tracking-wide text-white'
          >
            Estadísticas institucionales
          </h2>
        </div>

        {error && (
          <p
            className='text-red-400 text-xs sm:text-sm text-center font-medium'
            role='alert'
            aria-live='assertive'
          >
            {error}
          </p>
        )}

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {estadisticas?.map((item, index) => {
            const Icon = iconMap[item.label];
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.04 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
                className='bg-black/80 backdrop-blur-md border border-white/10 text-white p-6 rounded-2xl shadow-xl hover:shadow-[#00FFF7] transition duration-500 ease-out flex flex-col items-center text-center gap-4 w-full max-w-xs mx-auto'
                role='region'
                aria-label={item.label}
                tabIndex={0}
              >
                <Icon className={`text-5xl text-white drop-shadow-[0_0_4px_#00FFF7]`} />
                <p className='text-sm font-medium text-white/70'>{item.label}</p>
                <p className={`text-4xl sm:text-5xl font-extrabold ${item.color}`}>{item.valor}</p>
                <div className='pt-2 flex items-center gap-2 text-white/50 text-xs max-w-[220px] justify-center'>
                  <FaInfoCircle className='text-white drop-shadow-[0_0_4px_#00FFF7]' />
                  <span>{descripcionMap[item.label]}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {!estadisticas && (
          <p
            className='text-xs sm:text-sm text-white/50 text-center font-medium'
            aria-live='polite'
          >
            Cargando estadísticas...
          </p>
        )}

        {estadisticas && (
          <div className='flex justify-center pt-6'>
            <button
              onClick={exportarCSV}
              className='flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md font-semibold text-xs sm:text-sm hover:brightness-125 hover:drop-shadow-[0_0_8px_#00FFF7] transition border border-white/30'
              aria-label='Exportar estadísticas en CSV'
            >
              <FaDownload className='h-4 w-4 text-white drop-shadow-[0_0_4px_#00FFF7]' />
              Exportar CSV
            </button>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default EstadisticasPanel;
