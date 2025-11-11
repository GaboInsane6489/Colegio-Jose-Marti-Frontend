import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import axiosInstancia from '../../services/axiosInstancia';
import { FaUserGraduate, FaUserCheck, FaChalkboardTeacher, FaInfoCircle } from 'react-icons/fa';

const EstadisticasPanel = () => {
  const [estadisticas, setEstadisticas] = useState(null);

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
    return {
      'Usuarios registrados': 'text-blue-400',
      'Pendientes de validación': 'text-yellow-400',
      'Docentes activos': 'text-green-400',
    }[label];
  };

  const fetchEstadisticas = useCallback(async () => {
    try {
      const { data } = await axiosInstancia.get('/api/estadisticas');
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
    } catch (error) {
      console.error('❌ Error al cargar estadísticas:', error.message);
    }
  }, []);

  useEffect(() => {
    fetchEstadisticas();
    const interval = setInterval(fetchEstadisticas, 30000);
    return () => clearInterval(interval);
  }, [fetchEstadisticas]);

  return (
    <motion.section
      id='estadisticas'
      aria-labelledby='estadisticas-title'
      className='bg-black text-white py-14 px-4 sm:px-6 scroll-mt-24'
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
    >
      <div className='max-w-6xl mx-auto space-y-10'>
        <div className='text-center space-y-4'>
          <FaInfoCircle className='mx-auto h-8 w-8 text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7]' />
          <h2
            id='estadisticas-title'
            className='text-5xl font-bold font-[Orbitron] tracking-wide text-white'
          >
            Estadísticas institucionales
          </h2>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center'>
          {estadisticas?.map((item, index) => {
            const Icon = iconMap[item.label];
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.04 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
                className='bg-black/80 backdrop-blur-md border border-white/10 text-white p-6 rounded-2xl shadow-xl hover:shadow-[#00FFF7] transition duration-500 ease-out flex flex-col items-center text-center gap-4 max-w-xs mx-auto'
                role='region'
                aria-label={item.label}
                tabIndex={0}
              >
                <Icon className={`text-5xl ${item.color} drop-shadow-[0_0_6px_#00FFF7]`} />
                <p className='text-sm font-medium text-white/70'>{item.label}</p>
                <p className={`text-5xl font-extrabold ${item.color}`}>{item.valor}</p>
                <div className='pt-2 flex items-center gap-2 text-white/50 text-xs max-w-[220px] justify-center'>
                  <FaInfoCircle className='text-sm' />
                  <span>{descripcionMap[item.label]}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {!estadisticas && (
          <p className='text-sm text-white/50 text-center'>Cargando estadísticas...</p>
        )}
      </div>
    </motion.section>
  );
};

export default EstadisticasPanel;
