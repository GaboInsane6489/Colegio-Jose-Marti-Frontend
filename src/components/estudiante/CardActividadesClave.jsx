import { motion } from 'framer-motion';
import { FaTasks } from 'react-icons/fa';
import useActividades from '@/hooks/useActividades';

/**
 * 📌 Tarjeta institucional para destacar actividades clave del estudiante
 * Adaptada al backend y hooks institucionales
 */
const CardActividadesClave = () => {
  const { actividades, loading, error } = useActividades();

  // Filtrar actividades clave (ejemplo: ponderación >= 30% o flag clave)
  const actividadesClave = Array.isArray(actividades)
    ? actividades.filter((a) => a.clave || a.ponderacion >= 30)
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      aria-label='Actividades clave del estudiante'
      className='bg-black/80 backdrop-blur-md rounded-xl border border-[#00FFF7]/30 p-6 shadow-lg 
                 hover:scale-105 hover:shadow-[0_0_12px_#00FFF7] transition-all duration-300 ease-out 
                 max-w-sm text-center mx-auto font-[Orbitron]'
    >
      {/* Ícono fosforescente */}
      <div className='flex justify-center mb-4'>
        <FaTasks className='text-[#00FFF7] text-4xl drop-shadow-[0_0_6px_#00FFF7]' />
      </div>

      {/* Título */}
      <h2 className='text-lg font-semibold text-[#00FFF7] mb-2 drop-shadow-[0_0_4px_#00FFF7]'>
        Actividades Clave
      </h2>

      {/* Contenido dinámico */}
      {loading ? (
        <p className='text-sm text-white/60 italic'>Cargando actividades...</p>
      ) : error ? (
        <p className='text-sm text-red-400 italic'>No se pudieron cargar las actividades.</p>
      ) : actividadesClave.length === 0 ? (
        <p className='text-sm text-white/70 italic'>
          No tienes actividades clave registradas en este momento.
        </p>
      ) : (
        <ul className='text-sm text-white/70 space-y-2 text-left'>
          {actividadesClave.map((act) => (
            <li key={act.id || act._id} className='border-b border-white/10 pb-1'>
              <span className='text-[#00FFF7] font-semibold'>{act.titulo}</span> — Entrega:{' '}
              {act.fechaEntrega
                ? new Date(act.fechaEntrega).toLocaleDateString('es-VE', { dateStyle: 'medium' })
                : 'Sin fecha'}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
};

export default CardActividadesClave;
