import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import axiosInstancia from '../../services/axiosInstancia'; // ✅ Usar instancia protegida
import { FaUserGraduate, FaUserCheck, FaChalkboardTeacher } from 'react-icons/fa';

/**
 * 📊 Panel institucional refinado para mostrar métricas académicas en tiempo real
 */
const EstadisticasPanel = () => {
  const [estadisticas, setEstadisticas] = useState(null);

  const iconMap = {
    'Usuarios registrados': FaUserGraduate,
    'Pendientes de validación': FaUserCheck,
    'Docentes activos': FaChalkboardTeacher,
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
      const { data } = await axiosInstancia.get('/api/estadisticas'); // ✅ Token incluido automáticamente
      console.log('📥 Estadísticas recibidas:', data);
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
      <div className='max-w-4xl mx-auto space-y-6'>
        <h2 id='estadisticas-title' className='text-xl font-semibold text-center sm:text-left'>
          Estadísticas generales del sistema
        </h2>

        <div className='flex overflow-x-auto gap-4 sm:grid sm:grid-cols-3 snap-x'>
          {estadisticas?.map((item, index) => {
            const Icon = iconMap[item.label];
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className='min-w-[200px] snap-center bg-[#1a1a1a] text-white p-6 rounded-xl shadow-md hover:shadow-lg transition flex flex-col items-center justify-center gap-2'
                role='region'
                aria-label={item.label}
                tabIndex={0}
              >
                <Icon className={`text-3xl ${item.color}`} />
                <p className='text-sm font-medium text-gray-300 text-center'>{item.label}</p>
                <p className={`text-4xl font-bold ${item.color} text-center`}>{item.valor}</p>
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
