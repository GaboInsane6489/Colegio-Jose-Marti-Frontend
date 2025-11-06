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
      className='bg-[#121212] text-white py-10 px-4 sm:px-6'
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 30 }}
      transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
    >
      <div className='max-w-5xl mx-auto space-y-8'>
        <h2
          id='estadisticas-title'
          className='text-3xl sm:text-4xl font-bold text-center font-[Orbitron] text-white'
        >
          Estadísticas institucionales
        </h2>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center'>
          {estadisticas?.map((item, index) => {
            const Icon = iconMap[item.label];
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
                className='bg-[#1a1a1a] text-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition duration-500 ease-out flex flex-col items-center text-center gap-3'
                role='region'
                aria-label={item.label}
                tabIndex={0}
              >
                <Icon className={`text-4xl ${item.color}`} />
                <p className='text-sm font-medium text-gray-300'>{item.label}</p>
                <p className={`text-4xl font-bold ${item.color}`}>{item.valor}</p>
                <div className='pt-2 flex items-center gap-2 text-gray-400 text-xs max-w-[220px] justify-center'>
                  <FaInfoCircle className='text-sm' />
                  <span>{descripcionMap[item.label]}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {!estadisticas && (
          <p className='text-sm text-gray-400 text-center'>Cargando estadísticas...</p>
        )}
      </div>
    </motion.section>
  );
};

export default EstadisticasPanel;
