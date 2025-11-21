import { motion } from 'framer-motion';
import { FaHandsHelping } from 'react-icons/fa'; // Ícono institucional

/**
 * 🌱 Tarjeta institucional para destacar los valores de la comunidad académica
 */
const CardValoresInstitucionales = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      aria-label='Valores institucionales de la comunidad académica'
      className='bg-black/80 backdrop-blur-md rounded-xl border border-[#00FF33]/30 p-6 shadow-lg 
                 hover:scale-105 hover:shadow-[0_0_12px_#00FF33] transition-all duration-300 ease-out 
                 max-w-sm text-center mx-auto font-[Orbitron]'
    >
      {/* Ícono fosforescente */}
      <div className='flex justify-center mb-4'>
        <FaHandsHelping className='text-[#00FF33] text-4xl drop-shadow-[0_0_6px_#00FF33]' />
      </div>

      {/* Título */}
      <h2 className='text-lg font-semibold text-[#00FF33] mb-2 drop-shadow-[0_0_4px_#00FF33]'>
        Valores Institucionales
      </h2>

      {/* Texto emocional */}
      <p className='text-sm text-white/70'>
        Respeto, empatía y responsabilidad son pilares de nuestra comunidad. Practícalos en cada
        acción académica y personal, fortaleciendo tu camino institucional y humano.
      </p>
    </motion.div>
  );
};

export default CardValoresInstitucionales;
