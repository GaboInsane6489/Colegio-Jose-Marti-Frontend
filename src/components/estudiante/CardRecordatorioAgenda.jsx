import { motion } from 'framer-motion';
import { FaCalendarCheck } from 'react-icons/fa'; // Ícono institucional

/**
 * 📅 Tarjeta institucional para recordar al estudiante la importancia de su agenda académica
 */
const CardRecordatorioAgenda = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      aria-label='Recordatorio de agenda académica'
      className='bg-black/80 backdrop-blur-md rounded-xl border border-[#00FFF7]/30 p-6 shadow-lg 
                 hover:scale-105 hover:shadow-[0_0_12px_#00FFF7] transition-all duration-300 ease-out 
                 max-w-sm text-center mx-auto font-[Orbitron]'
    >
      {/* Ícono fosforescente */}
      <div className='flex justify-center mb-4'>
        <FaCalendarCheck className='text-[#00FFF7] text-4xl drop-shadow-[0_0_6px_#00FFF7]' />
      </div>

      {/* Título */}
      <h2 className='text-lg font-semibold text-[#00FFF7] mb-2 drop-shadow-[0_0_4px_#00FFF7]'>
        Recordatorio de Agenda
      </h2>

      {/* Texto emocional */}
      <p className='text-sm text-white/70'>
        Organiza tus tareas y entregas con anticipación. Una agenda clara es tu mejor aliado para
        mantener el equilibrio académico y personal, fortaleciendo tu camino institucional.
      </p>
    </motion.div>
  );
};

export default CardRecordatorioAgenda;
